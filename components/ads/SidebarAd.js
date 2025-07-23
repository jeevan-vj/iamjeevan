import { useState, useEffect } from 'react'
import AdUnit from './AdUnit'
import adConfig from '@/data/adConfig'

const SidebarAd = ({ className = '', sticky = true, ...props }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      setIsVisible(scrollPercentage > adConfig.settings.scrollTriggers.sidebar)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className={`hidden lg:block ${sticky ? 'sticky top-20' : ''} ${className}`}>
      <div className="w-80 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 text-center">
            Advertisement
          </p>
          <AdUnit
            slot={adConfig.slots.responsive}
            format="auto"
            style={{ 
              display: 'block',
              minHeight: '250px',
              maxWidth: '336px'
            }}
            lazy={false}
            {...props}
          />
        </div>
      </div>
    </div>
  )
}

export default SidebarAd