import { SiteHeader } from "@/components/site-header"
import "../styles/globals.css"

import { Web3Provider } from "providers/Web3"

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <SiteHeader />
      <Component {...pageProps} />
    </Web3Provider>
  )
}

export default MyApp
