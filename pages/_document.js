import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta
                        name="description"
                        content="Gastón Corbalán works and resume"
                    />

                    <meta
                        property="og:url"
                        content="https://www.gastoncorbalan.com/"
                    />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Gastón Corbalán" />
                    <meta
                        property="og:description"
                        content="Gastón Corbalán Portfolio"
                    />
                    <meta property="og:image" content="/opengraph-cover.png" />

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
                        content="Gastón Corbalán Portfolio"
                    />
                    <meta name="twitter:image" content="/opengraph-cover.png" />
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Quattrocento:wght@400;700&family=Raleway:wght@300;400&display=swap"
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
