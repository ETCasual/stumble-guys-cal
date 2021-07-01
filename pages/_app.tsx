import Error from 'next/error'
import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  if (pageProps.error)
    return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />
  return <Component {...pageProps} />
}

export default MyApp