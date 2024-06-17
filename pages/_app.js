import "@/styles/globals.css";
// import Navbar from "../components/Navbar"
// import Footer from "../components/Footer"
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
      {/* <main className="flex flex-col items-center justify-between">
        <div className="relative w-full">
          <div className="absolute -z-10 w-full">
          <Image src="/vit_bg.png" alt="Background Img" layout="fill" objectFit="cover" />
          </div>
        </div>
      </main> */}
    <Component {...pageProps} />
    </>
  )
}
