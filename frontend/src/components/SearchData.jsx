import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa';

function SearchData({onClose}) {
    const[query, setQuery] = useState("")
    const [results, setResults] = useState([])
    useEffect(()=>{
        const delayDebounce = setTimeout(() => {
            if(query.trim()){
                fetch(`https://e-commerce-err0.onrender.com/api/search?q=${query}`)
                .then((res)=>{
                    return res.json();
                }).then((result)=>{
                    setResults(result.data)
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }, 600);
        return ()=> clearTimeout(delayDebounce)
    },[query])
    return (
        <div className='fixed inset-0 bg-white z-[999] p-4 overscroll-y-auto'>
            <div className='flex justify-between items-center mb-4'>
                <input value={query} onChange={(e)=>{setQuery(e.target.value)}} type="text" autoFocus placeholder='Search Here...' className='flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-purple-500' />
            <button onClick={()=>{onClose(false)}} className='ml-3 text-gray-600 hover:text-red-600 text-xl'><FaTimes/></button>
            </div>
            {/* Search Result */}
            <div className='mt-4 space-y-4'>
                {results.length>0 ? results.map((item)=>(
                    <div key={item._id} className='border p-3 rounded-lg shadow-sm flex justify-between items-center'>
                        <div>
                            <img src={item.productImage} alt="Product image" className='w-full h-32 object-cover rounded' />
                            <h2 className='font-semibold'>{item.productName}</h2>
                            <p className='text-sm text-gray-500'>{item.
                            productCategory}</p>
                        </div>
                    </div>
                )): (<p className='text-center text-red-700'>No Results Found</p>)}
            </div>
        </div>
    )
}

export default SearchData;
