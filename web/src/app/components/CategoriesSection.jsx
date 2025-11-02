import getCategories from "@/lib/get-categories";
import { getPosts } from "@/lib/get-posts";
import Link from "next/link";

const CategoriesSection = async () => {
    const categories = await getCategories();
    const posts = await getPosts();

    return (
        <section className="w-[90%] mx-auto mt-24 text-[#4B4870] dark:text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full mx-auto mt-24 mb-40  gap-10">
                {categories.map((category, index) => (
                    <div className="flex justify-center items-center flex-col cursor-pointer" 
                        key={index}
                    >
                        <h3 className="font-extrabold text-xl mb-3">{category.name}</h3>
                        <Link href={`categories/${category.slug}`} 
                            className={`flex justify-center items-center h-36 w-36 rounded-full relative `}
                            style={{
                                boxShadow:`${category.colorcat} 0px 6px 12px -2px, ${category.colorcat} 0px 3px 7px -3px`,
                                backgroundColor: `${category.colorcat}`
                            }}
                        >
                            <img 
                                src={category.img} 
                                alt={category.description} 
                                className="w-[50%] h-auto"
                                style={{filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.6)"}}
                            />
                            <p 
                                className={`absolute right-0 bottom-0 w-11 h-11 flex justify-center items-center shadow-2xl rounded-full text-white border-2 border-white border-solid`}
                                style={{
                                    boxShadow: `0 4px 20px ${category.colorcat}`,
                                    backgroundColor: `${category.colorcat}` 
                                }}
                            >
                                {posts.filter(post => post.category.name === category.name).length}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoriesSection;
