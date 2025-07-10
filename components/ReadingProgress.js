import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ReadingProgress = ({ className = '' }) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      const clampedProgress = Math.min(100, Math.max(0, progress))
      
      setScrollProgress(clampedProgress)
      
      // Show progress bar after scrolling a bit (after 100px)
      setIsVisible(scrollTop > 100)
      
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress)
        ticking = true
      }
    }

    // Initial calculation
    updateScrollProgress()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      initial={{ opacity: 0, y: -5 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -5
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Progress Bar Container */}
      <div className="h-1 bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg"
          style={{ 
            width: `${scrollProgress}%`,
            boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
          }}
          transition={{ 
            width: { duration: 0.1, ease: "easeOut" }
          }}
        />
      </div>
      
      {/* Reading completion indicator */}
      <motion.div
        className="absolute top-1 right-2 sm:right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 shadow-sm border border-gray-200/50 dark:border-gray-700/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <span className="hidden sm:inline">{Math.round(scrollProgress)}% completed</span>
        <span className="sm:hidden">{Math.round(scrollProgress)}%</span>
      </motion.div>
    </motion.div>
  )
}

export default ReadingProgress