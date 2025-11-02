import FeedClient from "./FeedClient";
import { getPosts } from "@/lib/get-posts";
import getCategories from "@/lib/get-categories";

const Feed = async () => {
  const [allPosts, categories] = await Promise.all([
    getPosts(),
    getCategories()
  ]);

  const recentPosts = [...allPosts].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  const javascript_posts = recentPosts.filter((p) => p.category.name === "JavaScript").slice(0, 4);
  const react_posts = recentPosts.filter((p) => p.category.name === "React").slice(0, 4);

  return (
    <FeedClient
      javascript_posts={javascript_posts}
      react_posts={react_posts}
      recentPosts={recentPosts}
      categories={categories}
    />
  );
};

export default Feed;
