import Link from '@/components/Link'
import { PageSeo } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function FourZeroFour() {
  return (
    <>
      <PageSeo title={`Page not found · ${siteMetadata.title}`} description="That address does not match a page on this site." />
    <div className="page-intro">
      <h1 className="page-title">Page not found</h1>
      <p className="lede">That address does not match a page on this site.</p>
      <p className="more">
        <Link className="text-link" href="/">
          Back to the homepage
        </Link>
      </p>
    </div>
    </>
  )
}
