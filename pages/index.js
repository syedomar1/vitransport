// pages/index.js
import Image from "next/image";
import { Inter } from "next/font/google";
import { useData } from '../context/DataContext'; // Import the useData hook

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, busRoutes} = useData(); // Use the useData hook to access context values

  return (
    <div className="relative w-full h-screen overflow-hidden min-h-screen">
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
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full w-full p-4 overflow-hidden">
        <div className="flex flex-col text-white mb-8 md:mr-32">
          <div className="text-2xl md:text-6xl font-bold text-center md:text-left">
            <p>TRANSPORT</p>
            <p className="mt-2 md:ml-8">HELPLINE</p>
            <hr className="mt-4 border-2 w-20 md:w-40" />
            <p className="mt-4 text-lg md:text-2xl">+91 90035 55258</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full md:w-3/4 bg-black bg-opacity-50 p-4 rounded-lg text-white max-h-full overflow-y-auto mb-12">
            <span className="block text-2xl md:text-4xl font-bold mb-4 text-center md:text-left">UPDATES</span>
            <ul className="list-disc pl-5 space-y-2">
              <li>Buses will leave at 4:00pm today due to bad weather</li>
              {/* {busRoutes && busRoutes.length > 0 && (
                <li>Fetched Bus Routes:</li>
              )}
              {busRoutes && busRoutes.map((route, index) => (
                <li key={index}>{route.routeNumber}</li>
              ))} */}
            </ul>
            {/* <div>
              {data && (
                <div>
                  <h2 className="text-2xl mt-4">Bus Data:</h2>
                  <pre className="bg-gray-900 p-2 rounded">{JSON.stringify(data, null, 2)}</pre>
                </div>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}