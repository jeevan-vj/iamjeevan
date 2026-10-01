import Link from '@/components/Link'
import { PageSeo } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import work from '@/data/work'

export async function getStaticPaths() {
  return {
    paths: work.map((item) => ({ params: { slug: item.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const study = work.find((item) => item.slug === params.slug) || null
  return { props: { study } }
}

const fields = [
  ['Problem', 'problem'],
  ['Approach', 'approach'],
  ['Outcome', 'outcome'],
]

export default function CaseStudy({ study }) {
  return (
    <>
      <PageSeo title={`${study.title} · ${siteMetadata.title}`} description={study.summary} />
      <article className="article">
        <header>
          <h1 className="page-title">{study.title}</h1>
          <p className="lede">{study.summary}</p>
        </header>
        <dl className="def-list">
          {fields.map(([label, key]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{study[key]}</dd>
            </div>
          ))}
        </dl>
        <p className="more">
          <Link className="emphasis-link" href="/work">
            All work
          </Link>
        </p>
      </article>
    </>
  )
}
