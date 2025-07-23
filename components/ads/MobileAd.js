import AdUnit from './AdUnit'
import adConfig from '@/data/adConfig'

const MobileAd = ({ className = '', lazy = true, ...props }) => {
  return (
    <div className={`w-full flex justify-center my-4 md:hidden ${className}`}>
      <AdUnit
        slot={adConfig.slots.responsive}
        format="auto"
        style={{ 
          display: 'block',
          minHeight: '100px',
          maxWidth: '100%'
        }}
        lazy={lazy}
        minScrollPercentage={adConfig.settings.scrollTriggers.mobile}
        {...props}
      />
    </div>
  )
}

export default MobileAd