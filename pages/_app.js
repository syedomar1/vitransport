import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import "@/styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import LoadingBar from 'react-top-loading-bar';
import { DataProvider } from '../context/DataContext'; // Import DataProvider

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setProgress(40);
    const handleComplete = () => setProgress(100);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <DataProvider> {/* Wrap your app with DataProvider */}
      <>
        <LoadingBar
          color='#e74c3c'
          progress={progress}
          waitingTime={400}
          onLoaderFinished={() => setProgress(0)}
        />
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </>
    </DataProvider>
  );
}