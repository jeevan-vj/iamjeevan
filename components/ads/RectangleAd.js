import AdUnit from './AdUnit'
import adConfig from '@/data/adConfig'

const RectangleAd = ({ className = '', lazy = true, ...props }) => {
  return (
    <div className={`w-full flex justify-center my-6 ${className}`}>
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
        minScrollPercentage={adConfig.settings.scrollTriggers.rectangle}
        {...props}
      />
    </div>
  )
}

export default RectangleAd