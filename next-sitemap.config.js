/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.drivex.lk/', // Replace with your website URL
    generateRobotsTxt: true, // Generates a robots.txt file
    sitemapSize: 5000, // Limit per sitemap file
    exclude: ['/admin', '/dashboard'], // Add any paths you want to exclude
  };
  