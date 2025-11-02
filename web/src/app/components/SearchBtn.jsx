"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Icons
import { CiSearch, CiHeart } from "react-icons/ci";
import { PiXThin } from "react-icons/pi";

const SearchBtn = ({ categories, search, searcher }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim() !== "") {
            router.push(`/results?query=${encodeURIComponent(search.trim())}`);
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            <section 
                className={`flex items-center justify-center flex-col absolute z-50 top-0 left-0 right-0 w-full h-[60vh] bg-white dark:bg-[#3a384f] transform transition-transform duration-500 shadow-light dark:shadow-dark ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
            >
                <button
                    className="absolute top-4 right-4 text-black dark:text-white cursor-pointer"
                    onClick={() => setIsMenuOpen(false)}
                    title="close"
                >
                    <PiXThin className="text-4xl" />
                </button>
                <div className="flex flex-col mx-auto w-[90%] lg:w-[80%]">
                    <h2 className="text-2xl mb-2 font-bold flex gap-2">
                        <CiHeart /> Seach an article!
                    </h2>
                    <form 
                        onSubmit={handleSearch}
                        className="flex justify-center items-center md:flex-row flex-col gap-2 w-full mx-auto"
                    >
                        <input 
                            value={search}
                            onChange={searcher}
                            className="tnp-email bg-gray-100 dark:bg-[#4e4c5e] py-6 px-5 w-full text-[#333550] dark:text-white outline-0" type="text" required name="ne" placeholder="Search...">    
                        </input>
                        <button 
                            className="tnp-submit bg-custom cursor-pointer text-white py-6 px-5 w-full md:w-[10%] flex justify-center items-center gap-2 text-lg shadow-light dark:shadow-dark transition-all duration-300 ease-out overflow-hidden group relative shine-effect" 
                            type="submit">
                            <CiSearch className="text-2xl text-white"/>
                        </button> 
                    </form>
                    {categories && categories.length > 0 && (
                        <div className="mt-8 w-full">
                            <h3 className="text-xl font-semibold mb-4 text-[#4B4870] dark:text-white">Popular Categories</h3>
                            <ul className="flex flex-wrap gap-3">
                                {categories.slice(0, 6).map((cat, index) => (
                                    <Link key={index}  
                                        href={`/categories/${cat.slug}`} 
                                        className={`px-4 shine-effect group py-1 flex gap-1 font-bold transition-all rounded-full group`}
                                        
                                        style={{
                                            boxShadow:`${cat.colorcat} 0px 1px 2px, ${cat.colorcat} 0px 2px 2px -2px`,
                                            '--category-color': `${cat.colorcat}`,
                                        }}
                                    >   
                                        <span className="text-[var(--category-color)] font-semibold text-base transition-colors duration-300">#</span>
                                        <span className="group-hover:text-[var(--category-color)] transition-colors duration-300">{cat.name}</span>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                
            </section>

            <div 
                className="bg-custom h-9 w-9 md:h-10 md:w-10 flex justify-center items-center rounded-full cursor-pointer shadow-light dark:shadow-dark z-30 relative group overflow-hidden text-white transition-all duration-300 ease-out shine-effect"
                onClick={() => {
                    setIsMenuOpen(true);
                }}
                
            >
                <CiSearch className="text-[22px] md:text-2xl text-white"/>
            </div> 
        </>
    )
}

export default SearchBtn;