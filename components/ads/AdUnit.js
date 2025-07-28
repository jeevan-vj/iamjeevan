import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import adConfig from '@/data/adConfig'

const AdUnit = ({ 
  slot, 
  format = 'auto',
  responsive = adConfig.settings.responsive.enabled,
  style = {},
  className = '',
  lazy = adConfig.settings.lazyLoading,
  minScrollPercentage = 50,
  ...props 
}) => {
  // Don't render if ads are disabled globally
  if (!adConfig.settings.enabled) {
    return null
  }
  const adRef = useRef(null)
  const [isVisible, setIsVisible] = useState(!lazy)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!lazy) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
          if (scrollPercentage >= minScrollPercentage) {
            setIsVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.1 }
    )

    if (adRef.current) {
      observer.observe(adRef.current)
    }

    return () => observer.disconnect()
  }, [lazy, minScrollPercentage])

  useEffect(() => {
    if (isVisible && !isLoaded && window.adsbygoogle) {
      try {
        // Only push if the element hasn't been processed
        const adElement = adRef.current?.querySelector('.adsbygoogle')
        if (adElement && !adElement.dataset.adsbygoogleStatus) {
          window.adsbygoogle.push({})
          setIsLoaded(true)
        }
      } catch (error) {
        console.warn('AdSense error:', error)
      }
    }
  }, [isVisible, isLoaded])

  if (!isVisible) {
    return (
      <div 
        ref={adRef}
        className={`ad-placeholder ${className}`}
        style={{ 
          minHeight: format === 'rectangle' ? '250px' : format === 'banner' ? '90px' : '100px',
          backgroundColor: 'transparent',
          ...style 
        }}
        aria-label="Advertisement loading"
      />
    )
  }

  return (
    <div ref={adRef} className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ 
          display: 'block',
          textAlign: 'center',
          ...style 
        }}
        data-ad-client={adConfig.clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...props}
      />
    </div>
  )
}

export default AdUnit