import type { MetadataRoute } from 'next'

const BASE_URL = 'https://careonk.com'

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()

    const pages = [
        // Root
        { url: BASE_URL, changeFrequency: 'daily' as const, priority: 1.0 },
        { url: `${BASE_URL}/home`, changeFrequency: 'daily' as const, priority: 0.95 },
        { url: `${BASE_URL}/get-started`, changeFrequency: 'weekly' as const, priority: 0.8 },
        // Main services
        { url: `${BASE_URL}/medical`, changeFrequency: 'weekly' as const, priority: 0.9 },
        { url: `${BASE_URL}/daytour`, changeFrequency: 'weekly' as const, priority: 0.9 },
        { url: `${BASE_URL}/kpop`, changeFrequency: 'weekly' as const, priority: 0.9 },
        { url: `${BASE_URL}/pharmacy`, changeFrequency: 'weekly' as const, priority: 0.85 },
        { url: `${BASE_URL}/exchange`, changeFrequency: 'weekly' as const, priority: 0.85 },
        { url: `${BASE_URL}/dining`, changeFrequency: 'weekly' as const, priority: 0.85 },
        { url: `${BASE_URL}/activity`, changeFrequency: 'weekly' as const, priority: 0.85 },
        { url: `${BASE_URL}/helper`, changeFrequency: 'weekly' as const, priority: 0.85 },
        { url: `${BASE_URL}/photo`, changeFrequency: 'weekly' as const, priority: 0.85 },
    ]

    return pages.map((page) => ({
        ...page,
        lastModified: now,
    }))
}
