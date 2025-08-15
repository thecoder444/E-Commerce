import React from "react";
import heroImage from "../assets/Quickzy.png";

function Hero({ scrollToProducts }) {
    return (
        <section className='bg-gradient-to-r from-green-100 to-white px-6 py-12 md:flex items-center justify-between max-w-7xl mx-auto rounded-xl mt-24 h-auto md:h-80'>
            <div className='md:w-1/2 space-y-4'>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-800'>Fast Delivery 🚀</h1>
                <p className='text-gray-800'>
                    Order now and get your products delivered to your doorstep in no time.
                    From groceries to gadgets — we've got it all!
                </p>
                <button
                    onClick={scrollToProducts}
                    className='mt-4 bg-green-500 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg'>
                    Shop Now
                </button>
            </div>
            <div className='md:w-1/2 mt-8 md:mt-0'>
                <img src={heroImage} alt="photo" className='w-full max-w-md mx-auto' />
            </div>
        </section>
    );
}

export default Hero;
