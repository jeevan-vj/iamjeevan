import Link from '@/components/Link'
import { PageSeo } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import NextImage from 'next/image'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSeo title={siteMetadata.title} description={siteMetadata.description} />
      <div className="">
        <div className="hero-container flex">
          <div className="me p-8 pl-0">
            <h2 className="text-5xl dark:font-black mb-5 font-medium">
              Hi, I'm{' '}
              <div className="text-purple-600 inline-block duration-500 hover:-translate-y-1">
                Jeevan
              </div>
            </h2>
            <h2 className="text-5xl dark:text-white-800 dark:font-black font-medium">
              Software Developer
            </h2>
          </div>
          <div className="picture"></div>
        </div>
      </div>
      <div className="">
        <div className="pt-6 pb-5 space-y-2 md:space-y-5">
          <h1 className="text-sm text-pink-500 dark:font-black ">RECENTLY PUBLISHED</h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>

        {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
          {
            !posts.length && 'No posts found.'
          }
          const { slug, date, title, summary, tags } = frontMatter
          return (
            <div key={slug} className="transform transition mb-10">
              <div id="body" className="flex flex-col">
                <Link id="name" className="mb-2 hover:text-purple-500 " href={`/blog/${slug}`}>
                  <h3 className="text-xl font-semibold dark:font-black font-gray-1000">{title}</h3>
                </Link>
                <p id="job" className="text-gray-800 mt-2 dark:text-white">
                  {summary}
                </p>
                <div className="flex flex-wrap mt-3">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
                <div className="text-base font-medium leading-6 mt-5 duration-200 hover:translate-x-1 hover:text-purple-400">
                  <Link
                    href={`/blog/${slug}`}
                    className="font-white font-semibold "
                    aria-label={`Read "${title}"`}
                  >
                    Read more &rarr;
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
