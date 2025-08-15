import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Contact() {
    const navigate = useNavigate()
    const[query, setQuery] = useState({
        userName:"",
        userEmail:"", 
        userQuery:""
    });

    function handleChange(e){
        setQuery({...query, [e.target.name]:e.target.value})
    }

async function handleForm(e){
    e.preventDefault()
    try {
        const response = await fetch("/api/userquery",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(query)
        })
        const record = await response.json()
        if(response.ok){
            toast.success(record.message)
            navigate("/")
        }else{
            toast.error(record.message)
        }       
    } catch (error) {
        toast.error(error)
    }
}
    return (
        <div className='max-w-3xl mx-auto mt-24 p-6 bg-white shadow-xl rounded-xl'>
            <h2 className='text-2xl font-bold text-green-500 mb-4 text-center'>Query Form</h2>
            <form action="" onSubmit={handleForm}>
                    <label className='block text-gray-700 font-medium mb-1' htmlFor="name">Your Name</label>
                    <input onChange={handleChange} value={query.userName} name='userName' className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500' id='name' type="text" placeholder='Jhon Doe' />
                    <label className='block text-gray-700 font-medium mb-1' htmlFor="email">Your Email</label>
                    <input onChange={handleChange} value={query.userEmail} name='userEmail' className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500' id='email' type="email" placeholder='abc@gmail.com' />
                    <label className='block text-gray-700 font-medium mb-1' htmlFor="Query">Query</label>
                    <textarea onChange={handleChange} value={query.userQuery} name='userQuery' className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500' placeholder='Add a Query' id="Query"></textarea>
                    <button className='w-full bg-green-500 py-2 text-white rounded mt-3 hover:bg-green-600'>Sumit Query</button>
                </form>
        </div>
    )
}

export default Contact
