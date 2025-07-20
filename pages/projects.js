import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import ProjectShowcase from '@/components/ProjectShowcase'
import { PageSeo } from '@/components/SEO'
import { motion } from 'framer-motion'

export default function Projects() {
  return (
    <>
      <PageSeo title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <motion.div 
          className="pt-6 pb-8 space-y-2 md:space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Projects
          </motion.h1>
          <motion.p 
            className="text-lg leading-7 text-gray-500 dark:text-gray-400 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Explore my portfolio of innovative solutions, from enterprise applications to open-source contributions. 
            Each project represents a unique challenge solved with modern technologies and best practices.
          </motion.p>
        </motion.div>
        <motion.div 
          className="container py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <ProjectShowcase projects={projectsData} />
        </motion.div>
      </div>
    </>
  )
}
