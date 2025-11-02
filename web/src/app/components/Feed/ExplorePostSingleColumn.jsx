import Link from "next/link";
import publicationDate from "@/utils/publicationDate";

// Components
import LoadMore from "../LoadMoreBtn";
import CategoryBadge from "../CategoryBadge";
import PostItem from "../PostItem";

const ExplorePostSingleColumn = ({ explorePosts, title, subTitle }) => {
    return (
        <section className="mx-auto h-auto py-8 box-border text-[#4B4870] dark:text-white">
            <div className="w-full max-w-full overflow-hidden">
                <h2 className="flex md:flex-row flex-col md:items-center lg:justify-between mb-10">
                    <span className="w-1/2">
                        <span className="text-4xl font-bold">{title}</span>
                        <span className="text-md text-[#bababa] ml-5 whitespace-nowrap">{subTitle}</span> 
                    </span>
                </h2>
                <div 
                    className="grid gap-5 sm:gap-20 w-full h-auto box-border overflow-hidden"
                >
                    <Link
                        href={`/post/${explorePosts[0]?.slug}`}
                        className="h-full w-full block overflow-hidden group p-3 sm:p-5 group"
                        style={{
                            '--category-color': `${explorePosts[0]?.category.colorcat}`,
                        }}
                    >
                        <img
                            src={explorePosts[0]?.image}
                            loading="lazy"
                            className="w-full aspect-video object-cover block shadow-light dark:shadow-dark"
                            alt={explorePosts[0]?.titulo}
                        />
                            <div className="w-full mt-3.5">
                                <CategoryBadge 
                                    boxShadow={explorePosts[0]?.category.colorcat}
                                    categoryName={explorePosts[0]?.category.name}
                                />
                                <h2 className="text-xl sm:text-2xl lg:text-4xl font-semibold break-words group-hover:text-custom transition-colors duration-300 ease-in-out">
                                    {explorePosts[0]?.titulo.charAt(0).toUpperCase() + explorePosts[0]?.titulo.slice(1)}
                                </h2>
                                <div className="flex items-center gap-2 my-1">
                                    <p className="text-[10px] tracking-wide">
                                        <span className="text-gray-400">By </span>
                                        <span className="uppercase font-bold">{explorePosts[0]?.author?.name || "Unknown"}</span>
                                    </p>
                                    <p className="text-[12px] text-gray-400">
                                        {publicationDate(explorePosts[0]?.fecha)}
                                    </p>
                                </div>
                                <p className="w-full lg:w-[80%] text-sm lg:text-base">
                                    {explorePosts[0]?.contenido.slice(0, 250) + ".."}
                                </p>
                            </div>                    
                    </Link>

                    <div className="w-full grid gap-10 h-full box-border overflow-hidden">
                        {explorePosts.slice(1, 4).map((post, index) => (
                            <PostItem 
                                postLink={post.slug}
                                key={index}
                                colorcat={post.category.colorcat}
                                postCategoryName={post.category.name}
                                postTitle={post.titulo}
                                postImg={post.image}
                                postDate={post.fecha}
                                postAuthor={post.author}
                                postContent={post.contenido}
                            />
                        ))}
                        {/* LOAD MORE BTN */}
                        <LoadMore linkTo={`/categories/${explorePosts[0]?.category.slug}`} />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ExplorePostSingleColumn;