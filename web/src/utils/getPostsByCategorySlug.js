import { getPosts } from "@/lib/get-posts";

const getPostsByCategorySlug = async (categorySlug) => {
    return (await getPosts())
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .filter((post) => post.category.slug === categorySlug)
}


export default getPostsByCategorySlug;