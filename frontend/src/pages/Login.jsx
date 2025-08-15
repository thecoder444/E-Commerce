import React, { useState } from 'react'
import { FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true)
    const [login, setLogin] = useState({loginEmail:"", loginPass:""})
    async function handleForm(e){
        e.preventDefault();
        try {
            const response = await fetch("/api/loginuser",{
                method:"POST",
                headers:{"Content-Type":"Application/json"},
                body: JSON.stringify(login)
            })
            const result  = await response.json();
            console.log(result)
            if(response.ok){
                if(result.data && result.data.userEmail === "admin@gmail.com"){
                    navigate("/admin/dashboard")
                    toast.success("Hello admin")
                }else{
                    toast.success(result.message)
                    navigate("/")
                    localStorage.setItem("token", result.token )
                    localStorage.setItem("user", result.data._id)
            }
            }else(
                toast.error(result.message)
            )
        } catch (error) {
            console.log(error)
        }
    }
    function handleChange(e){
        setLogin({...login,[e.target.name]:e.target.value})
    }
    return (
        <div className='fixed inset-0  bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50'>
            <div className='bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative mx-4'>
                <button onClick={()=>{navigate("/")}} className='absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl'><FaTimes /></button>
                <h2 className='text-2xl font-bold mb-4 text-green-600 text-center'>Login to continue..😍</h2>
                <form action="" onSubmit={handleForm}>
                    <label htmlFor="email" className='block text-sm text-gray-700 mb-2'>Email</label>
                    <input onChange={handleChange} type="email" value={login.loginEmail} name="loginEmail" id="email" placeholder='you@example.com' className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500' />
                    <label htmlFor="pass" className='block text-sm text-gray-700 mb-2'>Password</label>
                    <div className=' relative'>
                    <input onChange={handleChange} type={showPassword ? "password":"text"} value={login.loginPass} name="loginPass" id="pass" placeholder='*****' className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500' />
                    <button type='button' className='absolute top-4 right-3 text-gray-500 hover:text-green-700' onClick={(()=>{setShowPassword(!showPassword)})}>{showPassword ? <FaEyeSlash/> : <FaEye/>}</button>
                    </div>
                    <button type='submit' className='w-full bg-green-600 hover:bg-green-800 text-white rounded font-semibold py-2 mt-6'>Submit</button>
                </form>
                <p className='text-sm text-center text-gray-600 mt-5'>Don't have an account <Link to="/reg" className='text-green-600 hover:underline'>Register</Link></p>
            </div>


        </div>
    )
}

export default Login
