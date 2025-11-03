import { query } from "./strapi";


export async function getCategoriesBySlug(slug){
    const res = await query(`categories?filters[slug][$eq]=${slug}&fields=name,slug,colorcat,description&populate=image`);

    const category = res.data[0];
    if (!category) return null;

    const { name, description, slug: catSlug, image: rawImage, colorcat } = category;

    const img = `${process.env.NEXTAUTH_URL}${rawImage}`

    return { name, description, slug: catSlug, img, colorcat }
};
