import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/llm.txt', '/llms.txt', '/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: ['/llm.txt', '/llms.txt', '/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: ['/llm.txt', '/llms.txt', '/'],
      },
      {
        userAgent: 'Anthropic-AI',
        allow: ['/llm.txt', '/llms.txt', '/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: ['/llm.txt', '/llms.txt', '/'],
      },
    ],
    sitemap: 'https://rafucybersec.vercel.app/sitemap.xml',
    host: 'https://rafucybersec.vercel.app',
  }
}
