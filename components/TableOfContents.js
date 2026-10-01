import { useEffect, useState } from 'react'

export default function TableOfContents({ headings = [] }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const update = () => {
      let current = ''
      headings.forEach((heading) => {
        const node = document.getElementById(heading.id)
        if (node && node.getBoundingClientRect().top <= 120) current = heading.id
      })
      setActiveId(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [headings])

  if (!headings.length) return null

  return (
    <aside className="toc-side">
      <nav className="toc" aria-label="Contents">
        <p>Contents</p>
        <ol>
          {headings.map((heading) => (
            <li key={heading.id} className={heading.depth === 3 ? 'toc-h3' : undefined}>
              <a
                href={`#${heading.id}`}
                aria-current={activeId === heading.id ? 'true' : undefined}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  )
}
