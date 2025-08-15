import React, { useEffect, useState } from 'react'
import Slidebar from './Slidebar'
import { useNavigate , useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

function EditProducts() {
    const Navigate = useNavigate()
    const [edit, setEdit] = useState({})

    const {id} = useParams();
    // console.log(id)
    async function editValueData(){
        try {
            const response = await fetch(`/api/editvaluedata/${id}`)
            const result = await response.json();
            console.log(result)
            setEdit(result.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        editValueData();
    },[])

    function handleChange(e){
        setEdit({...edit, [e.target.name]:e.target.value})
    }
    async function handleForm(e) {
        e.preventDefault()
        const formData = {
            Pname : edit.productName,
            Pprice : edit.productPrice,
            Cat : edit.productCategory,
            Pstatus : edit.productStatus
        }
       try {
        const response = await fetch(`/api/productupdate/${id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formData)
        })
        const result = await response.json();
        if(response.ok){
            toast.success(result.message)
            Navigate("/admin/products")
        }else(
            toast.error(toast.message)
        )
    } catch (error) {
        console.log(error)
       }
    }

    return (
        <div className='flex mt-16'>
            <Slidebar/>
            <div className='flex-1 p-10 bg-gray-50 min-h-screen'>
                <h1 className='text-3xl font-bold mb-6 text-gray-800'>Edit Your Product 💹</h1>
                <button className='bg-gray-200 hover:bg-gray-400 px-4 py-2 rounded' onClick={()=>{Navigate("/admin/products")}}>Back</button>
                <form action="" onSubmit={handleForm} className='bg-white shadow-md rounded-xl p-6 max-w-3xl mx-auto space-y-6'>
                    <label className='block text-gray-700 font-medium mb-1' htmlFor="product">Product Name</label>
                    <input onChange={handleChange} name='productName' value={edit.productName} className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500' id='product' type="text" placeholder='e.g Fresh Fruits' />
                    <label className='block text-gray-700 font-medium mb-1' htmlFor="price">Price ₹</label>
                    <input onChange={handleChange} name='productPrice' value={edit.productPrice} className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500' id='price' type="text" placeholder='e.g 999' />
                    <label className='block text-gray-700 font-medium mb-1' htmlFor="select">Categories</label>
                    <select onChange={handleChange} value={edit.productCategory} name="productCategory" id="select" className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500'>
                        <option value="">--Select--</option>    
                        <option value="cafe">Cafe</option>    
                        <option value="home">Home</option>    
                        <option value="toys">Toys</option>    
                        <option value="fresh">Fresh</option>    
                        <option value="electronics">Electronics</option>    
                        <option value="mobile">Mobile</option>    
                        <option value="beauty">Beauty</option>    
                    </select> 
                    <label className='block text-gray-700 font-medium mb-1' htmlFor="select">Stock</label>
                    <select onChange={handleChange} value={edit.productStatus} name="productStatus" id="select" className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500'>
                        <option value="">--Select--</option>    
                        <option value="in stock">In Stock</option>    
                        <option value="out of stock">Out Of Stock</option>                               
                    </select> 
                    <label className='block text-gray-700 font-medium mb-1' htmlFor="image">Product Image</label>
                    <input type="file" name="" id="image" className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none' />
                    <div className='text-right'>
                        <button className='bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-800 transition'>Save Changes</button>
                    </div>
                </form>
            </div>
                <h1></h1>       
        </div>
    )
    
}
export default EditProducts;
