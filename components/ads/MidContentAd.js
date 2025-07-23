import AdUnit from './AdUnit'
import adConfig from '@/data/adConfig'

const MidContentAd = ({ className = '', lazy = true, ...props }) => {
  return (
    <div className={`w-full flex justify-center my-8 not-prose ${className}`}>
      <div className="max-w-2xl w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 text-center">
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
          minScrollPercentage={adConfig.settings.scrollTriggers.midContent}
          {...props}
        />
      </div>
    </div>
  )
}

export default MidContentAd