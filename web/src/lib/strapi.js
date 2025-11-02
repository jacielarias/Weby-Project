const { STRAPI_HOST, STRAPI_TOKEN } = process.env

export async function query(path) {
  const baseUrl = STRAPI_HOST;

  const url = `${baseUrl}/api/${path}`;
  const token = STRAPI_TOKEN;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Error fetching ${url}: ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}