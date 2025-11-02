import { getPostBySlug } from "@/lib/get-post-by-slug";
import { getPosts } from "@/lib/get-posts";
import { marked } from "marked";
import getCategories from "@/lib/get-categories";
import publicationDate from "@/utils/publicationDate";
import Link from "next/link";

// CSS
import "../../styles/post.css"

// Icons
import { CgEditBlackPoint } from "react-icons/cg";

// Components
import CategoryBadge from "@/app/components/CategoryBadge";
import Header from "@/app/components/HeaderClient";
import BreadCrumbs from "@/app/components/Breadcrumbs";
import Sidebar from "@/app/components/Feed/Sidebar";
import Footer from "@/app/components/Footer";
import Share from "@/app/components/Share";

export async function generateMetadata({ params }) {
    const post = await getPostBySlug(params.slug);

    if (!post) return {};

    return {
        title: post.titulo,
        description: post.excerpt || post.contenido?.slice(0, 160),
    };
}

export default async function PostPage({ params }) {
    const post = await getPostBySlug(params.slug);
    const recentPosts = (await getPosts()).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const categories = await getCategories();
    const relatedPost = recentPosts.filter((p) => p.category.name === post.category.name).slice(0, 4)

    if (!post) {
      return notFound();
    }

    return (
        <div className="bg-white dark:bg-[#3a384f] overflow-x-hidden">
        <Header />
        <article 
            className="w-full mx-auto mb-10 text-[#4B4870] dark:text-white"
            style={{
                '--category-color': `${post.category.colorcat}`,
            }}
        >
            {/* POST HEAD */}
            <div className="relative h-[70vh]">
                <BreadCrumbs
                    customClass={"absolute top-0 left-0 md:left-10 z-20 text-white pl-5" }
                    postCat={post.category}
                    postTitle={post.titulo}
                />
                <img
                    src={post.image}
                    alt={post.titulo}
                    className="w-full h-full object-cover bg-center shadow-md mb-6 absolute top-0 bottom-0 right-0"
                />
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.25)] z-10"></div>

                <div 
                    className="z-20 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-2 flex flex-col justify-center items-center"
                >
                    <CategoryBadge 
                        boxShadow={post.category.colorcat}
                        categoryName={post.category.name}
                        isLink={true} 
                        href={`/categories/${post.category.slug}`}
                    />
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">{post.titulo}</h1>
                    <div className="flex items-center gap-2 mt-2 mb-4">
                        <p className="text-[8px] sm:text-[10px] tracking-wide">
                            <span className="text-gray-300">By </span>
                            <span className="uppercase font-bold text-gray-100">{post.author?.name || "Unknown"}</span>
                        </p>
                        <span className="text-[8px] sm:text-[10px] text-gray-300"><CgEditBlackPoint /></span>
                        <p className="text-[8px] sm:text-[10px] text-gray-300">
                            {publicationDate(post.fecha)}
                        </p>
                    </div>
                    <Share linkPost={post.slug} />
                </div>
            </div>

            {/* POST CONTENT */}
            <div 
                className="sm:-mt-24 flex flex-col lg:flex-row gap-10 w-full sm:w-[90%] mx-auto relative z-30 bg-white dark:bg-[#3a384f] p-5 md:p-9 post-content"
            >
                <div className="lg:w-[75%] min-h-[1500px] flex flex-col justify-between">
                    <div 
                        className="w-full prose prose-custom dark:prose-invert" 
                        dangerouslySetInnerHTML={{ __html: marked(post.contenido) }} 
                    >
                    </div>
                    <div className="flex flex-col justify-start">
                        <div className="my-10">
                            <Share linkPost={post.slug} />
                        </div>
                        <div className="border-t border-gray-300 pb-25 pt-10 md:p-16 flex gap-4">
                            <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0">
                            </div>

                            <div className="">
                                <p className="text-[10px] tracking-wider text-gray-400">WRITTEN BY</p>
                                <h3 className="font-bold text-lg mb-2">{post.author?.name || "Unknown"}</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore assumenda doloremque blanditiis ad odio est necessitatibus a obcaecati quae? A officia illum mollitia laudantium voluptate. Saepe voluptatem adipisci error?</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-bold text-2xl">Related Posts</span>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {relatedPost.map((post, index) => (
                                    <Link 
                                        className="flex flex-col w-full group" 
                                        href={`/post/${post.slug}`} key={index}
                                        style={{
                                            '--category-color': `${post.category.colorcat}`,
                                        }}
                                    >
                                        <div 
                                            className="aspect-video overflow-hidden shadow-light dark:shadow-dark"
                                        >
                                            <img src={post.image} alt={post.titulo} className="w-full h-full object-cover"/>
                                        </div>
                                        <div className="mt-4">
                                            <CategoryBadge 
                                                boxShadow={post.category.colorcat}
                                                categoryName={post.category.name}
                                            />
                                        </div>
                                        <h3 
                                            className="text-base font-bold group-hover:text-custom transition-colors duration-300 ease-in-out"
                                        >
                                            {post.titulo}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-[10px] tracking-wide">
                                                <span className="text-gray-400">By </span>
                                                <span className="uppercase font-bold">{post.author?.name || "Unknown"}</span>
                                            </p>
                                            <p className="text-[12px] text-gray-400">
                                                {publicationDate(post.fecha)}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
                
                {/* SIDEBAR */}
                <div className="w-full lg:w-[25%] min-w-[280px] md:min-w-[350px]">
                    <Sidebar 
                        recentPosts={recentPosts.slice(0, 4)}
                        categories={categories}
                        postsLength={recentPosts}
                    />
                </div>
            </div>
        </article>
        <Footer />
      </div>
    );
}
