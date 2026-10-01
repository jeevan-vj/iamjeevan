import '@/css/tailwind.css'
import { Geist, JetBrains_Mono } from 'next/font/google'
import Head from 'next/head'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-geist',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-mono',
})

export default function App({ Component, pageProps }) {
  return (
    <div className={`${geist.variable} ${mono.variable} font-root`}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Analytics />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </div>
  )
}
