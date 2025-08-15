import React, { useRef } from "react";
import Hero from "../components/Hero";
import Products from "../components/Products";

function Homepage() {
    const productsRef = useRef(null);

    const scrollToProducts = () => {
        if (productsRef.current) {
            const navbarHeight = 80;
            const elementPosition = productsRef.current.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div>
            <Hero scrollToProducts={scrollToProducts} />
            <div ref={productsRef}>
                <Products />
            </div>
        </div>
    );
}

export default Homepage;

