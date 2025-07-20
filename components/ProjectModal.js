import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from './Image'
import Link from './Link'

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!project) return null

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const StatusIndicator = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'Live': return 'bg-green-500'
        case 'Production': return 'bg-blue-500'
        case 'Maintained': return 'bg-yellow-500'
        case 'Published': return 'bg-purple-500'
        default: return 'bg-gray-500'
      }
    }

    return (
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${getStatusColor(status)} animate-pulse`} />
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{status}</span>
      </div>
    )
  }

  const ActionButton = ({ href, icon, label, primary = false }) => (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        primary 
          ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl' 
          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
      }`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <span>{label}</span>
    </motion.a>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            <div className="overflow-y-auto max-h-[90vh]">
              {/* Hero Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={project.images?.[currentImageIndex] || project.imgSrc}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  width={800}
                  height={400}
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                  style={{
                    background: `linear-gradient(to top, ${project.color}40, transparent)`
                  }}
                />
                
                {/* Featured Badge */}
                {project.featured && (
                  <motion.div
                    className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    ⭐ Featured
                  </motion.div>
                )}

                {/* Image Navigation */}
                {project.images && project.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {project.images.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          currentImageIndex === index 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <motion.h1 
                        className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
                        style={{ color: project.color }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {project.title}
                      </motion.h1>
                      <motion.p 
                        className="text-gray-600 dark:text-gray-400 text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {project.category} • {project.type}
                      </motion.p>
                    </div>
                    <StatusIndicator status={project.status} />
                  </div>

                  <motion.p 
                    className="text-gray-700 dark:text-gray-300 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.description}
                  </motion.p>
                </div>

                {/* Tech Stack */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Project Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Timeline */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      Timeline
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Year:</span>
                        <span className="font-medium">{project.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                        <span className="font-medium">{project.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Team:</span>
                        <span className="font-medium">{project.team?.join(', ')}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Metrics */}
                  {project.metrics && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        Key Metrics
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400 capitalize">
                              {key.replace('_', ' ')}:
                            </span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Tags */}
                {project.tags && (
                  <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <motion.span
                          key={tag}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                        >
                          #{tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-wrap gap-3 pt-6 border-t border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {project.links?.live && (
                    <ActionButton
                      href={project.links.live}
                      primary={true}
                      label="View Live"
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      }
                    />
                  )}
                  
                  {project.links?.github && (
                    <ActionButton
                      href={project.links.github}
                      label="View Code"
                      icon={
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      }
                    />
                  )}

                  {project.links?.case_study && (
                    <ActionButton
                      href={project.links.case_study}
                      label="Read Case Study"
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      }
                    />
                  )}

                  {project.links?.documentation && (
                    <ActionButton
                      href={project.links.documentation}
                      label="Documentation"
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      }
                    />
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal