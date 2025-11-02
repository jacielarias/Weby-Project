import Link from "next/link";

const LoadMore = ({ linkTo }) => {
    return (
        <Link href={`${linkTo}`} className="flex justify-start p-3 sm:p-5">
            <button
                className={`
                    relative group overflow-hidden
                    w-fit bg-custom py-4 px-14 text-white
                    shadow-light dark:shadow-dark cursor-pointer
                    transition-all duration-300 ease-out shine-effect
                `}
            >
                <span className="relative z-10">Load More...</span>
            </button>
        </Link>
    );
};

export default LoadMore;
