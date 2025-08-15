import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';

function Register() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(true)
    const [form, setForm] = useState({fname:"", email:"", pass:""})

    async function handleForm(e){
        e.preventDefault();
        try {
            const response = await fetch("/api/regdata",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(form)
            })
            const result = await response.json();
            console.log(result)
            if(response.ok){
                toast.success(result.message)
                navigate("/")
            }else{
                toast.error(result.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    function handleChange(e){
        setForm({...form,[e.target.name]:e.target.value})
    }
    return (
        <div className='fixed inset-0  bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50'>
            <div className='bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative mx-4'>
                <button onClick={()=>{navigate("/")}} className='absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl'><FaTimes /></button>
                <h2 className='text-2xl font-bold mb-4 text-green-600 text-center'>Create Your Account🚀</h2>
                <form action="" onSubmit={handleForm}>
                    <label htmlFor="name" className='block text-sm text-gray-700 mb-2'>Full Name</label>
                    <input onChange={handleChange} value={form.fname} type="text" name="fname" id="name" placeholder='abc' className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500' />
                    <label htmlFor="email" className='block text-sm text-gray-700 mb-2'>Email</label>
                    <input onChange={handleChange} value={form.email} type="email" name="email" id="email" placeholder='you@example.com' className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500' />
                    <label htmlFor="pass" className='block text-sm text-gray-700 mb-2'>Password</label>
                    <div className=' relative'>
                    <input onChange={handleChange} value={form.pass} type={showPassword ? "password":"text"} name="pass" id="pass" placeholder='*****' className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500' />
                    <button type='button' className='absolute top-4 right-3 text-gray-500 hover:text-green-700' onClick={(()=>{setShowPassword(!showPassword)})}>{showPassword ? <FaEyeSlash/> : <FaEye/>}</button>
                    </div>
                    <button type='submit' className='w-full bg-green-600 hover:bg-green-800 text-white rounded font-semibold py-2 mt-6'>Register</button>
                </form>
                <p className='text-sm text-center text-gray-600 mt-5'>Already have an account <Link to="/login" className='text-green-600 hover:underline'>Login</Link></p>
            </div>


        </div>
    )
}

export default Register
