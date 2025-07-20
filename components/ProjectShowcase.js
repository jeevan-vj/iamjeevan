import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import ProjectFilter from './ProjectFilter'
import ProjectModal from './ProjectModal'

const ProjectShowcase = ({ projects }) => {
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [viewMode, setViewMode] = useState('gallery')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleFilterChange = (filtered) => {
    setFilteredProjects(filtered)
  }

  const handleViewModeChange = (mode) => {
    setViewMode(mode)
  }

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  const getGridClass = () => {
    switch (viewMode) {
      case 'gallery':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      case 'list':
        return 'space-y-4'
      case 'bento':
        return 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr'
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const FeaturedSection = ({ featuredProjects }) => {
    if (!featuredProjects.length) return null

    return (
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Highlighting some of my most impactful and innovative work
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {featuredProjects.slice(0, 2).map((project, index) => (
            <motion.div
              key={project.id}
              className="relative group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                project={project}
                viewMode="gallery"
                onProjectClick={handleProjectClick}
              />
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 -z-10 blur-xl transition-opacity duration-500"
                initial={false}
                animate={{
                  background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)`
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    )
  }

  const ProjectGrid = ({ projects, viewMode }) => (
    <motion.div
      className={getGridClass()}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key={viewMode} // Force re-render when view mode changes
    >
      <AnimatePresence mode="wait">
        {projects.map((project, index) => (
          <motion.div
            key={`${project.id}-${viewMode}`}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.05,
              layout: { duration: 0.3 }
            }}
          >
            <ProjectCard
              project={project}
              viewMode={viewMode}
              onProjectClick={handleProjectClick}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )

  const EmptyState = () => (
    <motion.div
      className="text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        No projects found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Try adjusting your filters or search terms to find what you're looking for.
      </p>
      <motion.button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Reset Filters
      </motion.button>
    </motion.div>
  )

  const LoadingState = () => (
    <div className={getGridClass()}>
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          className="bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse"
          style={{ height: viewMode === 'list' ? '120px' : '300px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="h-full w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl" />
        </motion.div>
      ))}
    </div>
  )

  // Separate featured and regular projects
  const featuredProjects = useMemo(
    () => filteredProjects.filter(p => p.featured),
    [filteredProjects]
  )
  
  const regularProjects = useMemo(
    () => filteredProjects.filter(p => !p.featured),
    [filteredProjects]
  )

  return (
    <div className="space-y-8">
      {/* Filter Controls */}
      <ProjectFilter
        projects={projects}
        onFilterChange={handleFilterChange}
        onViewModeChange={handleViewModeChange}
        currentViewMode={viewMode}
      />

      {/* Results Count */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>
        
        {filteredProjects.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>View:</span>
            <span className="capitalize font-medium">{viewMode}</span>
          </div>
        )}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {filteredProjects.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div
            key="projects-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Featured Projects Section - Only show if we have featured projects and not in list view */}
            {featuredProjects.length > 0 && viewMode !== 'list' && (
              <FeaturedSection featuredProjects={featuredProjects} />
            )}

            {/* All Projects Section */}
            <div>
              {(regularProjects.length > 0 || viewMode === 'list') && (
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    {viewMode === 'list' ? 'All Projects' : 'More Projects'}
                  </h2>
                </motion.div>
              )}

              <ProjectGrid 
                projects={viewMode === 'list' ? filteredProjects : regularProjects} 
                viewMode={viewMode} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default ProjectShowcase