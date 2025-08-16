import { useNavigate, useParams } from 'react-router-dom'
import Slidebar from './Slidebar'
import { useEffect, useState } from 'react';
import toast from "react-hot-toast"
import { API_URL } from "../config";

function QueryReply() {
    const {id} = useParams();
    const [query, setQuery] = useState({to:"", sub:"", body:""})
    const navigate = useNavigate()

    async function queryData() {
        try {
            const response = await fetch(`${API_URL}/api/querysingledata/${id}`)
            const result = await response.json();

            if(response.ok){
                console.log(result)
                setQuery({to:result.data.Email})
            }else{
                console.log(result.message)               
            }

        } catch (error) {
            console.log(error)
        }

    }
    useEffect(()=>{
        queryData()
    },[id])

    function handleChange(e){
        setQuery({...query, [e.target.name]:e.target.value})
    }
    
    async function handleForm(e){
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/mailreply/${id}`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(query)
            })
            const record = await response.json();
            
            if(response.ok){
                toast.success(record.message)
                navigate("/admin/admin-query")
            }else{
                toast.error(record.message)
            }

        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div className='flex mt-16'>
            <Slidebar/>
            <div className='flex-1 p-10 bg-gray-50 min-h-screen'>
                <h1 className='text-3xl font-bold mb-6 text-gray-800'>Reply Query</h1>
                 
                <form action="" onSubmit={handleForm} className='bg-white shadow-md rounded-xl p-6 max-w-3xl mx-auto space-y-6'>
                    <label className='block text-gray-700 font-medium mb-1' htmlFor="product">To</label>
                    <input  name='to' className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500' value={query.to} id='product' type="text" placeholder='Mail to' />
                    <label className='block text-gray-700 font-medium mb-1' htmlFor="from">From</label>
                    <input value={"admin@gmail.com"} name='productName' className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500' id='from' type="text" placeholder='Mail from' />
                    <label className='block text-gray-700 font-medium mb-1' htmlFor="subject">Subject</label>
                    <input onChange={handleChange} value={query.sub} name='sub' className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500' id='subject' type="text" placeholder='Subject...' />
                    <label className='block text-gray-700 font-medium mb-1' htmlFor="body">Body</label>
                    <textarea name="body" onChange={handleChange} value={query.body} id="body" className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500' ></textarea>
                   
                    <div className='text-right'>
                        <button className='bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-800 transition'>Reply</button>
                    </div>
                </form>

            </div>
           
        </div>
    )
}

export default QueryReply
