import Link from '@/components/Link'
import { PageSeo } from '@/components/SEO'
import Tag from '@/components/Tag'
import Hero from '@/components/Hero' // Import the new Hero component
import { BannerAd, InFeedAd, MobileAd } from '@/components/ads'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import NextImage from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  // Work experience data
  const workHistory = [
    {
      company: 'Datacom',
      title: 'Technical Lead',
      period: '2022 – Present',
      description:
        'Leading engineering teams to deliver enterprise solutions, mentoring developers, and driving technical strategy for large-scale projects.',
    },
    {
      company: 'Kinesso',
      title: 'Senior Software Engineer',
      period: '2019 – 2022',
      description:
        'Developed and maintained marketing technology platforms, collaborated with cross-functional teams, and improved system performance and reliability.',
    },
    {
      company: 'Sitecore',
      title: 'Software Engineer',
      period: '2017 – 2019',
      description:
        'Worked on CMS product development, implemented new features, and contributed to code quality and best practices.',
    },
    {
      company: 'CMS',
      title: 'Software Engineer',
      period: '2015 – 2017',
      description:
        'Built and maintained content management solutions, integrated third-party APIs, and supported client deployments.',
    },
    {
      company: 'Bileete',
      title: 'Junior Developer',
      period: '2013 – 2015',
      description:
        'Assisted in developing SaaS products, fixed bugs, and learned modern web development practices.',
    },
  ]

  // Track expanded job index
  const [expanded, setExpanded] = useState(null)

  const handleToggle = (idx) => {
    setExpanded(expanded === idx ? null : idx)
  }

  return (
    <>
      <PageSeo title={siteMetadata.title} description={siteMetadata.description} />
      {/* Use the Hero component */}
      <Hero />

      {/* Work Experience Timeline */}
      <motion.section 
        className="w-full max-w-3xl mx-auto mb-12" 
        aria-label="Work Experience Timeline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900 dark:text-white"
          variants={itemVariants}
        >
          Work Experience
        </motion.h2>
        {/* Desktop timeline */}
        <motion.ol className="relative border-l border-gray-300 dark:border-gray-700 ml-4 md:ml-8 hidden md:block">
          {workHistory.map((job, idx) => (
            <motion.li 
              key={job.company} 
              className="mb-10 ml-4"
              variants={itemVariants}
            >
              <div className="absolute w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full -left-1.5 border-2 border-white dark:border-gray-900"></div>
              <button
                className="w-full text-left bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 transition hover:shadow-lg focus:outline-none"
                aria-expanded={expanded === idx}
                onClick={() => handleToggle(idx)}
              >
                <div className="flex-1">
                  <span className="text-base font-semibold text-gray-900 dark:text-white">
                    {job.title ? `${job.title} at ` : ''}
                    <span className="text-purple-600 dark:text-purple-400">{job.company}</span>
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400">
                    {job.period}
                  </span>
                </div>
                <span className="ml-2 text-purple-500 dark:text-purple-300">
                  {expanded === idx ? '▲' : '▼'}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expanded === idx ? 'max-h-40 mt-2 opacity-100' : 'max-h-0 opacity-0'
                }`}
                aria-hidden={expanded !== idx}
              >
                <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 text-gray-700 dark:text-gray-300 text-sm">
                  {job.description}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>
        {/* Mobile optimized: cards without timeline line */}
        <motion.div className="md:hidden flex flex-col gap-4 mt-4">
          {workHistory.map((job, idx) => (
            <motion.div
              key={job.company + '-mobile'}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col"
              variants={itemVariants}
            >
              <button
                className="flex justify-between items-center w-full text-left focus:outline-none"
                aria-expanded={expanded === idx}
                onClick={() => handleToggle(idx)}
              >
                <span>
                  <span className="text-base font-semibold text-gray-900 dark:text-white">
                    {job.title ? `${job.title} at ` : ''}
                    <span className="text-purple-600 dark:text-purple-400">{job.company}</span>
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400">
                    {job.period}
                  </span>
                </span>
                <span className="ml-2 text-purple-500 dark:text-purple-300">
                  {expanded === idx ? '▲' : '▼'}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expanded === idx ? 'max-h-40 mt-2 opacity-100' : 'max-h-0 opacity-0'
                }`}
                aria-hidden={expanded !== idx}
              >
                <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-3 text-gray-700 dark:text-gray-300 text-sm">
                  {job.description}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Ad placement after work experience */}
      <BannerAd />
      <MobileAd />

      <motion.div 
        className=""
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.div 
          className="pt-6 pb-5 space-y-2 md:space-y-5"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-sm text-pink-500 dark:font-black"
            variants={itemVariants}
          >
            RECENTLY PUBLISHED
          </motion.h1>
          <motion.p 
            className="text-lg leading-7 text-gray-500 dark:text-gray-400"
            variants={itemVariants}
          >
            {siteMetadata.description}
          </motion.p>
        </motion.div>

{posts.slice(0, MAX_DISPLAY).map((frontMatter, index) => {
          {
            !posts.length && 'No posts found.'
          }
          const { slug, date, title, summary, tags } = frontMatter
          return (
            <div key={`post-${slug}`}>
              <motion.div 
                className="transform transition mb-10"
                variants={itemVariants}
              >
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
              </motion.div>
              {/* Add in-feed ad after 2nd post */}
              {index === 1 && <InFeedAd />}
            </div>
          )
        })}
      </motion.div>
      {posts.length > MAX_DISPLAY && (
        <motion.div 
          className="flex justify-end text-base font-medium leading-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </motion.div>
      )}
    </>
  )
}
