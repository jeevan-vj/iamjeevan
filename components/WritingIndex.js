import { useMemo, useState } from 'react'
import Link from './Link'
import Section from './Section'
import ListRow from './ListRow'
import { formatMonthYear } from '@/lib/utils/formatDate'

const tagLabel = (slug) => slug.replace(/-/g, ' ')

const groupByYear = (posts) => {
  const groups = []
  posts.forEach((post) => {
    const year = String(new Date(post.date).getUTCFullYear())
    const last = groups[groups.length - 1]
    if (!last || last.year !== year) {
      groups.push({ year, posts: [post] })
    } else {
      last.posts.push(post)
    }
  })
  return groups
}

export default function WritingIndex({ posts, tags, activeTag }) {
  const [searchValue, setSearchValue] = useState('')

  const visiblePosts = useMemo(() => {
    const query = searchValue.trim().toLowerCase()
    if (!query) return posts
    return posts.filter((post) => {
      const haystack = `${post.title} ${post.summary || ''} ${(post.tags || []).join(' ')}`
      return haystack.toLowerCase().includes(query)
    })
  }, [posts, searchValue])

  const groups = groupByYear(visiblePosts)

  return (
    <>
      <header className="page-intro">
        <h1 className="page-title">Writing</h1>
        <p className="lede">Notes on problems I have had to solve in production.</p>
        <label className="sr-only" htmlFor="post-search">
          Search posts
        </label>
        <input
          id="post-search"
          className="search"
          type="search"
          value={searchValue}
          placeholder="Search posts"
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <nav className="tag-filter" aria-label="Tags">
          <Link href="/blog" aria-current={!activeTag ? 'page' : undefined}>
            All
          </Link>
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              aria-current={activeTag === tag ? 'page' : undefined}
            >
              {tagLabel(tag)}
            </Link>
          ))}
        </nav>
      </header>
      {groups.length === 0 ? <p className="empty">No posts found.</p> : null}
      {groups.map((group) => (
        <Section key={group.year} label={group.year}>
          <ul className="rows">
            {group.posts.map((post) => (
              <ListRow
                key={post.slug}
                href={`/blog/${post.slug}`}
                title={post.title}
                summary={post.summary}
                meta={formatMonthYear(post.date)}
              />
            ))}
          </ul>
        </Section>
      ))}
    </>
  )
}
