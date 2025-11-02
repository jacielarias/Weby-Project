"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import publicationDate from "@/utils/publicationDate";

// Icons
import { PiArrowRightThin, PiArrowLeftThin } from "react-icons/pi";
import { CgEditBlackPoint } from "react-icons/cg";

// Components
import CategoryBadge from "../CategoryBadge";


const Slider = ({ posts }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
    };

    useEffect(()=> {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [posts.length]);

    return (
        <div className="relative h-[65vh] md:min-h-[530px] lg:h-full shadow-light dark:shadow-dark">
            {/* Post */}
            {posts.map((post, index) => (
                <Link
                    href={`/post/${post.slug}`}
                    key={index}
                    className={`absolute w-full h-full transition-opacity duration-500 group ${
                        index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                    style={{
                        '--category-color': `${post.category.colorcat}`,
                    }}
                >
                    <img
                        src={post.image}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        alt={post.titulo}
                    />
                    {/* Gradient */}
                    <div 
                        className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[rgba(0,0,0,0.8)]/50 to-transparent z-0">
                    </div>
                    <div className="absolute bottom-[10%] left-10 z-10 pr-12">
                        <div className="flex gap-2">
                            <CategoryBadge 
                                boxShadow={post.category.colorcat}
                                categoryName={post.category.name}
                                isNotHover={true}
                            />
                        </div>
                        <h2 className="text-2xl lg:text-5xl font-bold">
                            {post.titulo.charAt(0).toUpperCase() + post.titulo.slice(1)}
                        </h2>
                        <div className="flex items-center gap-2 mt-2">
                            <p className="text-[8px] sm:text-[10px] tracking-wide">
                                <span className="text-gray-200">By </span>
                                <span className="uppercase font-bold">
                                    {post.author?.name || "Unknown"}
                                </span>
                            </p>
                            <span className="text-[8px] sm:text-[10px] text-gray-300">
                                <CgEditBlackPoint />
                            </span>
                            <p className="text-[8px] sm:text-[10px] text-gray-200">
                                {publicationDate(post.fecha)}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}

            {/* Controls */}
            <div className="absolute top-[50%] bottom-[50%] left-0 right-0 flex justify-between items-center px-4 z-10 text-xl lg:text-3xl">
                <button
                    className="backdrop-blur-md bg-[rgba(0,0,0,0.1)] w-10 h-10 lg:w-16 lg:h-16 rounded-full flex justify-center items-center cursor-pointer border-[1px] border-white border-solid"
                    onClick={prevSlide}
                >
                    <PiArrowLeftThin />
                </button>
                <button
                    className="backdrop-blur-md bg-[rgba(0,0,0,0.1)] w-10 h-10 lg:w-16 lg:h-16 rounded-full flex justify-center items-center cursor-pointer border-[1px] border-white border-solid"
                    onClick={nextSlide}
                >
                    <PiArrowRightThin />
                </button>
            </div>
        </div>
    );
};

export default Slider;