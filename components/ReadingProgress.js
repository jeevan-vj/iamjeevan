import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const article = document.querySelector('article')
    if (!article) return undefined

    const update = () => {
      const total = article.offsetHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-article.getBoundingClientRect().top, 0), Math.max(total, 0))
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      className="read-progress"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <span style={{ width: `${progress}%` }} />
    </div>
  )
}
