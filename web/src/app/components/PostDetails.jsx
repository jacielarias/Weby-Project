import publicationDate from "@/utils/publicationDate";

// Components
import CategoryBadge from "./CategoryBadge";

const PostDetails = ({ item }) => {
    if (!item || !item.category) return null;

    return (
        <div className="flex items-center gap-1.5">
            <CategoryBadge 
                boxShadow={item.category.colorcat}
                categoryName={item.category.name}
            />
            <div className="flex items-center gap-2">
                <p className="text-[10px] tracking-wide">
                    <span className="text-gray-400">By </span>
                    <span className="uppercase font-bold">
                        {item.author?.name || "Unknown"}
                    </span>
                </p>
                <p className="text-[12px] text-gray-400">
                    {publicationDate(item.fecha)}
                </p>
            </div>
        </div>
    );
};

export default PostDetails;
