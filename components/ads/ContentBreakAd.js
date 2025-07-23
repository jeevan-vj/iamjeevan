import { useState, useEffect } from 'react'
import AdUnit from './AdUnit'
import adConfig from '@/data/adConfig'

const ContentBreakAd = ({ 
  className = '', 
  lazy = true,
  breakText = "Continue Reading",
  ...props 
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={`w-full my-8 not-prose ${className}`}>
      <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600"></div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {breakText}
            </span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600"></div>
          </div>
          
          <div className="max-w-sm mx-auto">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
              Advertisement
            </p>
            <AdUnit
              slot={adConfig.slots.responsive}
              format="auto"
              style={{ 
                display: 'block',
                minHeight: '250px',
                maxWidth: '336px',
                margin: '0 auto'
              }}
              lazy={lazy}
              minScrollPercentage={adConfig.settings.scrollTriggers.contentBreak}
              {...props}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentBreakAd