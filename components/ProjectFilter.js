import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ProjectFilter = ({ projects, onFilterChange, onViewModeChange, currentViewMode = 'gallery' }) => {
  const [activeFilters, setActiveFilters] = useState({
    category: 'all',
    techStack: 'all',
    status: 'all',
    year: 'all',
    featured: 'all'
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Extract unique values for filter options
  const categories = ['all', ...new Set(projects.map(p => p.category))]
  const techStacks = ['all', ...new Set(projects.flatMap(p => p.techStack || []))]
  const statuses = ['all', ...new Set(projects.map(p => p.status))]
  const years = ['all', ...new Set(projects.map(p => p.year))].sort((a, b) => b - a)

  // Filter projects based on active filters and search
  useEffect(() => {
    let filtered = projects

    // Apply filters
    if (activeFilters.category !== 'all') {
      filtered = filtered.filter(p => p.category === activeFilters.category)
    }
    if (activeFilters.techStack !== 'all') {
      filtered = filtered.filter(p => p.techStack?.includes(activeFilters.techStack))
    }
    if (activeFilters.status !== 'all') {
      filtered = filtered.filter(p => p.status === activeFilters.status)
    }
    if (activeFilters.year !== 'all') {
      filtered = filtered.filter(p => p.year === activeFilters.year)
    }
    if (activeFilters.featured !== 'all') {
      const isFeatured = activeFilters.featured === 'true'
      filtered = filtered.filter(p => !!p.featured === isFeatured)
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.techStack?.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
        p.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    onFilterChange(filtered)
  }, [activeFilters, searchTerm, projects, onFilterChange])

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const clearAllFilters = () => {
    setActiveFilters({
      category: 'all',
      techStack: 'all',
      status: 'all',
      year: 'all',
      featured: 'all'
    })
    setSearchTerm('')
  }

  const activeFilterCount = Object.values(activeFilters).filter(val => val !== 'all').length + (searchTerm ? 1 : 0)

  const ViewModeButton = ({ mode, icon, label }) => (
    <motion.button
      onClick={() => onViewModeChange(mode)}
      className={`p-2 rounded-lg transition-all ${
        currentViewMode === mode 
          ? 'bg-blue-500 text-white shadow-lg' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={label}
    >
      {icon}
    </motion.button>
  )

  const FilterSelect = ({ label, value, options, onChange, icon }) => (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
        {icon}
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option === 'all' ? `All ${label}s` : option}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Search and View Mode Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <motion.input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400 dark:placeholder-gray-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchTerm && (
            <motion.button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">View:</span>
          <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <ViewModeButton
              mode="gallery"
              label="Gallery View"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              }
            />
            <ViewModeButton
              mode="list"
              label="List View"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              }
            />
            <ViewModeButton
              mode="bento"
              label="Bento Grid"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM14 12a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6zM4 14a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Filter Toggle Button */}
        <motion.button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="text-sm font-medium">Filters</span>
          {activeFilterCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-2 py-0.5 text-xs bg-blue-500 text-white rounded-full"
            >
              {activeFilterCount}
            </motion.span>
          )}
          <motion.svg
            className="w-4 h-4"
            animate={{ rotate: isFilterOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filter Projects</h3>
                {activeFilterCount > 0 && (
                  <motion.button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-500 hover:text-blue-600 font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear All ({activeFilterCount})
                  </motion.button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <FilterSelect
                  label="Category"
                  value={activeFilters.category}
                  options={categories}
                  onChange={(value) => handleFilterChange('category', value)}
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5m14 14H5" />
                    </svg>
                  }
                />

                <FilterSelect
                  label="Technology"
                  value={activeFilters.techStack}
                  options={techStacks.slice(0, 20)} // Limit to prevent too many options
                  onChange={(value) => handleFilterChange('techStack', value)}
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  }
                />

                <FilterSelect
                  label="Status"
                  value={activeFilters.status}
                  options={statuses}
                  onChange={(value) => handleFilterChange('status', value)}
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />

                <FilterSelect
                  label="Year"
                  value={activeFilters.year}
                  options={years}
                  onChange={(value) => handleFilterChange('year', value === 'all' ? 'all' : parseInt(value))}
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                />

                <FilterSelect
                  label="Featured"
                  value={activeFilters.featured}
                  options={['all', 'true', 'false']}
                  onChange={(value) => handleFilterChange('featured', value)}
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  }
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2"
        >
          {Object.entries(activeFilters).map(([key, value]) => {
            if (value === 'all') return null
            return (
              <motion.span
                key={`${key}-${value}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                <span className="capitalize">{key}: {value}</span>
                <button
                  onClick={() => handleFilterChange(key, 'all')}
                  className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.span>
            )
          })}
          {searchTerm && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm"
            >
              <span>Search: "{searchTerm}"</span>
              <button
                onClick={() => setSearchTerm('')}
                className="ml-1 hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-0.5"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.span>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default ProjectFilter