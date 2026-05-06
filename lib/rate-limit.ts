import { Redis } from '@upstash/redis';

/**
 * Rate Limiter using Upstash Redis
 * 
 * Persists across Vercel serverless cold starts.
 * Falls back to in-memory Map if Redis is unavailable (dev without env vars).
 */

// Initialize Redis client (lazy — only created once)
let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn('[rate-limit] UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set. Falling back to in-memory rate limiting.');
    return null;
  }

  redis = new Redis({ url, token });
  return redis;
}

// In-memory fallback (for local dev without Redis)
const memoryStore = new Map<string, { count: number; resetTime: number }>();

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number; // seconds until reset
}

/**
 * Check rate limit for a given key.
 * 
 * @param key - Unique identifier (e.g., IP address, email)
 * @param limit - Max requests allowed in the window
 * @param windowSeconds - Time window in seconds
 * @returns Whether the request is allowed
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  const redisClient = getRedis();

  if (redisClient) {
    return redisRateLimit(redisClient, key, limit, windowSeconds);
  }

  return memoryRateLimit(key, limit, windowSeconds);
}

// Redis-based sliding window rate limiter
async function redisRateLimit(
  client: Redis,
  key: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  const redisKey = `rl:${key}`;

  try {
    // Increment counter and set expiry atomically
    const count = await client.incr(redisKey);

    if (count === 1) {
      // First request in this window — set TTL
      await client.expire(redisKey, windowSeconds);
    }

    const ttl = await client.ttl(redisKey);
    const resetIn = ttl > 0 ? ttl : windowSeconds;

    if (count > limit) {
      return { allowed: false, remaining: 0, resetIn };
    }

    return { allowed: true, remaining: limit - count, resetIn };
  } catch (error) {
    console.error('[rate-limit] Redis error, falling back to allow:', error);
    // On Redis failure, allow the request (fail-open)
    return { allowed: true, remaining: limit, resetIn: windowSeconds };
  }
}

// In-memory fallback rate limiter
function memoryRateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const record = memoryStore.get(key);

  if (!record || now > record.resetTime) {
    memoryStore.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetIn: windowSeconds };
  }

  record.count++;

  if (record.count > limit) {
    const resetIn = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, remaining: 0, resetIn };
  }

  const resetIn = Math.ceil((record.resetTime - now) / 1000);
  return { allowed: true, remaining: limit - record.count, resetIn };
}

/**
 * Check cooldown for a specific action (e.g., email submission).
 * Returns seconds remaining if still in cooldown, or 0 if allowed.
 */
export async function checkCooldown(
  key: string,
  cooldownSeconds: number
): Promise<number> {
  const redisClient = getRedis();

  if (redisClient) {
    try {
      const redisKey = `cd:${key}`;
      const exists = await redisClient.exists(redisKey);

      if (exists) {
        const ttl = await redisClient.ttl(redisKey);
        return ttl > 0 ? ttl : 0;
      }

      // Set cooldown
      await redisClient.set(redisKey, '1', { ex: cooldownSeconds });
      return 0;
    } catch (error) {
      console.error('[rate-limit] Redis cooldown error:', error);
      return 0; // Fail-open
    }
  }

  // In-memory fallback
  const now = Date.now();
  const cooldownMs = cooldownSeconds * 1000;
  const lastTime = memoryStore.get(`cd:${key}`)?.resetTime;

  if (lastTime && now < lastTime) {
    return Math.ceil((lastTime - now) / 1000);
  }

  memoryStore.set(`cd:${key}`, { count: 1, resetTime: now + cooldownMs });
  return 0;
}
