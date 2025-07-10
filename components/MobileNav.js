import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    if (navShow) {
      window.addEventListener('mousemove', handleMouseMove)
    }
    
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [navShow])

  // Menu icons and gradients for each nav item
  const navIcons = {
    'Home': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    'Blog': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    'Tags': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    'About': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  }

  const navGradients = {
    'Home': 'from-blue-500 to-cyan-400',
    'Blog': 'from-purple-500 to-pink-400', 
    'Tags': 'from-green-500 to-teal-400',
    'About': 'from-orange-500 to-red-400'
  }

  return (
    <div className="sm:hidden">
      {/* Hamburger/Close Button */}
      <motion.button
        type="button"
        className="relative w-10 h-10 ml-1 mr-1 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: navShow ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center w-full h-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 text-gray-900 dark:text-gray-100"
          >
            {navShow ? (
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </motion.div>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {navShow && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={onToggleNav}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ 
                type: 'spring', 
                damping: 25, 
                stiffness: 200,
                opacity: { duration: 0.3 }
              }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw]"
            >
              {/* Animated background with mouse tracking */}
              <div className="absolute inset-0 overflow-hidden rounded-l-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/80 dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-800/80 backdrop-blur-xl" />
                
                {/* Dynamic gradient following mouse */}
                <div 
                  className="absolute inset-0 opacity-20 dark:opacity-10 transition-all duration-700 ease-out"
                  style={{
                    background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.2), transparent 50%)`
                  }}
                />
                
                {/* Mesh gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
              </div>

              {/* Menu Content */}
              <div className="relative h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200/20 dark:border-gray-700/30">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent"
                  >
                    Navigation
                  </motion.h2>
                  
                  <motion.button
                    type="button"
                    className="w-8 h-8 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 flex items-center justify-center hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
                    onClick={onToggleNav}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-8">
                  <div className="space-y-4">
                    {headerNavLinks.map((link, index) => (
                      <motion.div
                        key={link.title}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * (index + 1), duration: 0.4 }}
                      >
                        <Link href={link.href} onClick={onToggleNav}>
                          <motion.div
                            className="group relative p-4 rounded-2xl border border-gray-200/30 dark:border-gray-700/30 hover:border-gray-300/50 dark:hover:border-gray-600/50 transition-all duration-300 cursor-pointer overflow-hidden"
                            whileHover={{ 
                              scale: 1.02,
                              y: -2,
                              boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* Background gradient on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${navGradients[link.title]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                            
                            <div className="relative flex items-center space-x-4">
                              {/* Icon */}
                              <motion.div 
                                className={`p-2 rounded-xl bg-gradient-to-r ${navGradients[link.title]} text-white shadow-lg`}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                              >
                                {navIcons[link.title]}
                              </motion.div>
                              
                              {/* Text */}
                              <div className="flex-1">
                                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-blue-600 dark:group-hover:from-white dark:group-hover:to-blue-400 transition-all duration-300">
                                  {link.title}
                                </span>
                              </div>
                              
                              {/* Arrow */}
                              <motion.div 
                                className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300"
                                animate={{ x: 0 }}
                                whileHover={{ x: 5 }}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </motion.div>
                            </div>
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                {/* Footer */}
                <motion.div 
                  className="p-6 border-t border-gray-200/20 dark:border-gray-700/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Made with ❤️ by Jeevan
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileNav
