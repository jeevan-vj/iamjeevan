import Link from '@/components/Link'
import NextImage from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Software Engineer'
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)
    
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.section
      className="relative flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-12 md:py-20"
      aria-label="Hero"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className="flex-1 flex flex-col items-start"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="text-lg mb-2">
          Hello  <span role="img" aria-label="Waving hand">👋</span>
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
          I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Jeevan
          </span>{' '}
          <span className="block">Wijerathna</span>
          <span className="block text-3xl sm:text-4xl md:text-5xl mt-2">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-1 h-8 ml-1 bg-indigo-600"
            />
          </span>
        </h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400 max-w-xl">
          Transforming complex problems into elegant digital solutions. With a passion for clean 
          code and innovative technologies, I bridge the gap between ideas and implementation to
          build software that makes a difference.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="https://www.linkedin.com/in/jeevan-wijerathna/"
            className="inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Connect on LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Let's Connect
          </Link>
        </motion.div>
      </motion.div>
      <motion.div 
        className="flex-1 relative flex justify-center md:justify-end mb-8 md:mb-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Gradient Background Effect */}
          <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 rounded-full blur-xl opacity-70 -z-20 animate-pulse"></div>
          {/* White Hexagon Shape */}
          <div 
            className="absolute -inset-2 bg-white dark:bg-gray-800 -z-10"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              transform: 'scale(1.1)',
            }}
          ></div>
          {/* Main Image */}
          <NextImage
            src="/static/images/jeevan.jpg"
            alt="Jeevan Wijerathna"
            width={300}
            height={300}
            className="rounded-xl shadow-xl z-10"
            priority
          />
          <div className="absolute bottom-0 right-0 bg-black/80 p-4 rounded-lg max-w-xs text-white text-sm italic">
            "Code is poetry written for both humans and machines to understand."
          </div>
          <div className="absolute -right-8 -bottom-8 w-16 h-16 rounded-full border-2 border-purple-500 flex items-center justify-center bg-gray-900 text-purple-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
