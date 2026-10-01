import Head from 'next/head'
import Link from '@/components/Link'
import { BlogSeo } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import kebabCase from '@/lib/utils/kebabCase'
import { formatPostDate } from '@/lib/utils/formatDate'

const readMinutes = (frontMatter) => {
  if (frontMatter.wordCount) return Math.max(1, Math.round(frontMatter.wordCount / 200))
  if (frontMatter.readingTime?.minutes) return Math.max(1, Math.round(frontMatter.readingTime.minutes))
  return 1
}

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { slug, date, title, tags, headings = [], wordCount = 0, hasMath } = frontMatter
  const showToc = wordCount > 1500 && headings.length > 0
  const minutes = readMinutes(frontMatter)

  return (
    <>
      <BlogSeo url={`${siteMetadata.siteUrl}/blog/${slug}`} authorDetails={authorDetails} {...frontMatter} />
      {hasMath ? (
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
            integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
            crossOrigin="anonymous"
          />
        </Head>
      ) : null}
      <article className="article">
        <header>
          <h1 className="page-title">{title}</h1>
          <p className="meta-line">
            <time dateTime={date}>{formatPostDate(date)}</time>
            <span aria-hidden="true"> · </span>
            <span>{minutes} min read</span>
          </p>
          {tags?.length ? (
            <nav className="tag-filter post-tags" aria-label="Post tags">
              {tags.map((tag) => (
                <Link key={tag} href={`/tags/${kebabCase(tag)}`}>
                  {tag}
                </Link>
              ))}
            </nav>
          ) : null}
        </header>
        {showToc ? (
          <nav className="toc" aria-label="Contents">
            <p>Contents</p>
            <ol>
              {headings.map((heading) => (
                <li key={heading.id} className={heading.depth === 3 ? 'toc-h3' : undefined}>
                  <a href={`#${heading.id}`}>{heading.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <div className="article-body">{children}</div>
        {prev || next ? (
          <nav className="more-posts" aria-label="More posts">
            <ul className="rows">
              {prev ? (
                <li>
                  <Link href={`/blog/${prev.slug}`} className="row-link">
                    <span className="row-main">
                      <span className="row-title">{prev.title}</span>
                      {prev.summary ? <span className="row-summary">{prev.summary}</span> : null}
                    </span>
                    <span className="row-meta">Previous</span>
                  </Link>
                </li>
              ) : null}
              {next ? (
                <li>
                  <Link href={`/blog/${next.slug}`} className="row-link">
                    <span className="row-main">
                      <span className="row-title">{next.title}</span>
                      {next.summary ? <span className="row-summary">{next.summary}</span> : null}
                    </span>
                    <span className="row-meta">Next</span>
                  </Link>
                </li>
              ) : null}
            </ul>
          </nav>
        ) : null}
      </article>
    </>
  )
}
