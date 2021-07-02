/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Error from 'next/error'
import { AppProps } from 'next/app'
import '../../styles/globals.css'

import { useRouter } from 'next/router'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter()
  useEffect(() => storePathValues, [router.asPath])
  function storePathValues() {
    const storage = globalThis?.sessionStorage
    if (!storage) return

    const prevPath = storage.getItem('currentPath')
    storage.setItem('prevPath', prevPath)
    storage.setItem('currentPath', globalThis.location.pathname)
  }
  if (pageProps.error)
    return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />
  return <Component {...pageProps} />
}

export default MyApp
