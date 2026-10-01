import { useRouter } from 'next/router'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'

const isCurrent = (href, path) => {
  if (href.startsWith('/#')) return false
  if (href === '/blog') return path.startsWith('/blog') || path.startsWith('/tags')
  return path === href || path.startsWith(`${href}/`)
}

export default function LayoutWrapper({ children }) {
  const { asPath } = useRouter()
  const path = asPath.split('?')[0].split('#')[0]
  const year = 2026

  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <div className="shell">
        <header className="site-header">
          <div className="header-bar">
            <Link href="/" className="brand">
              Jeevan Wijerathna
            </Link>
            <nav aria-label="Primary" className="nav">
              {headerNavLinks.map((link) => {
                const current = isCurrent(link.href, path)
                return (
                  <Link
                    key={link.title}
                    href={link.href}
                    aria-current={current ? 'page' : undefined}
                  >
                    {link.title}
                  </Link>
                )
              })}
            </nav>
          </div>
        </header>
        <main id="content" tabIndex={-1}>
          {children}
        </main>
        <footer className="site-footer">
          <div className="footer-bar">
            <p>© {year} {siteMetadata.author}</p>
            <nav aria-label="Social" className="footer-links">
              <Link href={siteMetadata.github}>GitHub</Link>
              <Link href={siteMetadata.linkedin}>LinkedIn</Link>
              <Link href={siteMetadata.twitter}>X</Link>
              <a href="/feed.xml">RSS</a>
            </nav>
          </div>
        </footer>
      </div>
    </>
  )
}
