import { query } from "./strapi";


export function getPosts() {
    return query(`posts?fields=titulo,slug,contenido,fecha&populate[portada]=true&populate[category][populate]=image&populate[author]=true`)
        .then(res => {
            return res.data.map(post => {
                const { id, titulo, slug, contenido, portada: rawImage, fecha, category, author } = post;

                const image = `${process.env.STRAPI_URL}${rawImage.url}`;
                const categoryImg = category?.image?.url ? `${process.env.STRAPI_URL}${category.image.url}` : null;

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
