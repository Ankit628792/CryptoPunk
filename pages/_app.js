import '../styles/globals.css'
import 'antd/dist/antd.dark.css';
import Layout from '../components/Layout'
import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '../app/store';
import { MoralisProvider } from 'react-moralis';
import Moralis from 'moralis'

import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'

const progress = new ProgressBar({
  size: 4,
  color: '#0bbca9',
  className: "z-50 shadow",
  delay: 100
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

function MyApp({ Component, pageProps }) {
  Moralis.start({ serverUrl: 'https://qii75ee33rdl.usemoralis.com:2053/server', appId: 'h6RfITCMzcGOX4qdiZp7cvs9xIqEVh2bh9pgRoPh' });
  return (
    <MoralisProvider
      appId={process.env.appId}
      serverUrl={process.env.serverUrl}
    >
      <Provider store={store}>
        <Layout>
          <Head>
            <link rel="shortcut icon" href="/assets/icons/icon.png" />
            <title>Cryptopunk</title>
          </Head>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </MoralisProvider>
  )
}

export default MyApp
