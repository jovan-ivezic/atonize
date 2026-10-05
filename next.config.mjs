import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  async redirects() {
    return [
      { source: '/en/about', destination: '/en#about', permanent: true },
      { source: '/sr/o-nama', destination: '/sr#about', permanent: true },
      { source: '/sr/uvidi/:path*', destination: '/sr/clanci/:path*', permanent: true },
      { source: '/sr/uvidi', destination: '/sr/clanci', permanent: true },
      { source: '/en/insights/category/engineering', destination: '/en/insights/category/web-architecture', permanent: true },
      { source: '/sr/clanci/kategorija/inzenjering', destination: '/sr/clanci/kategorija/web-arhitektura', permanent: true },
    ];
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );
    if (fileLoaderRule) {
      config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
        },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /url/] },
          use: ['@svgr/webpack'],
        },
      );
      fileLoaderRule.exclude = /\.svg$/i;
    }
    return config;
  },
}

export default withNextIntl(nextConfig)
