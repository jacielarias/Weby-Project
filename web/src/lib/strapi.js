export async function query(path) {
  const baseUrl = process.env.STRAPI_URL || "https://safe-actor-a3f0efe503.strapiapp.com";

  const url = `${baseUrl}/api/${path}`;
  const token = process.env.NEXTAUTH_SECRET;

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
