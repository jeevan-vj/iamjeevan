import Link from '@/components/Link'
import { PageSeo } from '@/components/SEO'
import Section from '@/components/Section'
import ListRow from '@/components/ListRow'
import siteMetadata from '@/data/siteMetadata'
import work from '@/data/work'

export default function Work() {
  return (
    <>
      <PageSeo
        title={`Work · ${siteMetadata.title}`}
        description="Selected systems I have designed and shipped."
      />
      <header className="page-intro">
        <h1 className="page-title">Work</h1>
        <p className="lede">Selected systems I have designed and shipped.</p>
      </header>
      <Section label="Case studies">
        <ul className="rows">
          {work.map((item) => (
            <ListRow
              key={item.slug}
              href={`/work/${item.slug}`}
              title={item.title}
              summary={item.summary}
              meta="Case study"
            />
          ))}
        </ul>
        <p className="more">
          <Link className="emphasis-link" href="/#contact">
            Work with me
          </Link>
        </p>
      </Section>
    </>
  )
}
