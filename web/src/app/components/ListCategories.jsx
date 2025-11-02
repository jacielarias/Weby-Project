import Link from "next/link";

const ListCategories = ({ categories = [], customClass, hiddenGat }) => {

    return (
        <ul className={customClass}>
            {categories.map((category, index) => (
                <li key={index}>
                    <Link href={`/categories/${category.slug}`} 
                        className="hover:text-custom transition-colors duration-300 ease-in-out flex gap-1"
                        style={{
                            '--category-color': `${category.colorcat}`,
                        }}
                    >
                        <p className={`text-[var(--category-color)] font-semibold text-base ${hiddenGat}`}>
                            #
                        </p>
                        {category.name}
                    </Link>
                </li>   
            ))}
        </ul>
    )
}

export default ListCategories;