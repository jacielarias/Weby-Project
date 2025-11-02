import { query } from "./strapi";
const { STRAPI_HOST } = process.env;

export async function getPostBySlug(slug) {
    console.log("Buscando slug:", slug);

    const res = await query(
        `posts?filters[slug][$eq]=${slug}&fields=titulo,slug,contenido,excerpt,fecha&populate[portada]=true&populate[category][populate]=image&populate[author]=true`
    );

    const post = res.data[0];
    if (!post) return null;

    const { titulo, slug: postSlug, contenido, portada, fecha, excerpt, category, author } = post;

    return {
        titulo,
        slug: postSlug,
        contenido,
        fecha,
        excerpt,
        image: portada?.url ? `${STRAPI_HOST}${portada.url}` : null,
        category: {
            ...category,
            img: category?.image?.url ? `${STRAPI_HOST}${category.image.url}` : null,
        },
        author: author ? {
            name: author.username,
        } : null,
    };
}

