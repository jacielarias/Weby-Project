import { query } from "@/lib/strapi";

const getPostsByCategorySlug = async (slug, page = 1, pageSize = 6) => {
  const res = await query(
    `posts?filters[category][slug][$eq]=${slug}` +
    `&pagination[page]=${page}` +
    `&pagination[pageSize]=${pageSize}` +
    `&sort=fecha:desc` +
    `&populate[portada]=true&populate[category][populate]=image&populate[author]=true
    `
  );

  const posts = res.data.map(post => {
    const { id, titulo, slug, contenido, portada, fecha, category, author } = post;
    const image = portada?.url ? `${process.env.NEXTAUTH_URL}${portada.url}` : null;
    const categoryImg = category?.image?.url ? `${process.env.NEXTAUTH_URL}${category.image.url}` : null;

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

  return {
    posts,
    pagination: res.meta.pagination
  };
};

export default getPostsByCategorySlug;
