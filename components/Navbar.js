import React, { useState } from 'react';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';
import { CiMenuFries } from 'react-icons/ci';
import Image from 'next/image';

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
    <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: "1" }}>
      <div className='absolute w-screen h-16 flex justify-between z-50 text-white px-20 bg-gray-900 bg-opacity-80'>
        <div className='flex items-center flex-1'>
          <Link href='/' passHref>
            <Image src='/vit_logo.png' alt="VIT Logo" width={150} height={80} />
          </Link>
        </div>
        <div className='lg:flex md:flex lg:flex-1 justify-end font-normal hidden'>
          <div className='flex-10'>
            <ul className='font-sans text-xl flex gap-10 mr-16 text-[18px]'>
              <Link href='/' passHref>
                <li onClick={closeNavbar} className='hover:text-blue-300 transition cursor-pointer text-decoration-none'>Home</li>
              </Link>
              <Link href='/schedule' passHref>
                <li onClick={closeNavbar} className='hover:text-blue-300 transition cursor-pointer text-decoration-none'>Schedule</li>
              </Link>
              <Link href='/timings' passHref>
                <li onClick={closeNavbar} className='hover:text-blue-300 transition cursor-pointer text-decoration-none'>Timings</li>
              </Link>
              <Link href='/track' passHref>
                <li onClick={closeNavbar} className='hover:text-blue-300 transition cursor-pointer text-decoration-none'>Track</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="flex mt-5">
          <Link href='/login' passHref>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Login
            </button>
          </Link>
        </div>
        <div>
          {click && content}
        </div>
        <button className='block sm:hidden transition' onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
