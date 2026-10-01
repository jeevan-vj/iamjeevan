import { PageSeo } from '@/components/SEO'
import Section from '@/components/Section'
import { StaticRow } from '@/components/ListRow'
import profile from '@/data/profile'
import siteMetadata from '@/data/siteMetadata'

export default function About() {
  return (
    <>
      <PageSeo
        title={`About · ${siteMetadata.title}`}
        description={profile.about.page}
      />
      <header className="page-intro">
        <h1 className="page-title">About</h1>
        <p className="about-copy prose-follow">{profile.about.page}</p>
        <p className="stack">{profile.about.stack}</p>
      </header>
      <Section label="Experience">
        <ul className="rows">
          {profile.experience.map((job) => (
            <StaticRow
              key={`${job.organisation}-${job.years}`}
              title={`${job.role}, ${job.organisation}`}
              summary={job.outcome}
              meta={job.years}
            />
          ))}
        </ul>
      </Section>
    </>
  )
}
