import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from './Image'
import Link from './Link'

const ProjectCard = ({ project, viewMode = 'gallery', onProjectClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const cardVariants = {
    gallery: {
      className: "group cursor-pointer",
      container: "relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500",
      content: "p-6",
      image: "w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
    },
    list: {
      className: "group cursor-pointer",
      container: "flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden",
      content: "flex-1 p-6",
      image: "w-full md:w-48 h-48 md:h-32 object-cover"
    },
    bento: {
      className: "group cursor-pointer",
      container: `relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 ${project.featured ? 'md:col-span-2 md:row-span-2' : ''}`,
      content: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end",
      image: `w-full ${project.featured ? 'h-96' : 'h-64'} object-cover`
    }
  }

  const mode = cardVariants[viewMode]

  const handleCardClick = () => {
    if (onProjectClick) {
      onProjectClick(project)
    }
  }

  const TechBadge = ({ tech }) => (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-2 mb-2"
    >
      {tech}
    </motion.span>
  )

  const StatusBadge = ({ status, featured }) => (
    <div className="flex items-center gap-2 mb-2">
      {featured && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
        >
          ⭐ Featured
        </motion.span>
      )}
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
          status === 'Live' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
          status === 'Production' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
          'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
        }`}
      >
        <div className={`w-2 h-2 rounded-full mr-1 ${
          status === 'Live' ? 'bg-green-500' :
          status === 'Production' ? 'bg-blue-500' :
          'bg-gray-500'
        }`} />
        {status}
      </motion.span>
    </div>
  )

  return (
    <motion.div
      className={mode.className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
      whileHover={{ y: viewMode === 'gallery' ? -8 : -2 }}
      style={{ 
        borderColor: project.color + '20',
        borderWidth: '2px'
      }}
    >
      <motion.div className={mode.container}>
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10"
            style={{
              background: `linear-gradient(135deg, ${project.color}40, ${project.color}80)`
            }}
          />
          
          <Image
            alt={project.title}
            src={project.imgSrc}
            className={mode.image}
            width={viewMode === 'bento' && project.featured ? 800 : 400}
            height={viewMode === 'bento' && project.featured ? 600 : 300}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Image Overlay for Bento Mode */}
          {viewMode === 'bento' && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          )}
          
          {/* Hover Actions */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-4 right-4 flex gap-2 z-20"
              >
                {project.links?.live && (
                  <motion.a
                    href={project.links.live}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:scale-110 transition-transform"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                )}
                {project.links?.github && (
                  <motion.a
                    href={project.links.github}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:scale-110 transition-transform"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </motion.a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <div className={mode.content}>
          <StatusBadge status={project.status} featured={project.featured} />
          
          <motion.h3 
            className={`font-bold mb-2 ${
              viewMode === 'bento' ? 'text-white text-xl md:text-2xl' : 'text-lg text-gray-900 dark:text-gray-100'
            }`}
            style={{ color: viewMode === 'bento' ? 'white' : project.color }}
          >
            {project.title}
          </motion.h3>
          
          <motion.p 
            className={`mb-4 ${
              viewMode === 'bento' ? 'text-gray-200 text-sm' : 
              viewMode === 'list' ? 'text-gray-600 dark:text-gray-300 text-sm' :
              'text-gray-600 dark:text-gray-300 text-sm'
            }`}
          >
            {viewMode === 'list' ? project.shortDescription : project.description}
          </motion.p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.techStack?.slice(0, viewMode === 'list' ? 3 : 4).map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`px-2 py-1 text-xs rounded-md ${
                  viewMode === 'bento' ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {tech}
              </motion.span>
            ))}
            {project.techStack?.length > (viewMode === 'list' ? 3 : 4) && (
              <span className={`px-2 py-1 text-xs rounded-md ${
                viewMode === 'bento' ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
                +{project.techStack.length - (viewMode === 'list' ? 3 : 4)}
              </span>
            )}
          </div>

          {/* Metrics - Only show in gallery and bento modes */}
          {viewMode !== 'list' && project.metrics && (
            <div className="flex gap-4 text-xs">
              {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                <div key={key} className={viewMode === 'bento' ? 'text-gray-200' : 'text-gray-500 dark:text-gray-400'}>
                  <span className="font-medium">{key.replace('_', ' ')}: </span>
                  <span className="font-bold">{value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Year and Duration */}
          <div className={`flex items-center justify-between mt-4 text-xs ${
            viewMode === 'bento' ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'
          }`}>
            <span>{project.year}</span>
            <span>{project.duration}</span>
          </div>
        </div>

        {/* Color accent */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ backgroundColor: project.color }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default ProjectCard