"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <nav className="bg-gray-950 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-yellow-400">Zoom</span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button 
              onClick={toggleNavbar} 
              type="button" 
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
              aria-controls="navbar-sticky" 
              aria-expanded={isOpen ? "true" : "false"}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className={`items-center justify-between ${isOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">

              <li>
                <Link href="/slots" className="block py-2 px-3 text-yellow-400 rounded hover:bg-gray-950 ">Slots</Link>
              </li>
              <li>
              <Link href="/interviews" className="block py-2 px-3 text-yellow-400 rounded hover:bg-gray-950 ">Interviews</Link>
            </li>
              <li>
                <Link href="/calendar" className="block py-2 px-3 text-yellow-400 rounded hover:bg-gray-950">Calendar</Link>
              </li>
              <li>
              <Link href="/meeting" className="block py-2 px-3 text-yellow-400 rounded hover:bg-gray-950">Meeting</Link>
            </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar;
