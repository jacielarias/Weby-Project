'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { PiArrowRightLight, PiArrowLeftLight } from "react-icons/pi";

// Utils
import publicationDate from "@/utils/publicationDate";

const TrendingSlider = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  // Mostrar 3 posts al mismo tiempo
  const visiblePosts = posts.slice(currentIndex, currentIndex + 2);
  // Si faltan para completar 3, agregamos desde el inicio
  while (visiblePosts.length < 3) {
    visiblePosts.push(posts[(currentIndex + visiblePosts.length) % posts.length]);
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [posts.length]);

    return (
        <section className="w-full h-[70vh] max-w-7xl mx-auto px-4 pt-10 pb-20 flex gap-6 items-stretch">
        {/* Imagen del primer slide visible */}
        <div className="w-[50%] relative overflow-hidden shadow-lg">
            <img
                src={visiblePosts[0].image}
                alt={visiblePosts[0].titulo}
                className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute bottom-6 left-6 text-white">
                <div className="flex">
                    <p className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 border 
                        ${visiblePosts[0].category.name}`}
                    >
                        {visiblePosts[0].category.name}
                    </p>
                    <p className="text-sm">
                        {publicationDate(visiblePosts[0].fecha)}
                    </p>
                </div>
                <h2 className="text-3xl font-bold mb-1">
                    {visiblePosts[0].titulo}
                </h2>
            </div>
        </div>

        {/* Cards de texto a la derecha */}
        <div className="w-1/2 flex gap-4 relative">
            {visiblePosts.map((post, idx) => (
            <Link
                href={`/post/${post.slug}`}
                key={idx}
                className="group border h-1/2 rounded-xl p-4 hover:bg-gray-100 transition shadow-lg"
            >
                <div className="flex justify-between items-center">
                <p
                    className={`text-sm font-medium px-2 py-1 rounded-full shadow-lg ${post.category.name}`}
                >
                    {post.category.name}
                </p>
                <span className="text-xs text-gray-500">{publicationDate(post.fecha)}</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-gray-800 group-hover:text-red-600">
                {post.titulo}
                </h3>
            </Link>
            ))}

            {/* Botones de navegación */}
            <div className="absolute -bottom-12 left-0 flex gap-4 mt-4">
            <button
                onClick={prevSlide}
                className="w-10 h-10 flex justify-center items-center border rounded-full hover:bg-gray-200 transition"
            >
                <PiArrowLeftLight />
            </button>
            <button
                onClick={nextSlide}
                className="w-10 h-10 flex justify-center items-center border rounded-full hover:bg-gray-200 transition"
            >
                <PiArrowRightLight />
            </button>
            </div>
        </div>
        </section>
    );
};

export default TrendingSlider;
