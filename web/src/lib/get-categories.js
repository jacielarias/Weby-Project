import { query } from "./strapi";
const { STRAPI_HOST } = process.env;

function getCategories (){
    return query (`categories?fields[0]=name&fields[1]=slug&fields[2]=description&fields[3]=colorcat&populate=image`)
        .then(res => {
            return res.data.map(category => {
                const { name, description, slug, image: rawImage, colorcat } = category;

                const img = `${STRAPI_HOST}${rawImage.url}`

                return { name, description, slug, img, colorcat }
            })
        })
}

export default getCategories;