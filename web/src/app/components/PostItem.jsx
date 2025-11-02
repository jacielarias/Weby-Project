import publicationDate from "@/utils/publicationDate";
import Link from "next/link";

//Components
import CategoryBadge from "./CategoryBadge";

const PostItem = ({ postLink, colorcat, postImg, postTitle, postCategoryName, postDate, postAuthor, postContent }) => {
    return (
        <Link
            href={`/post/${postLink}`}
            className="flex flex-col sm:flex-row h-full p-3 gap-5 md:gap-10 items-center w-full overflow-hidden group"
            style={{
                '--category-color': `${colorcat}`,
            }}
        >
            <div className="w-full sm:w-[40%] aspect-video sm:aspect-square overflow-hidden shadow-light dark:shadow-dark">
                <img
                    src={postImg}
                    loading="lazy"
                    className="w-full h-full object-cover block"
                    alt={postTitle}
                />
            </div>
            <div className="w-full sm:w-[70%] overflow-hidden p-1">
                <CategoryBadge 
                    boxShadow={colorcat}
                    categoryName={postCategoryName}
                />
                <h2 className="text-lg xl:text-2xl font-semibold break-words group-hover:text-custom transition-colors duration-300 ease-in-out">
                    {postTitle.charAt(0).toUpperCase() + postTitle.slice(1)}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-[10px] tracking-wide">
                        <span className="text-gray-400">By </span>
                        <span className="uppercase font-bold">{postAuthor?.name || "Unknown"}</span>
                    </p>
                    <p className="text-[12px] text-gray-400">
                        {publicationDate(postDate)}
                    </p>
                </div>
                <p className="w-full lg:w-[80%] text-sm xl:text-base">
                    {postContent.slice(0, 120) + ".."}
                </p>
            </div>
        </Link>
    )
}

export default PostItem;