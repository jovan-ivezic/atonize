import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/en/portfolio/viewer/',
        '/sr/portfolio/viewer/',
        '/api/', // Sprečava Googlebot da kroluje API endpoint-e (dobra praksa)
        '/*?_rsc=*', // Sprečava indeksiranje React Server Component (RSC) payload URL-ova u App Router-u
      ],
    },
    sitemap: 'https://www.atonize.com/sitemap.xml',
  };
}
