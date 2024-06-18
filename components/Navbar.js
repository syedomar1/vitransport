import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { FiHome, FiCalendar, FiInfo, FiMapPin } from "react-icons/fi";


const Navbar = () => {
  return (
    <>        
    <div className="flex flex-col md:flex-row md:justify-between justify-center items-center py-2 px-4 shadow-md sticky top-0 bg-black bg-opacity-80 text-white z-10">
      <div className="logo m-auto md:mx-5 w-full max-w-[80px]">
        <Link href={"/"}>
          <Image src="/vit_logo.png" alt="Logo" height={30} width={80} className="w-[120px] h-[50px]"/>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-8 mr-6 font-bold md:text-md justify-end">
          <Link href={"/"}>
            <li className="hover:text-blue-700 flex items-center space-x-2 transition-colors duration-200">
            <FiHome />
            <span>Home</span>
            </li>
          </Link>
          <Link href={"/schedule"}>
            <li className="hover:text-blue-700 flex items-center space-x-2 transition-colors duration-200">
            <FiCalendar />
            <span>Schedule</span>
            </li>
          </Link>
          <Link href={"/businfo"}>
            <li className="hover:text-blue-700 flex items-center space-x-2 transition-colors duration-200">
            <FiInfo />
            <span>Bus Info</span>
            </li>
          </Link>
          <Link href={"/track"}>
            <li className="hover:text-blue-700 flex items-center space-x-2 transition-colors duration-200">
            <FiMapPin />
            <span>Track</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
    </>
  );
};

export default Navbar;
