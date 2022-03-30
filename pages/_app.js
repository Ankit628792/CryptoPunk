import '../styles/globals.css'
import 'antd/dist/antd.dark.css';
import Layout from '../components/Layout'
import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '../app/store';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Head>
          <link rel="shortcut icon" href="/assets/icons/icon.png" />
          <title>Cryptopunk</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
