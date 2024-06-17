import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/vit_bg.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="blur-sm"
          quality={100}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center text-white">
        <h1 className="text-4xl font-bold">VIT Transport</h1>
        <p className="mt-4 text-lg">This is a sample text.</p>
        <p className="mt-4 text-lg">Contact Helpdesk.</p>
      </div>
    </div>
  );
}
