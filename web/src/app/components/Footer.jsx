import getCategories from "@/lib/get-categories";
import { getPosts } from "@/lib/get-posts";
import publicationDate from "@/utils/publicationDate";
import Link from "next/link";

// Components
import ListCategories from "./ListCategories";
import Socials from "./Socials";
import CategoryBadge from "./CategoryBadge";
import ScrollToTopBtn from "./ScrollToTopBtn";
import Newsletter from "./Newsletter";
import Logo from "./Logo";

const Footer = async () => {
    const categories = await getCategories();
    const recentPosts = (await getPosts()).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    return (
        <footer className="w-full h-auto px-8 flex justify-center items-center flex-col text-base bg-[#f9f9fe] dark:bg-[#3d3a56] text-[#4B4870] dark:text-white">
            <Newsletter 
                customClass={"w-full md:w-[80%] lg:w-[70%] py-20 flex justify-center items-center flex-col text-center"}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-20 mb-20">
                <div className="">
                    <Logo textSize={"text-4xl md:text-6xl"} />
                    <p className="mt-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                </div>
                <div>
                    <h3 className="text-[22px] font-bold mb-10">
                        Latest Posts
                        <hr className="w-[20px] border-1 border-custom" /> 
                    </h3>
                    <div className="flex flex-col gap-15 sm:gap-5">
                        {recentPosts.slice(0, 2).map((post, index) => (
                            <Link 
                                href={`/post/${post.slug}`} 
                                key={index} 
                                className="flex gap-3 group h-[100px]  sm:h-[120px]"                         
                                style={{
                                    '--category-color': `${post.category.colorcat}`,
                                }}
                            >
                            <div className="aspect-square w-[100px]  sm:w-[120px] flex-shrink-0 overflow-hidden shadow-light dark:shadow-dark">
                                    {post.image ? (
                                        <img
                                            src={post.image}
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                            alt={post.titulo}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center text-gray-400">
                                            <MdImage className="text-3xl mb-1" />
                                            <span className="text-xs">No image</span>
                                        </div>
                                    )}
                            </div>
                                <div className="w-full">
                                    <CategoryBadge 
                                        boxShadow={post.category.colorcat}
                                        categoryName={post.category.name}
                                    />
                                    <h4 className="font-bold group-hover:text-custom transition-colors duration-300 text-sm">
                                        {post.titulo.charAt(0).toUpperCase() + post?.titulo.slice(1)}
                                    </h4>
                                    <div className="flex items-center gap-2 my-1">
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
                <div>
                    <h3 className="text-[22px] font-bold mb-10">
                        Categories
                        <hr className="w-[20px] border-1 border-custom" /> 
                    </h3>
                    <ListCategories 
                        categories={categories} 
                        customClass={"flex flex-col gap-5"} 
                        
                    />
                </div>
                <div>
                    <h3 className="text-[22px] font-bold mb-10">
                        Socials
                        <hr className="w-[20px] border-1 border-custom" /> 
                    </h3>
                    <Socials 
                        customClass={"flex flex-wrap items-center gap-2 w-full"} 
                        customClassLi={`
                            bg-custom text-white
                            aspect-square w-[60px]
                            flex justify-center items-center
                            text-xl
                            transition-colors duration-300 ease-in-out
                            shadow-light dark:shadow-dark
                        `}
                    />
                </div>
            </div>
            <div className="w-full mx-auto h-14 border-t py-10 px-8 border-gray-300 flex items-center justify-between">
                <p>Weby © 2025. All rights reserved</p>
                <div className="flex justify-center items-center gap-4">
                    <p className="text-gray-400 text-sm">Scroll to Top</p>
                    <ScrollToTopBtn />
                </div>
            </div>
        </footer>
    )
};

export default Footer;