import Link from "next/link";
import publicationDate from "@/utils/publicationDate";

// Components
import CategoryBadge from "../CategoryBadge";

const ExplorePostFilterByCat = ({ categories, explorePostByCat, selectCategory, activeCategory }) => {

    return (
        <section className="mx-auto w-full h-auto py-8 box-border text-[#4B4870] dark:text-white">
            <div className="flex items-center justify-between flex-col md:flex-row mb-10 md:gap-0 gap-5">
                <h2 className="flex md:flex-row flex-col md:items-center lg:justify-between">
                    <span className="w-1/2">
                        <span className="text-4xl font-bold">Explore</span>
                        <span className="text-md text-[#bababa] ml-5 whitespace-nowrap">All articles</span> 
                    </span>
                </h2>
                <ul className="flex text-[11px] sm:text-base">
                    {categories.map((cat, index) => (
                        <li 
                            key={index} 
                            onClick={() => selectCategory(cat.name)} 
                            className="pr-3 cursor-pointer"
                        >
                            <span 
                                className={`pr-3 font-bold 
                                ${ cat.name === activeCategory ? "text-custom" : ""}`}>
                                {cat.name}
                            </span> /
                        </li>
                    ))}
                </ul>
            </div>
            <div className="grid grid-cols-2">
                {explorePostByCat.slice(0, 6).map((post, index) => (
                    <Link  
                        href={`/post/${post.slug}`}                                 
                        key={index}
                        className="flex flex-col sm:flex-row h-full p-3 gap-5 items-center w-full overflow-hidden group"
                        style={{
                            '--category-color': `${post.category.colorcat}`,
                        }}
                    >
                        <div className="w-full sm:w-[50%] md:w-[20%] aspect-square overflow-hidden shadow-light dark:shadow-dark">
                            {post.image ? (
                                <img
                                    src={post.image}
                                    loading="lazy"
                                    className="w-full h-full object-cover block"
                                    alt={post.titulo}
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <span className="text-gray-400 text-xs">No image</span>
                                </div>
                            )}
                        </div>
                        <div className="w-full sm:w-3/5 overflow-hidden p-1">
                            <div className="flex items-center gap-1.5">
                                <CategoryBadge 
                                    boxShadow={post.category.colorcat}
                                    categoryName={post.category.name}
                                />
                            </div>
                            <h2 
                                className="text-[14px] lg:text-[15px] font-semibold break-words group-hover:text-custom transition-colors duration-300 ease-in-out"
                            >
                                {post.titulo.charAt(0).toUpperCase() + post.titulo.slice(1)}
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-[8px] sm:text-[10px] tracking-wide">
                                    <span className="text-gray-400">By </span>
                                    <span className="uppercase font-bold">{post.author?.name || "Unknown"}</span>
                                </p>
                                <p className="text-[8px] sm:text-[10px] text-gray-400">
                                    {publicationDate(post.fecha)}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default ExplorePostFilterByCat;