import AdUnit from './AdUnit'
import adConfig from '@/data/adConfig'

const InlineAd = ({ 
  className = '', 
  lazy = true, 
  size = 'medium',
  ...props 
}) => {
  const minHeights = {
    small: '200px',
    medium: '250px',
    large: '280px'
  }

  const minHeight = minHeights[size] || minHeights.medium

  return (
    <div className={`w-full flex justify-center my-6 not-prose ${className}`}>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 shadow-sm max-w-sm w-full">
        <div className="text-center">
          <span className="inline-block px-3 py-1 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-full mb-3">
            Sponsored Content
          </span>
        </div>
        <AdUnit
          slot={adConfig.slots.responsive}
          format="auto"
          style={{ 
            display: 'block',
            minHeight: minHeight,
            maxWidth: '336px',
            margin: '0 auto'
          }}
          lazy={lazy}
          minScrollPercentage={adConfig.settings.scrollTriggers.inline}
          {...props}
        />
      </div>
    </div>
  )
}

export default InlineAd