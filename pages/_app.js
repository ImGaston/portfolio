import '../styles/styles.css';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Gastón Corbalán</title>
                <link rel="icon" href="/favicon.png"></link>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
