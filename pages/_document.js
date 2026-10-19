import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta
                        name="description"
                        content="Revenue Manager based in Madrid."
                    />

                    <meta
                        property="og:url"
                        content="https://www.gastoncorbalan.com/"
                    />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Gastón Corbalán" />
                    <meta
                        property="og:description"
                        content="Revenue Manager based in Madrid."
                    />
                    <meta property="og:image" content="https://www.gastoncorbalan.com/og.png" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta
                        property="twitter:domain"
                        content="gastoncorbalan.com"
                    />
                    <meta
                        property="twitter:url"
                        content="https://www.gastoncorbalan.com/"
                    />
                    <meta name="twitter:title" content="Gastón Corbalán" />
                    <meta
                        name="twitter:description"
                        content="Revenue Manager based in Madrid."
                    />
                    <meta name="twitter:image" content="https://www.gastoncorbalan.com/og.png" />
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
