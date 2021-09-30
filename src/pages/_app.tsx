/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Error from 'next/error'
import { AppProps } from 'next/app'
import '../../styles/globals.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  if (pageProps.error)
    return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />
  return <Component {...pageProps} />
}

export default MyApp
