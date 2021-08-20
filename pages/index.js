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
              Hi, I'm <div className="text-purple-600 inline-block">Jeevan</div>
            </h2>
            <h2 className="text-5xl dark:text-white-800 dark:font-black font-medium">
              Software Developer
            </h2>
          </div>
          <div className="picture"></div>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-sm text-purple-500 dark:font-black ">RECENTLY PUBLISHED</h1>
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
            <div
              key={slug}
              className="p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 mb-5  transform transition duration-500 hover:-translate-y-1"
            >
              <div className="flex">
                <div className="flex items-center">
                  <NextImage
                    width="50"
                    height="50"
                    alt="mountain"
                    className="rounded-full border-2 border-gray-300 object-cover"
                    src="/static/images/jeevan.jpg"
                  />
                  <div className="ml-5">
                    <p>Jeevan</p>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </div>
                </div>
              </div>

              <div id="body" className="flex flex-col ml-12 p-5">
                <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
                <Link id="name" className="text-xl font-semibold mb-2" href={`/blog/${slug}`}>
                  {title}
                </Link>
                <p id="job" className="text-gray-800 mt-2 dark:text-white">
                  {summary}
                </p>
                <div className="text-base font-medium leading-6 mt-5">
                  <Link
                    href={`/blog/${slug}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Read "${title}"`}
                  >
                    Read more &rarr;
                  </Link>
                </div>
              </div>
            </div>
          )
        })}

        {/* <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul> */}
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
