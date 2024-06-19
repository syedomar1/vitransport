import "@/styles/globals.css";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingBar from 'react-top-loading-bar'


export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', ()=>{
      setProgress(40)
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100)
    })    
  }, [router.query])
  
  return(
    <>
    <LoadingBar
        color='#e74c3c'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      <Head>
        <meta name="viewport" content="width=device-width , initial-scale=1.0 , minimum-scale=1.0" />
      </Head>
      <Navbar/>
    <Component {...pageProps} />
    <Footer/>
    </>
  )
}
