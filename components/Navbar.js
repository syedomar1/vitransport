import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiHome, FiCalendar, FiInfo, FiMapPin, FaTimes} from "react-icons/fi";
import { CiMenuFries } from 'react-icons/ci';


const Navbar = () => {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeNavbar = () => setClick(false); // Function to close the navbar

  const content = (
    <div className='lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition'>
      <ul className='text-center text-xl p-20'>
        <Link href='/' passHref>
          <li onClick={closeNavbar} className='my-4 py-4 border-b border-slate-800 hover:bg-slate-880 hover:text-blue-300 hover:rounded cursor-pointer text-decoration-none'>Home</li>
        </Link>
        <Link href='/schedule' passHref>
          <li onClick={closeNavbar} className='my-4 py-4 border-b border-slate-800 hover:bg-slate-880 hover:text-blue-300 hover:rounded cursor-pointer text-decoration-none'>Schedule</li>
        </Link>
        <Link href='/timings' passHref>
          <li onClick={closeNavbar} className='my-4 py-4 border-b border-slate-800 hover:bg-slate-880 hover:text-blue-300 hover:rounded cursor-pointer text-decoration-none'>Timings</li>
        </Link>
        <Link href='/track' passHref>
          <li onClick={closeNavbar} className='my-4 py-4 border-b border-slate-800 hover:bg-slate-880 hover:text-blue-300 hover:rounded cursor-pointer text-decoration-none'>Track</li>
        </Link>
      </ul>
    </div>
  );

  return (
    <>        
    <div className="flex flex-col md:flex-row md:justify-between justify-center items-center py-2 px-4 shadow-md sticky top-0 bg-black bg-opacity-80 text-white z-20">
      <div className="logo m-auto md:mx-5 w-full max-w-[80px]">
        <Link href={"/"}>
          <Image src="/vit_logo.png" alt="Logo" height={30} width={80} className="w-[120px] h-[50px]"/>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 mr-6 font-bold md:text-md justify-end">
          <Link href={"/"}>
            <li onClick={closeNavbar} className="hover:text-blue-700 flex items-center space-x-2 transition-colors duration-200">
            <FiHome />
            <span>Home</span>
            </li>
          </Link>
          <Link href={"/schedule"}>
            <li onClick={closeNavbar} className="hover:text-blue-700 flex items-center space-x-2 transition-colors duration-200">
            <FiCalendar />
            <span>Schedule</span>
            </li>
          </Link>
          <Link href={"/businfo"}>
            <li onClick={closeNavbar} className="hover:text-blue-700 flex items-center space-x-2 transition-colors duration-200">
            <FiInfo />
            <span>Bus Info</span>
            </li>
          </Link>
          <Link href={"/track"}>
            <li onClick={closeNavbar} className="hover:text-blue-700 flex items-center space-x-2 transition-colors duration-200">
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
