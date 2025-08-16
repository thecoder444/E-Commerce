import React from 'react'
import { FaShoppingBag, FaCoffee, FaLaptopCode, FaMobile, FaCouch, FaPuzzlePiece, FaAppleAlt } from 'react-icons/fa'
import { GiFingernail } from "react-icons/gi";
function Category({onSelectCategory}) {

    const categories = [
        {name:"All", icon:<FaShoppingBag/>},
        {name:"Cafe", icon:<FaCoffee/>},
        {name:"Home", icon:<FaCouch/>},
        {name:"Toys", icon:<FaPuzzlePiece />},
        {name:"Fresh", icon:<FaAppleAlt />},
        {name:"Electronics", icon:<FaLaptopCode/>},
        {name:"Mobile", icon:<FaMobile/>},
        {name:"Beauty", icon:<GiFingernail/>},
    ]
    
    return (
        <div className='bg-white w-full'>
            <div className='max-w-7xl mx-auto px-4'>
                <div className='flex sm:justify-center overflow-x-auto '>
                    {categories.map((cat,index)=>(
                            <div onClick={()=>{onSelectCategory(cat.name)}} key={index} className='flex flex-col items-center min-w-[80px] text-sm text-gray-800 hover:text-green-600 hover:cursor-pointer'>
                                <div className='text-xl mb-1'>{cat.icon}</div>
                                <div className='text-center'>{cat.name}</div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Category
