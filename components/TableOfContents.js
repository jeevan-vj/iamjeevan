import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TableOfContents = ({ content, className = '' }) => {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const tocRef = useRef(null)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Parse headings from content
  useEffect(() => {
    if (!isClient || typeof window === 'undefined' || !content) return

    const parseHeadings = () => {
      // Look for headings in the actual DOM
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      const parsedHeadings = []

      headingElements.forEach((heading, index) => {
        // Skip if heading is in header (title) or footer areas
        if (heading.closest('header') || heading.closest('footer')) return

        const level = parseInt(heading.tagName.charAt(1))
        const text = heading.textContent || heading.innerText
        
        // Create or use existing ID
        let id = heading.id
        if (!id) {
          id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
          heading.id = id
        }

        parsedHeadings.push({
          id,
          text: text.replace(/\*\*/g, ''), // Remove bold markdown
          level,
          element: heading
        })
      })

      setHeadings(parsedHeadings)
    }

    // Parse headings when content is available
    const timer = setTimeout(parseHeadings, 100)
    return () => clearTimeout(timer)
  }, [content, isClient])

  // Scroll spy functionality
  useEffect(() => {
    if (!isClient || headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0.1
      }
    )

    headings.forEach(({ element }) => {
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  // Smooth scroll to heading
  const scrollToHeading = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Account for fixed header
      const top = element.offsetTop - offset
      window.scrollTo({
        top,
        behavior: 'smooth'
      })
      setIsOpen(false) // Close mobile drawer
    }
  }

  // Don't render anything on server side or if no headings
  if (!isClient || headings.length === 0) return null

  const tocVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  }

  const mobileDrawerVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0 }
  }

  return (
    <>
      {/* Mobile TOC Button */}
      <motion.button
        className="fixed top-20 left-4 z-40 lg:hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <svg
          className="w-5 h-5 text-gray-600 dark:text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </motion.button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              className="fixed top-0 left-0 h-full w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg z-50 lg:hidden border-r border-gray-200 dark:border-gray-700"
              variants={mobileDrawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Table of Contents
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto">
                  {headings.map((heading) => (
                    <motion.button
                      key={heading.id}
                      onClick={() => scrollToHeading(heading.id)}
                      className={`
                        block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                        ${heading.level === 1 ? 'font-semibold' : ''}
                        ${heading.level === 2 ? 'ml-3 font-medium' : ''}
                        ${heading.level === 3 ? 'ml-6' : ''}
                        ${heading.level === 4 ? 'ml-9' : ''}
                        ${heading.level >= 5 ? 'ml-12' : ''}
                        ${
                          activeId === heading.id
                            ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-l-2 border-indigo-500'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        }
                      `}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {heading.text}
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop TOC */}
      <motion.aside
        ref={tocRef}
        className={`hidden lg:block fixed top-24 left-6 w-64 max-h-[calc(100vh-120px)] overflow-y-auto z-30 ${className}`}
        variants={tocVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6">
          <motion.h3 
            className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"
            variants={itemVariants}
          >
            <svg
              className="w-5 h-5 mr-2 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            Contents
          </motion.h3>
          
          <nav className="space-y-1">
            {headings.map((heading) => (
              <motion.button
                key={heading.id}
                onClick={() => scrollToHeading(heading.id)}
                className={`
                  block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200
                  ${heading.level === 1 ? 'font-semibold text-base' : ''}
                  ${heading.level === 2 ? 'ml-3 font-medium' : ''}
                  ${heading.level === 3 ? 'ml-6' : ''}
                  ${heading.level === 4 ? 'ml-9 text-xs' : ''}
                  ${heading.level >= 5 ? 'ml-12 text-xs' : ''}
                  ${
                    activeId === heading.id
                      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-600 dark:text-indigo-400 border-l-3 border-indigo-500 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }
                `}
                variants={itemVariants}
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative">
                  {heading.text}
                  {activeId === heading.id && (
                    <motion.div
                      className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-indigo-500 rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </span>
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.aside>
    </>
  )
}

export default TableOfContents