import { NextRequest, NextResponse } from 'next/server';

import { rateLimit } from '@/lib/rate-limit';

// Have I Been Pwned (HIBP) Pwned Passwords API
// Free tier: https://api.pwnedpasswords.com/range/{prefix} (no API key needed)
// Paid tier: Higher rate limits with API key (optional)
// Get API key: https://haveibeenpwned.com/API/Key (subscription-based)
//
// Setup (optional for higher rate limits):
// 1. Visit https://haveibeenpwned.com/API/Key
// 2. Purchase subscription for API key (optional - free tier works fine)
// 3. Add to .env: HIBP_API_KEY=your_api_key_here

const RANGE_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const rangeCache = new Map<string, { data: string; expiresAt: number }>();

function getCachedRange(prefix: string): string | null {
  const entry = rangeCache.get(prefix);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    rangeCache.delete(prefix);
    return null;
  }

  return entry.data;
}

function setCachedRange(prefix: string, data: string) {
  rangeCache.set(prefix, {
    data,
    expiresAt: Date.now() + RANGE_CACHE_TTL_MS,
  });
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting (15 requests per minute per IP)
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    const rateLimitResult = await rateLimit(`pwd:${ip}`, 15, 60);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(rateLimitResult.resetIn) } }
      );
    }

    const { prefix } = await request.json();

    if (!prefix || typeof prefix !== 'string' || prefix.length !== 5) {
      return NextResponse.json(
        { error: 'Valid 5-character prefix is required' },
        { status: 400 }
      );
    }

    try {
      // Build request URL
      const apiUrl = `https://api.pwnedpasswords.com/range/${prefix}`;
      
      // Optional: Add API key header if available (for paid tier)
      const headers: HeadersInit = {
        'User-Agent': 'rafu-portfolio-password-checker',
      };
      
      const apiKey = process.env.HIBP_API_KEY;
      if (apiKey) {
        headers['hibp-api-key'] = apiKey;
      }

      // Fetch from HIBP (k-anonymity model)
      let data = getCachedRange(prefix);

      if (!data) {
        const response = await fetch(apiUrl, { headers });

        if (!response.ok) {
          if (response.status === 429) {
            return NextResponse.json(
              { error: 'Rate limited. Please try again later.' },
              { status: 429 }
            );
          }
          throw new Error(`HIBP API error: ${response.status}`);
        }

        data = await response.text();
        setCachedRange(prefix, data);
      }
      
      return new NextResponse(data, {
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'public, max-age=300'
        }
      });

    } catch (error: any) {
      // Don't log sensitive info
      console.error('HIBP API error fetching range');
      return NextResponse.json({
        error: 'Unable to check password breaches. Please try again.'
      }, { status: 500 });
    }

  } catch (error: any) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
