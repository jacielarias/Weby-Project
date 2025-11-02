import getCategories from "@/lib/get-categories";

import Header from "./Header";

const HeaderClient = async () => {
    const categories = await getCategories();

    return (
        <Header 
            categories={categories}
        />
    )
};

export default HeaderClient;