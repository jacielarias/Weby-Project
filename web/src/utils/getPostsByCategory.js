import { getPosts } from "@/lib/get-posts";

const getPostsByCategory = async (category) => {
    return (await getPosts())
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .filter((post) => post.category.name === category)
        .slice(0, 4);
}

export default getPostsByCategory;