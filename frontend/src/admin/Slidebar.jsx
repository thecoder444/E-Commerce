import React from 'react'
import { Link } from 'react-router-dom'

function Slidebar() {
    return (
        <div className='bg-gray-800 rounded  text-white w-1/4 sm:w-1/5 min-h-screen p-6 space-y-6'>
            <h2 className='text-2xl font-bold mb-8'>Admin Panel 👤</h2>
            <nav className='space-y-4'>
                <Link to="/admin/dashboard" className='block hover:text-green-600'>Dashboard</Link>
                <Link to="/admin/products" className='block hover:text-green-600'>Manage Products</Link>
                <Link to="/admin/admin-query" className='block hover:text-green-600'>Manage Querys</Link>
                <Link to="/" className='block text-red-600 hover:underline'>Exit to store</Link>
            </nav>
        </div>
    )
}

export default Slidebar
