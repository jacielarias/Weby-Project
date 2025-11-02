"use client";

// Icons
import { PiCaretUpThin } from "react-icons/pi";

const ScrollToTopBtn = () => {

    const scrollTop = () => {
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        })
    }

    return (
        <button onClick={scrollTop} className="bg-custom text-white shine-effect h-12 w-12 flex justify-center items-center text-3xl">
            <PiCaretUpThin />
        </button>
    )
}

export default ScrollToTopBtn;