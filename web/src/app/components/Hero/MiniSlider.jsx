"use client"

import Link from "next/link";
import { useRef } from "react";
import publicationDate from "@/utils/publicationDate";

// Icons
import { PiArrowRightThin, PiArrowLeftThin } from "react-icons/pi";
import { CgEditBlackPoint } from "react-icons/cg";

// Components
import CategoryBadge from "../CategoryBadge";

const MiniSlider = ({ posts }) => {
    const sliderRef = useRef(null);

    const scrollLeft = () => {
        if (sliderRef.current) sliderRef.current.scrollBy({ left: -460, behavior: 'smooth' });
    };

    const scrollRight = () => {
        if (sliderRef.current) sliderRef.current.scrollBy({ left: 460, behavior: 'smooth' });
    };
    
    return (
        <div className="relative px-0 md:px-12 text-[#4B4870] dark:text-white mt-6 min-w-[320px] h-[100px] md:h-[120px] w-full flex items-center mx-auto">
            <div 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full text-base md:text-2xl hidden md:flex justify-center items-center z-10 border-[1px] border-[#2a2f69] dark:border-[#fff] h-6 w-6 md:h-10 md:w-10 border-solid cursor-pointer" 
                onClick={scrollLeft}
            >
                <PiArrowLeftThin />
            </div>
            <div 
                className="flex w-full h-full overflow-x-auto flex-nowrap overflow-y-hidden scrollbar-hide gap-4 md:gap-0" 
                ref={sliderRef}
            >
                {posts.map((post, index) => (
                    <Link key={index} 
                        href={`/post/${post.slug}`} 
                        className={`relative w-full md:min-w-[150px] max-w-[420px] h-full group flex justify-between items-center gap-2 md:gap-5 p-0 md:p-3 group`}
                        style={{
                            '--category-color': `${post.category.colorcat}`,
                            flex: "0 0 auto"
                        }}
                    >
                        <img 
                            src={post.image}
                            loading="lazy" 
                            className="w-[30%] md:w-[30%] aspect-square h-full object-cover shadow-light dark:shadow-dark"  
                        />
                        
                        {/* Degradado 
                            <div className="absolute bottom-0 left-0 w-full h-2/4 bg-gradient-to-t from-[rgba(0,0,0,0.9)]/50 to-transparent z-0"></div>*/}
                        
                        <div className="w-[90%]">
                            {/* Categoría */}
                            <CategoryBadge
                                slug={post.category.slug}
                                boxShadow={post.category.colorcat}
                                categoryName={post.category.name}
                            />
                            {/* Título */}
                            <h2 className="text-sm md:text-base font-semibold group-hover:text-custom transition-colors duration-300 ease-in-out">
                                {post.titulo.charAt(0).toUpperCase() + post.titulo.slice(1, 45) + '...'}
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-[8px] sm:text-[10px] tracking-wide">
                                    <span className="text-gray-400">By </span>
                                    <span className="uppercase font-bold">{post.author?.name || "Unknown"}</span>
                                </p>
                                <span className="text-[8px] sm:text-[10px] text-gray-300"><CgEditBlackPoint /></span>
                                <p className="text-[8px] sm:text-[10px] text-gray-600 dark:text-gray-400">
                                       {publicationDate(post.fecha)}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full text-base md:text-2xl hidden md:flex justify-center items-center z-10 border-[1px] border-[#2a2f69] dark:border-[#fff] h-6 w-6 md:h-10 md:w-10 border-solid cursor-pointer"
                onClick={scrollRight}
            >
                <PiArrowRightThin />
            </div>
        </div>
    )
};

export default MiniSlider;