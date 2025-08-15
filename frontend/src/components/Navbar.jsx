import React, { useState } from 'react'
import Logo from "../assets/Quickzy.png"
import { Link, useNavigate } from 'react-router-dom'
import { FaRegUserCircle, FaShoppingCart, FaSearch, FaTimes, FaHome} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdContactSupport } from "react-icons/md";
import SearchData from './SearchData';
import {toast} from "react-hot-toast"
import {IoMdLogOut} from "react-icons/io"

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => setIsOpen(!isOpen)
    const [showSearch, setShowSearch] = useState(false)
    const navigate = useNavigate();

    let token = localStorage.getItem("token")
    const handleLogout = () =>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logout Success")
        navigate("/")
    }

    return (
        <nav className='bg-gradient-to-r from-green-100 via-white to-white shadow-md fixed top-0 left-0 right-0 z-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    {/* Logo */}
                    <div>
                        <img src={Logo} className='h-16 w-auto' alt="quickzy Img" />
                    </div>

                    {/* Search Bar */}
                    <div className='flex-1 mx-4'>
                        <div className='relative'>
                            <input readOnly onFocus={()=>{setShowSearch(true)}} type="search" placeholder='Search for fruits, snacks and more' className='w-full bg-zinc-200 rounded-full ps-4 pe-10 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400' />
                            <FaSearch className='absolute right-3 top-1/3 text-gray-700'/>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className='hidden md:flex space-x-6 items-center'>
                      
                        <Link className='text-red-500 hover:text-green-900 text-xl' to="/admin/dashboard">Admin Dashboard</Link>
                        <Link to="/"><FaHome className='hover:text-green-600 text-xl' /></Link>
                        <Link to={"/cart"}><FaShoppingCart className='hover:text-green-600 text-xl' /></Link>
                        <Link to="/contact"><MdContactSupport
                        className='hover:text-green-600 text-xl' /></Link>
                        {
                            !token ?  <Link to="/login"><FaRegUserCircle className='hover:text-green-600 text-xl' /></Link> : (<IoMdLogOut className='text-2xl font-extrabold text-red-500 hover:cursor-pointer hover:text-red-800' onClick={handleLogout}/>)
                        }
                       
                    </div>

                    {/* Hamburger / Close Button */}
                    <div className='md:hidden relative'>
                        <button onClick={toggleMenu} className='text-2xl focus:outline-none'>
                            {isOpen ? <FaTimes /> : <GiHamburgerMenu />}
                        </button>

                        {/* Mobile Menu */}
                        {isOpen && (
                            <div className='absolute right-0 mt-2 w-22 bg-white px-4 py-4 rounded-md shadow-md space-y-2'>
                                <Link className='block  text-gray-700 hover:text-red-600' to="#">Admin</Link>
                                <Link className='block text-gray-700 hover:text-green-600' to={"/cart"}>Cart</Link>
                                <Link className='block text-gray-700 hover:text-green-600' to="/contact">Contact</Link>
                                {!token ? (<Link className='block text-gray-700 hover:text-green-600' to="/login">User</Link>) : (<button onClick={handleLogout} className='block text-red-500 font-semibold'>Logout</button>)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showSearch && <SearchData onClose={setShowSearch}/>}
        </nav>
    )
}

export default Navbar;