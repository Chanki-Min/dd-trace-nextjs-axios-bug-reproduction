import '@/styles/globals.css'
import type { AppProps } from 'next/app'

if(typeof window === 'undefined' && process.env.MSW === 'true') {
  require('../src/msw')
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
