import { useRef, useEffect, useState } from 'react'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import ContentWithAds from '@/components/ContentWithAds'
import { BlogSeo } from '@/components/SEO'
import { BannerAd, RectangleAd, MobileAd, SidebarAd, MidContentAd, InlineAd, ContentBreakAd } from '@/components/ads'
import adConfig from '@/data/adConfig'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import Comments from '@/components/comments'

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { date, title, readingTime } = frontMatter
  const contentRef = useRef(null)
  const [showMidContentAds, setShowMidContentAds] = useState(false)

  useEffect(() => {
    // Show mid-content ads for longer posts based on config
    if (readingTime && readingTime.minutes >= adConfig.settings.readingTime.minForMultipleAds) {
      setShowMidContentAds(true)
    }
  }, [readingTime])

  return (
    <SectionContainer>
      <BlogSeo url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`} {...frontMatter} />
      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Main content */}
        <article className="flex-1 min-w-0">
          <div>
            <header>
              <div className="pb-10 space-y-1 text-center border-b border-gray-200 dark:border-gray-700">
                <dl>
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </div>
                </dl>
                <div>
                  <PageTitle>{title}</PageTitle>
                </div>
              </div>
            </header>
            
            {/* Mobile ad after title */}
            <MobileAd />
            
            <div
              className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 "
              style={{ gridTemplateRows: 'auto 1fr' }}
            >
              <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
                <ContentWithAds 
                  readingTime={readingTime}
                  className="pt-10 pb-8 prose dark:prose-dark max-w-none"
                >
                  {children}
                </ContentWithAds>
                
                {/* Mid-content ad for shorter posts */}
                {readingTime && readingTime.minutes < adConfig.settings.readingTime.minForMultipleAds && (
                  <MidContentAd />
                )}
              </div>
              
              {/* Banner ad before navigation */}
              <BannerAd />
              
              {/* <Comments frontMatter={frontMatter} /> */}
              <footer>
                <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                  {prev && (
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/blog/${prev.slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        &larr; {prev.title}
                      </Link>
                    </div>
                  )}
                  {next && (
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/blog/${next.slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {next.title} &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              </footer>
            </div>
          </div>
        </article>
        
        {/* Sidebar with ads */}
        <aside className="lg:w-80 lg:flex-shrink-0">
          <SidebarAd />
        </aside>
      </div>
    </SectionContainer>
  )
}
