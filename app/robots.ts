import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                // Google
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
            {
                // Naver (Yeti)
                userAgent: 'Yeti',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
            {
                // All other bots
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
        ],
        sitemap: 'https://careonk.com/sitemap.xml',
        host: 'https://careonk.com',
    }
}
