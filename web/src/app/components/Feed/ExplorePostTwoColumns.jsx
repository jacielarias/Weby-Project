import Link from "next/link";
import publicationDate from "@/utils/publicationDate";

// Components
import LoadMore from "../LoadMoreBtn";
import CategoryBadge from "../CategoryBadge";

const ExplorePostTwoColumns = ({ explorePosts, title, subTitle }) => {
    return (
        <section className="mx-auto h-auto box-border text-[#4B4870] dark:text-white">
            <div className="w-full max-w-full overflow-hidden">
                <h2 className="flex md:flex-row flex-col md:items-center lg:justify-between mb-10">
                    <span className="w-1/2">
                        <span className="text-4xl font-bold">{title}</span>
                        <span className="text-md text-[#bababa] ml-5 whitespace-nowrap">{subTitle}</span> 
                    </span>
                </h2>
                <div className="grid gap-8 lg:gap-0 w-full grid-cols-1 lg:grid-cols-[55%_45%] h-auto box-border max-w-full overflow-hidden">
                {/* Columna izquierda - post destacado */}
                    <Link
                        href={`/post/${explorePosts[0]?.slug}`}
                        className="h-full w-full block overflow-hidden group p-3 sm:p-5"
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
                            <div className="w-full mt-5 ">
                                <div className="flex items-center gap-2">
                                    <CategoryBadge 
                                        boxShadow={explorePosts[0]?.category.colorcat}
                                        categoryName={explorePosts[0]?.category.name}
                                    />
                                </div>
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
                                    {explorePosts[0]?.contenido.slice(0, 120) + "..."}
                                </p>
                            </div>                    
                    </Link>

                    {/* Columna derecha - 3 posts pequeños */}
                    <div className="flex flex-col h-full box-border overflow-hidden">
                        {explorePosts.slice(1, 4).map((post, index) => (
                            <Link
                                href={`/post/${post.slug}`}
                                key={index}
                                className="flex p-5 h-full gap-4 items-center w-full overflow-hidden group"
                                style={{
                                    '--category-color': `${post.category.colorcat}`,
                                }}
                            >
                                <div className="w-2/6 aspect-square overflow-hidden shadow-light dark:shadow-dark">
                                    {post.image ? ( <img
                                        src={post.image}
                                        loading="lazy"
                                        className="w-full h-full object-cover block"
                                        alt={post.titulo}
                                    
                                    /> ) : (
                                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                            <span className="text-gray-400 text-xs">No image</span>
                                        </div>
                                    )}
                                </div>
                                <div className="w-3/5 overflow-hidden p-1">
                                    <div className="flex items-center gap-1.5">
                                        <CategoryBadge 
                                            boxShadow={post.category.colorcat}
                                            categoryName={post.category.name}
                                        />
                                    </div>
                                    <h2 className="text-[14px] sm:text-2xl lg:text-lg font-semibold break-words group-hover:text-custom transition-colors duration-300 ease-in-out">
                                        {post.titulo.charAt(0).toUpperCase() + post.titulo.slice(1, 45) + "..."}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-1">
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
                    <LoadMore linkTo={`/categories/${explorePosts[0]?.category.slug}`} />
                </div>
            </div>
        </section>
    );
};

export default ExplorePostTwoColumns;