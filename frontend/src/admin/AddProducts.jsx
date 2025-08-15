import React, { useState } from 'react'
import Slidebar from './Slidebar'
import { useNavigate,} from 'react-router-dom'
import toast from 'react-hot-toast'

function AddProducts() {

    const Navigate = useNavigate()
    const [product,setProduct] = useState({Pname:"", Price:"", Cat:""})
    const [pimage, setPimage] = useState()
    async function handleForm(e){
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("Pname" , product.Pname);
        formdata.append("Price", product.Price);
        formdata.append("Cat", product.Cat);
        formdata.append("image", pimage)
        // console.log(formdata)
        
        try {
            const response = await fetch("/api/addadminproduct",{
                method: "POST",
                body : formdata
            });
            const result  = await response.json();
            if(response.ok){
                toast.success(result.message)
                Navigate("/admin/products")
            }else{
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error)
        }
    }
    
    function handleChange(e){
        setProduct({...product, [e.target.name]:e.target.value})
    }
    return (
        <div className='flex mt-16 w-2/3'>
            <Slidebar/>
            <div className='flex-1 p-10 bg-gray-50 min-h-screen'>
                <h1 className='text-3xl font-bold mb-6 text-gray-800'>Add Products 💹</h1>
                <button className='bg-gray-200 hover:bg-gray-400 px-4 py-2 rounded' onClick={()=>{Navigate("/admin/products")}}>Back</button>
                <form action="" encType='multipart/form-data' onSubmit={handleForm} className='bg-white shadow-md rounded-xl p-6 max-w-3xl mx-auto space-y-6'>
                    <label className='block text-gray-700 font-medium mb-1' htmlFor="product">Product Name</label>
                    <input onChange={handleChange}  required className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500' id='product' value={product.Pname} type="text" placeholder='e.g Fresh Fruits' name='Pname' />
                    <label className='block text-gray-700 font-medium mb-1' htmlFor="price">Price ₹</label>
                    <input onChange={handleChange} required className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500' id='price' value={product.Price} type="text" placeholder='e.g 999' name='Price' />
                    <label className='block text-gray-700 font-medium mb-1' htmlFor="select">Categories</label>
                    <select name="Cat" required onChange={handleChange} value={product.Cat} id="select" className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500'>
                        <option value="">--Select--</option>    
                        <option value="Cafe">Cafe</option>    
                        <option value="Home">Home</option>    
                        <option value="Toys">Toys</option>    
                        <option value="Fresh">Fresh</option>    
                        <option value="Electronics">Electronics</option>    
                        <option value="Mobile">Mobile</option>    
                        <option value="Beauty">Beauty</option>    
                    </select> 
                    <label className='block text-gray-700 font-medium mb-1' htmlFor="image">Product Image</label>
                    <input onChange={(e)=>{setPimage(e.target.files[0])}} type="file" name="" id="image" className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none' />
                    <div className='text-right'>
                        <button type='submit' className='bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-800 transition'>Add Product</button>
                    </div>
                </form>
            </div>
                <h1></h1>       
        </div>
    )
}
export default AddProducts;
