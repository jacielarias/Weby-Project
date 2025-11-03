export const dynamic = 'force-dynamic';

import getSearchResults from "@/lib/get-search-results";
import Link from "next/link";
import { getPosts } from "@/lib/get-posts";
import getCategories from "@/lib/get-categories";

// Components
import PostItem from "../components/PostItem";
import BreadCrumbs from "../components/Breadcrumbs";
import Header from "../components/HeaderClient";
import Sidebar from "../components/Feed/Sidebar";
import Footer from "../components/Footer";

export default async function ResultsPage({ searchParams }) {
    const recentPosts = (await getPosts()).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const categories = await getCategories();

    const searchTerm = searchParams?.query || "";
    const currentPage = parseInt(searchParams?.page || "1", 10);
    const pageSize = 6;

const { posts = [], pagination = { pageCount: 1 } } =
  (await getSearchResults({ searchInput: searchTerm, page: currentPage, pageSize })) || {};

    return (
        <div className="bg-white dark:bg-[#3a384f] overflow-x-hidde">
            <Header />
            <main             
                className="w-full mx-auto p-2 md:p-5 mb-10 text-[#4B4870] dark:text-white min-h-[1200px]"
            >
            <div className="w-full sm:w-[95%] mb-10 md:mb-20 mx-auto text-[#4B4870] dark:text-white  pl-3 md:pl-0">
               <BreadCrumbs />
               <h1 className="text-4xl md:text-5xl font-bold mt-5 md:mt-10 mb-3">Results for: "{searchTerm}"</h1>
            </div>
            <section className="flex flex-col lg:flex-row gap-5 w-full sm:w-[95%] mx-auto z-30 bg-white dark:bg-[#3a384f] overflow-hidden">
                {posts.length === 0 ? (
                    <div className="w-full lg:w-[75%] min-h-[600px]">
                        <p>No results found.</p>
                    </div>
                ) : (
                    <div className="w-full lg:w-[75%] min-h-[1500px] mb-40 lg:mb-0">
                        <div className="grid grid-cols-1 gap-6">
                            {posts.map((post, index) => (
                                <PostItem 
                                    postLink={post.slug}
                                    key={index}
                                    colorcat={post.category.colorcat}
                                    postCategoryName={post.category.name}
                                    postTitle={post.titulo}
                                    postImg={post.image}
                                    postDate={post.fecha}
                                    postAuthor={post.author}
                                    postContent={post.contenido}
                                />
                            ))}
                        </div>

                        {/* PAGINACIÓN */}
                        {pagination?.pageCount > 1 && (
                        <div className="flex justify-center gap-2 mt-10">
                            {Array.from({ length: pagination.pageCount }).map((_, index) => {
                                const page = index + 1;
                                return (
                                    <Link
                                        key={page}
                                        href={`/results?query=${encodeURIComponent(searchTerm)}&page=${page}`}
                                        className={`h-[50px] w-[50px] flex justify-center items-center ${
                                            page === currentPage
                                                ? 'bg-custom text-white shadow-light dark:shadow-dark'
                                            : 'bg-white dark:bg-[#2e2c3e] border border-gray-300'
                                        }`}
                                    >
                                        {page}
                                    </Link>
                                );
                            })}
                        </div>
                        )}
                    </div>
                )}
                <div className="w-full lg:w-[25%] min-w-[280px] md:min-w-[340px]">
                    <Sidebar 
                        recentPosts={recentPosts.slice(0, 4)}
                        categories={categories}
                        postsLength={recentPosts}
                    />
                </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
