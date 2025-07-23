import AdUnit from './AdUnit'
import adConfig from '@/data/adConfig'

const InFeedAd = ({ className = '', lazy = true, ...props }) => {
  return (
    <article className={`w-full my-8 ${className}`}>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">
          Advertisement
        </p>
        <AdUnit
          slot={adConfig.slots.responsive}
          format="auto"
          style={{ 
            display: 'block',
            minHeight: '200px',
            width: '100%'
          }}
          responsive={true}
          lazy={lazy}
          minScrollPercentage={adConfig.settings.scrollTriggers.inFeed}
          {...props}
        />
      </div>
    </article>
  )
}

export default InFeedAd