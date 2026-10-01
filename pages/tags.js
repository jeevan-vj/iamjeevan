import { PageSeo } from '@/components/SEO'
import WritingIndex from '@/components/WritingIndex'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  const tagCounts = await getAllTags('blog')
  const tags = Object.keys(tagCounts).sort(
    (a, b) => tagCounts[b] - tagCounts[a] || a.localeCompare(b)
  )

  return { props: { posts, tags } }
}

export default function Tags({ posts, tags }) {
  return (
    <>
      <PageSeo
        title={`Writing · ${siteMetadata.title}`}
        description="Notes on problems I have had to solve in production."
      />
      <WritingIndex posts={posts} tags={tags} />
    </>
  )
}
