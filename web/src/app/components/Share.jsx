"use client"
import { useRef } from "react";
import Link from "next/link";

// Icons
import { FaFacebookF , FaPinterestP  } from "react-icons/fa";
import { FaRegCopy, FaXTwitter } from "react-icons/fa6";

const Share = ({ linkPost }) => {
    const tooltipRef = useRef(null);

    const copyLink = async () => {
        try {
            const fullUrl = `${window.location.origin}/post/${linkPost}`;
            await navigator.clipboard.writeText(fullUrl);

            if (tooltipRef.current) {
                tooltipRef.current.classList.remove("hidden");
                setTimeout(() => {
                    tooltipRef.current.classList.add("hidden");
                }, 2000);
            }
        } catch (err) {
            console.error("Error al copiar el enlace:", err);
        }
    };

    return (
        <div className="flex justify-center items-center mt-4 gap-2.5">
            <div className="flex text-base md:text-xl justify-between items-center gap-5 py-2 px-6 bg-white rounded-full shadow-light dark:shadow-dark text-[#3a384f]">
                <span className="text-[15px]">Share</span>
                <Link 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${linkPost}`} 
                    className={`shine-effect`} title="X" aria-label="X"
                >
                    <FaXTwitter />
                </Link>
                <Link 
                    href={`https://twitter.com/intent/tweet?url=${linkPost}`} 
                    className={`shine-effect`} title="Facebook" aria-label="Facebook">
                    <FaFacebookF />
                </Link>
                <Link 
                    href={`https://pinterest.com/pin/create/button/?url=${linkPost}`} 
                    className={`shine-effect`} 
                    title="Pinterest" 
                    aria-label="Pinterest">
                    <FaPinterestP />
                </Link>
                <div className="relative">
                    <button
                        onClick={copyLink}
                        className=" p-2 rounded-full hover:opacity-80 cursor-pointer shine-effect"
                    >
                        <FaRegCopy />
                    </button>
                    <span
                        ref={tooltipRef}
                        className="hidden absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-white px-2 py-1 shadow-light dark:shadow-dark"
                    >
                        Copiado
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Share;