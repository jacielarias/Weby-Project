import Link from "next/link";
import publicationDate from "@/utils/publicationDate";

// Icons
import { CiPaperplane } from "react-icons/ci";

// Components
import Socials from "../Socials";

const Sidebar =  ({ recentPosts, categories, postsLength }) => {

    return (
        <aside>
            <div className="text-[#4B4870] dark:text-white grid gap-20 w-full">
                {/* NEWSLETTER */}
                <div className="flex justify-between items-center gap-10 flex-col pt-14 pb-8 px-8 bg-[#f9f9fe] dark:bg-[#2e2c3e]">
                    <div className="mb-5 flex justify-between items-center flex-col w-full gap-5">
                        <h3 className="font-bold text-[18px] tracking-wider text-center">FOLLOW US</h3>
                        <Socials customClass={"flex justify-center items-center gap-5"} />
                    </div>

                    <div className="flex justify-between items-center flex-col w-full gap-5">
                        <h3 className="font-bold text-[18px] tracking-wider text-center">NEWSLETTER</h3>
                        <p className="text-center">Fill your email below to subscribe to my newsletter</p>
                    </div>


                    <form className="flex justify-center items-center gap-2 flex-col w-full">
                        <input 
                            className="tnp-email bg-white dark:bg-[#3b394a] py-4 px-5 w-full text-[#4B4870] dark:text-white outline-0" type="email" required name="ne" placeholder="Your email here"></input>
                                <button 
                                    className={`
                                        tnp-submit relative group overflow-hidden
                                        bg-[#00c7fe] cursor-pointer text-white
                                        py-4 px-5 w-full flex justify-center items-center gap-2 text-lg transition-all duration-300 ease-out shine-effect
                                    `}
                                    type="submit"
                                >

                                    <span className="relative z-10 flex items-center gap-2">
                                        Submit <CiPaperplane />
                                    </span>
                                </button>
                    </form>
                </div>
                
                {/* LATEST POSTS */}
                <div>
                    <div className="mb-5 ">
                        <h3 className="font-bold text-[18px] flex items-center gap-3">
                            Latest Posts
                            <hr className="w-[20px] border-1 border-custom" /> 
                        </h3>
                    </div>
                    
                    <div className="grid gap-5">
                        {recentPosts.map((post, index) => (
                            <Link 
                                href={`/post/${post.slug}`} 
                                key={index} 
                                className="flex lg:justify-between items-center gap-2 group relative"
                            >
                                {post?.image ? (
                                    <img
                                        src={post.image}
                                        loading="lazy"
                                        className="object-cover max-w-[120px] max-h-[120px] rounded-full aspect-square overflow-hidden shadow-light dark:shadow-dark"
                                        alt={post?.titulo || "Post image"}
                                    />
                                ) : (
                                    <div className="max-w-[120px] max-h-[120px] aspect-square rounded-full bg-gray-200 dark:bg-gray-700 flex justify-center items-center shadow-light dark:shadow-dark">
                                        <span className="text-gray-400 text-xs">No image</span>
                                    </div>
                                )}
                                <div className="flex flex-col w-[90%]">
                                    <h3 className="text-md overflow-hidden font-extrabold group-hover:text-custom transition-colors duration-300 ease-in-out">
                                        {post.titulo.charAt(0).toUpperCase() + post.titulo.slice(1)}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-2 mb-4">
                                        <p className="text-[10px] tracking-wide">
                                            <span className="text-gray-400">By </span>
                                            <span className="uppercase font-bold">{post.author?.name || "Unknown"}</span>
                                        </p>
                                        <p className="text-[12px] text-gray-400">
                                            {publicationDate(post.fecha)}
                                        </p>
                                    </div>
                                </div>
                            </Link> 
                        ))}
                    </div>
                </div>
                
                {/* CATEGORIES */}             
                <div className="w-full">
                    <div className="mb-5 ">
                        <h3 className="font-bold text-[18px] flex items-center gap-3">
                            Categories
                            <hr className="w-[20px] border-1 border-custom" /> 
                        </h3>
                    </div>
                    {categories.map((category, index) => (
                        <div 
                            className="flex justify-center items-center flex-col cursor-pointer" 
                            key={index}
                        >
                            <Link
                            href={`/categories/${category.slug}`}
                            className={`
                                group relative overflow-hidden cursor-pointer shine-effect
                                flex justify-between items-center h-20 w-full px-5 mb-5
                                transition-all duration-300 ease-out shadow-light dark:shadow-dark
                            `}
                                style={{
                                    boxShadow:`${category.colorcat} 0px 6px 12px -2px, ${category.colorcat} 0px 3px 7px -3px`,
                                    backgroundColor: `${category.colorcat}`
                                }}
                            >
                            <div className="relative z-10 flex justify-center items-center gap-5">
                                <img
                                    src={category.img}
                                    alt={category.description}
                                    className="h-12 w-12"
                                    style={{
                                        filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))"
                                    }}
                                />
                                <h3 className="font-extrabold text-xl text-white">{category.name}</h3>
                            </div>

                            <p
                                className="relative z-10 w-11 h-11 flex justify-center items-center shadow-2xl rounded-full text-white border border-white"
                                style={{
                                boxShadow: `0 4px 20px ${category.colorcat}`,
                                backgroundColor: `${category.colorcat}`
                                }}
                            >
                                {postsLength.filter(post => post.category.name === category.name).length}
                            </p>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* SOCIAL */}
                <div>
                    <div className="mb-5 ">
                        <h3 className="font-bold text-[18px] flex items-center gap-3">
                            Socials
                            <hr className="w-[20px] border-1 border-custom" /> 
                        </h3>
                    </div>
                    <Socials 
                        customClass={"grid grid-cols-2 items-center flex-wrap gap-2"} 
                        customClassLi={`
                            bg-[#f9f9fe] dark:bg-[#2e2c3e]
                            aspect-square w-full 
                            flex justify-center items-center 
                            hover:bg-custom hover:text-white 
                            cursor-pointer
                            text-4xl
                            transition-colors duration-300 ease-in-out
                        `}    
                    />
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;