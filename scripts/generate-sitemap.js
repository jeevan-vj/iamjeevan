const fs = require('fs')
const globby = require('globby')
const siteMetadata = require('../data/siteMetadata')

;(async () => {
  const pages = await globby([
    'pages/*.js',
    'data/blog/**/*.mdx',
    'data/blog/**/*.md',
    'public/tags/**/*.xml',
    '!pages/_*.js',
    '!pages/api',
  ])

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => {
    const path = page
      .replace('pages/', '/')
      .replace('data/blog', '/blog')
      .replace('public/', '/')
      .replace('.js', '')
      .replace('.mdx', '')
      .replace('.md', '')
      .replace('/feed.xml', '')
    const route = path === '/index' ? '' : path
    if (page === `pages/404.js` || page === `pages/blog/[...slug].js`) {
      return
    }
    return `  <url>
    <loc>${siteMetadata.siteUrl}${route}</loc>
  </url>`
  })
  .filter(Boolean)
  .join('\n')}
</urlset>`

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', sitemap)
  console.log('Sitemap generated successfully!')
})()
