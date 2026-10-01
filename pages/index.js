import Link from '@/components/Link'
import { PageSeo } from '@/components/SEO'
import Section from '@/components/Section'
import ListRow from '@/components/ListRow'
import siteMetadata from '@/data/siteMetadata'
import profile from '@/data/profile'
import work from '@/data/work'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { formatMonthYear } from '@/lib/utils/formatDate'

const MAX_DISPLAY = 4

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  return { props: { posts: posts.slice(0, MAX_DISPLAY) } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSeo title={siteMetadata.title} description={profile.hero.lede} />
      <div className="hero">
        {profile.availability ? (
          <p className="status">
            <span className="status-dot" aria-hidden="true" />
            {profile.availability}
          </p>
        ) : null}
        <h1 className="hero-title">{profile.hero.title}</h1>
        <p className="lede">{profile.hero.lede}</p>
        <p className="hero-links">
          <Link className="text-link" href="/blog">
            Read the writing
          </Link>
          <Link className="text-link" href="/#contact">
            Work with me
          </Link>
        </p>
      </div>

      <Section label="Writing">
        <ul className="rows">
          {posts.map((post) => (
            <ListRow
              key={post.slug}
              href={`/blog/${post.slug}`}
              title={post.title}
              summary={post.summary}
              meta={formatMonthYear(post.date)}
            />
          ))}
        </ul>
        <p className="more">
          <Link className="emphasis-link" href="/blog">
            All posts
          </Link>
        </p>
      </Section>

      <Section label="Selected work">
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
      </Section>

      <Section label="About">
        <p className="about-copy">{profile.about.home}</p>
        <p className="stack">{profile.about.stack}</p>
      </Section>

      <Section id="contact" label="Contact">
        <p>
          If you want to talk about a system or a role, email{' '}
          <a className="inline-link" href={`mailto:${profile.contact.email}`}>
            {profile.contact.email}
          </a>
          .
        </p>
      </Section>
    </>
  )
}
