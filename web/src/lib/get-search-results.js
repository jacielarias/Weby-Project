// lib/get-search-results.js
import { query } from "./strapi";

const getSearchResults = async ({ searchInput, page = 1, pageSize = 6 }) => {
  const searchTerm = encodeURIComponent(searchInput?.trim() || "");

  // Construimos la URL de consulta
  const queryStr =
    `posts?filters[$or][0][contenido][$containsi]=${searchTerm}` +
    `&filters[$or][1][titulo][$containsi]=${searchTerm}` +
    `&pagination[page]=${page}` +
    `&pagination[pageSize]=${pageSize}` +
    `&sort=fecha:desc` +
    `&populate[portada]=true&populate[category][populate]=image&populate[author]=true`;

  try {
    const res = await query(queryStr);

    if (!res || !res.data || !Array.isArray(res.data)) {
      console.warn("⚠️ No data found or invalid response:", res);
      return {
        posts: [],
        pagination: {
          page: 1,
          pageSize,
          pageCount: 1,
          total: 0,
        },
      };
    }

    const baseUrl = process.env.STRAPI_URL || "";

    const posts = res.data.map((post) => {
      const { id, titulo, slug, contenido, portada, fecha, category, author } =
        post;

      const image = portada?.url ? `${baseUrl}${portada.url}` : null;
      const categoryImg = category?.image?.url
        ? `${baseUrl}${category.image.url}`
        : null;

      return {
        id,
        titulo,
        slug,
        contenido,
        image,
        fecha,
        category: {
          ...category,
          img: categoryImg,
        },
        author: author
          ? {
              name: author.username,
            }
          : null,
      };
    });

    return {
      posts,
      pagination:
        res.meta?.pagination || {
          page: 1,
          pageSize,
          pageCount: 1,
          total: posts.length,
        },
    };
  } catch (error) {
    console.error("❌ Error fetching search results:", error);
    return {
      posts: [],
      pagination: {
        page: 1,
        pageSize,
        pageCount: 1,
        total: 0,
      },
    };
  }
};

export default getSearchResults;
