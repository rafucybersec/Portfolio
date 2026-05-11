import { NextResponse } from 'next/server'

/**
 * Twitter Player Card embed endpoint.
 * Twitter/X loads this URL in an iframe when displaying a Player Card.
 * Returns a minimal, styled HTML page with a video element.
 */
export async function GET() {
  const videoUrl = 'https://rafucybersec.vercel.app/videos/RafayWebsite.mp4'
  const posterUrl = 'https://rafucybersec.vercel.app/og-image.png'

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>0xRafuSec Portfolio Preview</title>
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: #0a0a0a; }
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  </style>
</head>
<body>
  <video
    src="${videoUrl}"
    poster="${posterUrl}"
    autoplay
    muted
    loop
    playsinline
    preload="auto"
  ></video>
</body>
</html>`

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      // Allow Twitter to iframe this page
      'X-Frame-Options': 'ALLOWALL',
      'Content-Security-Policy': "frame-ancestors *;",
    },
  })
}
