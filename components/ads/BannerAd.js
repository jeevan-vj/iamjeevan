import AdUnit from './AdUnit'
import adConfig from '@/data/adConfig'

const BannerAd = ({ className = '', lazy = true, ...props }) => {
  return (
    <div className={`w-full flex justify-center my-8 ${className}`}>
      <div className="w-full max-w-4xl">
        <AdUnit
          slot={adConfig.slots.responsive}
          format="auto"
          style={{ 
            display: 'block',
            minHeight: '90px'
          }}
          className="mx-auto"
          lazy={lazy}
          minScrollPercentage={adConfig.settings.scrollTriggers.banner}
          {...props}
        />
      </div>
    </div>
  )
}

export default BannerAd