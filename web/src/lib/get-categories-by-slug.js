import { query } from "./strapi";
const { STRAPI_HOST } = process.env;

export async function getCategoriesBySlug(slug){
    const res = await query(`categories?filters[slug][$eq]=${slug}&fields=name,slug,colorcat,description&populate=image`);

    const category = res.data[0];
    if (!category) return null;

    const { name, description, slug: catSlug, image: rawImage, colorcat } = category;

    const img = `${STRAPI_HOST}${rawImage}`

    return { name, description, slug: catSlug, img, colorcat }
};