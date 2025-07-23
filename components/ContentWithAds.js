import { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { MidContentAd, InlineAd, ContentBreakAd } from './ads'
import adConfig from '@/data/adConfig'

const ContentWithAds = ({ children, readingTime, className = '' }) => {
  const contentRef = useRef(null)
  const [adsInjected, setAdsInjected] = useState(false)

  useEffect(() => {
    if (!contentRef.current || adsInjected || !readingTime || readingTime.minutes < adConfig.settings.readingTime.minForMultipleAds) return

    const injectAds = () => {
      const content = contentRef.current
      const paragraphs = content.querySelectorAll('p')
      const headings = content.querySelectorAll('h2, h3')
      const allElements = [...paragraphs, ...headings].sort((a, b) => {
        return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
      })

      if (allElements.length < 4) return

      let adsPlaced = 0
      const maxAds = Math.min(adConfig.settings.readingTime.maxAdsPerPost, Math.floor(readingTime.minutes / 2))

      // Place first ad after 2nd paragraph/heading
      if (allElements[2] && adsPlaced < maxAds) {
        const adContainer = document.createElement('div')
        adContainer.className = 'injected-mid-content-ad'
        allElements[2].insertAdjacentElement('afterend', adContainer)
        
        ReactDOM.render(<MidContentAd />, adContainer)
        adsPlaced++
      }

      // Place additional ads at intervals
      const interval = Math.max(3, Math.floor(allElements.length / maxAds))
      for (let i = 2 + interval; i < allElements.length && adsPlaced < maxAds; i += interval) {
        if (allElements[i]) {
          const adContainer = document.createElement('div')
          adContainer.className = 'injected-inline-ad'
          allElements[i].insertAdjacentElement('afterend', adContainer)
          
          const AdComponent = adsPlaced === 1 ? InlineAd : ContentBreakAd
          ReactDOM.render(<AdComponent size="medium" />, adContainer)
          adsPlaced++
        }
      }

      setAdsInjected(true)
    }

    // Delay injection to ensure content is fully rendered
    const timer = setTimeout(injectAds, 500)
    return () => clearTimeout(timer)
  }, [readingTime, adsInjected])

  // Cleanup function to unmount ads
  useEffect(() => {
    return () => {
      const injectedAds = document.querySelectorAll('.injected-mid-content-ad, .injected-inline-ad')
      injectedAds.forEach(ad => {
        ReactDOM.unmountComponentAtNode(ad)
        ad.remove()
      })
    }
  }, [])

  return (
    <div ref={contentRef} className={className}>
      {children}
    </div>
  )
}

export default ContentWithAds