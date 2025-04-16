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
      {/* Modernized Hero Section */}
      <section
        className="relative flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-12 md:py-20"
        aria-label="Hero"
      >
        <div className="flex-1 flex flex-col items-start">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 animate-fadein">
            Hi, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 hover:from-pink-500 hover:to-purple-500 focus:outline-none">
              Jeevan
            </span>
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
            Software Developer
          </h2>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-400 max-w-xl">
            {siteMetadata.description}
          </p>
          <Link
            href="/about"
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:from-pink-600 hover:to-purple-500 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Learn more about Jeevan"
          >
            Learn more about me
          </Link>
        </div>
        <div className="flex-1 flex justify-center md:justify-end mb-8 md:mb-0">
          <NextImage
            src="/static/images/jeevan.jpg"
            alt="Jeevan Wijerathna"
            width={220}
            height={220}
            className="rounded-full shadow-xl border-4 border-white dark:border-gray-800 transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>
      </section>
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
