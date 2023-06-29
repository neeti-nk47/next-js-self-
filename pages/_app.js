import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
