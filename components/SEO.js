import Head from 'next/head'
import { useRouter } from 'next/router'
import siteMetadata from '@/data/siteMetadata'

const canonicalPath = (asPath) => {
  const path = asPath.split('?')[0].split('#')[0]
  return path === '/' ? '' : path
}

const ogImage = (title) =>
  `${siteMetadata.siteUrl}/api/og?title=${encodeURIComponent(title || siteMetadata.title)}`

export const PageSeo = ({ title, description }) => {
  const router = useRouter()
  const url = `${siteMetadata.siteUrl}${canonicalPath(router.asPath)}`
  const image = ogImage(title)
  const summary = description || siteMetadata.description

  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={summary} />
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:description" content={summary} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={summary} />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}

export const BlogSeo = ({ authorDetails, title, summary, date, lastmod, url, images = [] }) => {
  const router = useRouter()
  const publishedAt = new Date(date).toISOString()
  const modifiedAt = new Date(lastmod || date).toISOString()
  const pageUrl = url || `${siteMetadata.siteUrl}${canonicalPath(router.asPath)}`
  const description = summary || siteMetadata.description
  const image = ogImage(title)

  let imagesArr =
    images.length === 0
      ? [image]
      : typeof images === 'string'
      ? [`${siteMetadata.siteUrl}${images}`]
      : images.map((img) => (img.startsWith('http') ? img : `${siteMetadata.siteUrl}${img}`))

  if (!images.length) {
    imagesArr = [image]
  }

  const featuredImages = imagesArr.map((img) => ({
    '@type': 'ImageObject',
    url: img,
  }))

  const authorList = authorDetails
    ? authorDetails.map((author) => ({ '@type': 'Person', name: author.name }))
    : { '@type': 'Person', name: siteMetadata.author }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    headline: title,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      '@type': 'Person',
      name: siteMetadata.author,
    },
    description,
  }

  return (
    <Head>
      <title>{`${title} · ${siteMetadata.title}`}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={featuredImages[0].url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={featuredImages[0].url} />
      {date && <meta property="article:published_time" content={publishedAt} />}
      {lastmod && <meta property="article:modified_time" content={modifiedAt} />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  )
}
