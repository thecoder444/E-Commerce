import React from 'react'
import Logo from "../assets/Quickzy.png"
import { Link } from 'react-router-dom'
import { FaFacebook,FaWhatsappSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
function Footer() {
    return (
        <footer className='bg-gradient-to-r from-green-100 via-white to-white mt-16 border-t border-gray-300'>
            <div className='max-w-7xl ms-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-16 md:gap-32 text-gray-700'>
                <div>
                <img src={Logo} alt="photo" className='h-24 mb-3'/>
                <p>Enjoy the best deals and lightning-fast delivery on everything you love.</p>
                </div>
                <div>
                    <h3 className='text-lg font-semibold mb-3'>Quick Link</h3>
                    <ul className='space-y-2 text-sm'>
                        <li>
                            <Link to="/" className='hover:text-green-500'>Home</Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-green-500'>About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact" className='hover:text-green-500'>Contact</Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-green-500'>T&C</Link>
                        </li>
                    </ul>
                </div>
                <div>
                <h3 className='text-lg font-semibold mb-3'>Follow Us</h3>
                    <div className='flex space-x-2 text-xl'>
                            <Link to="#" className='hover:text-blue-600'><FaFacebook /></Link>
                            <Link to="https://www.instagram.com/ujjwa1_mishra/" className='hover:text-pink-500'><FaInstagramSquare /></Link>
                            <Link to="#" className='hover:text-blue-500'><FaSquareXTwitter /></Link>
                            <Link to="#" className='hover:text-green-600'>< FaWhatsappSquare /></Link>
                    </div>
                </div>
            </div>
            <div className='text-center text-sm text-gray-500 py-4 border-t border-gray-300'>
            ©{new Date().getFullYear()} All Rights Are Reserved By Quickzy
            </div>
        </footer>
    )
}

export default Footer;
