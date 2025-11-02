import Link from "next/link";

const CategoryBadge = ({ boxShadow, categoryName, isNotHover = false, isLink = false, href = "#" }) => {
    const commonClasses = `inline-flex justify-between items-center gap-1 px-3 rounded-full text-[10px] font-semibold mb-2 shine-effect bg-white dark:bg-[#3a384f] relative transition-colors duration-300 group`;
    const commonStyle = {
        boxShadow: `${boxShadow} 0px 1px 2px, ${boxShadow} 0px 2px 2px -2px`,
    };

    const content = (
        <>
            <p className="text-[var(--category-color)] font-semibold text-base">#</p>
            <span
                className={`text-[7px] md:text-[10px] transition-colors duration-300 ease-in-out 
                    ${isNotHover ? "text-[var(--category-color)]" : "group-hover:text-[var(--category-color)]"}`}
            >
                {categoryName}
            </span>
        </>
    );

    return isLink ? (
        <Link href={href} className={commonClasses} style={commonStyle}>
            {content}
        </Link>
    ) : (
        <div className={commonClasses} style={commonStyle}>
            {content}
        </div>
    );
};

export default CategoryBadge;
