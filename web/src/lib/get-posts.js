import { query } from "./strapi";
const { STRAPI_HOST } = process.env;

export function getPosts() {
    return query(`posts?fields=titulo,slug,contenido,fecha&populate[portada]=true&populate[category][populate]=image&populate[author]=true`)
        .then(res => {
            return res.data.map(post => {
                const { id, titulo, slug, contenido, portada: rawImage, fecha, category, author } = post;

                const image = `${STRAPI_HOST}${rawImage.url}`;
                const categoryImg = category?.image?.url ? `${STRAPI_HOST}${category.image.url}` : null;

                return {
                    id,
                    titulo,
                    slug,
                    contenido,
                    image,
                    fecha,
                    category: {
                        ...category,
                        img: categoryImg 
                    },        
                    author: author ? {
                        name: author.username,
                    } : null,
                };
            });
        });
}
