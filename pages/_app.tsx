import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <Head>
        <title>Netflix Clone</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </Fragment>
  );
};

export default MyApp;
