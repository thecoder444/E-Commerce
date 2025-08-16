import React, { useEffect, useState } from 'react'
import Slidebar from './Slidebar'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { API_URL } from "../config";

function AdminQuery() {
const[query, setQuery] = useState([])

    async function AllQuery() {
        try {
            const response = await fetch(`${API_URL}/api/userallquery`)
            const record = await response.json();
            if(response.ok){
            console.log(record)
            setQuery(record.data);
        }else{
            toast.error(record.message)
        }
    } catch (error) {
            toast.error(error)
        }
    }
    useEffect(()=>{
        AllQuery()
    },[])

    async function handleDelete(id){
        try {
            const response = await fetch(`${API_URL}/api/deletequery/${id}`,{
                method:"DELETE",
            })
            const result = await response.json();
            if(response.ok){
                toast.success(result.message)
                AllQuery();
            }
            else{
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div className='flex mt-16'>
            <Slidebar/>
            <div className='flex-1 p-10 bg-gray-50 min-h-screen'>
                <h1 className='text-3xl font-bold mb-6 text-gray-800'>Query Management📊</h1>

        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            S.No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            UserName
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Query
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action-1
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action-2
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {query.map((value,index)=>(
                        <tr key={value._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {index + 1}
                        </th>
                        <td className="px-6 py-4">
                            {value.Name}
                        </td>
                        <td className="px-6 py-4">
                            {value.Query}
                        </td>
                        <td className="px-6 py-4">
                            {value.Email}
                        </td>
                        <td className="px-6 py-4">
                            <button className='text-xs bg-green-100 text-green-700 px-2 py-1 rounded'>{value.QueryStatus}</button>
                        </td>
                        <td className="px-6 py-4">
                            <Link to={`/admin/query-reply/${value._id}`}>
                                <button className='text-xs bg-green-600 text-white px-3 py-1 rounded'>Reply</button>
                            </Link>                           
                        </td>
                        <td className="px-6 py-4">
                            <button onClick={()=>{handleDelete(value._id)}} className='text-xs bg-red-500 text-white px-3 py-1 rounded'>Delete</button>
                        </td>
                    </tr>
                    ))}
                
                </tbody>
            </table>
        </div>


            </div>
           
        </div>
    )
}

export default AdminQuery
