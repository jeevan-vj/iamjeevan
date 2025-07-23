import { useEffect, useState } from 'react'

const useContentAds = (contentRef, options = {}) => {
  const {
    minParagraphs = 4,
    adInterval = 3,
    maxAds = 3,
    enabled = true
  } = options

  const [adPositions, setAdPositions] = useState([])

  useEffect(() => {
    if (!enabled || !contentRef.current) return

    const content = contentRef.current
    const paragraphs = content.querySelectorAll('p, h2, h3')
    
    if (paragraphs.length < minParagraphs) return

    const positions = []
    let adCount = 0

    // Insert first ad after 2nd paragraph
    if (paragraphs.length > 2 && adCount < maxAds) {
      positions.push({
        afterElement: paragraphs[1],
        type: 'mid-content',
        id: `ad-${adCount}`
      })
      adCount++
    }

    // Insert subsequent ads at intervals
    for (let i = adInterval + 2; i < paragraphs.length && adCount < maxAds; i += adInterval) {
      if (paragraphs[i]) {
        positions.push({
          afterElement: paragraphs[i],
          type: adCount === 1 ? 'inline' : 'content-break',
          id: `ad-${adCount}`,
          size: adCount === 1 ? 'medium' : 'small'
        })
        adCount++
      }
    }

    setAdPositions(positions)
  }, [contentRef, minParagraphs, adInterval, maxAds, enabled])

  const injectAds = () => {
    adPositions.forEach((position, index) => {
      const existingAd = document.getElementById(position.id)
      if (existingAd) return

      const adElement = document.createElement('div')
      adElement.id = position.id
      adElement.className = 'injected-ad'
      adElement.setAttribute('data-ad-type', position.type)
      adElement.setAttribute('data-ad-size', position.size || 'medium')
      
      position.afterElement.insertAdjacentElement('afterend', adElement)
    })
  }

  const removeAds = () => {
    document.querySelectorAll('.injected-ad').forEach(ad => ad.remove())
  }

  return {
    adPositions,
    injectAds,
    removeAds
  }
}

export default useContentAds