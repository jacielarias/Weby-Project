import { getCategoriesBySlug } from "@/lib/get-categories-by-slug";
import { getPosts } from "@/lib/get-posts";
import getPostsByCategorySlug from "@/lib/get-posts-by-category-slug";
import getCategories from "@/lib/get-categories";
import Link from "next/link";

// Components
import Header from "@/app/components/HeaderClient";
import BreadCrumbs from "@/app/components/Breadcrumbs";
import Sidebar from "@/app/components/Feed/Sidebar";
import Footer from "@/app/components/Footer";
import PostItem from "@/app/components/PostItem";

export async function generateMetadata({ params  }) {
    const category = await getCategoriesBySlug(params.slug);

    if (!category) return {};

    return {
        title: category.name,
        description: category.description,
    };
}

export default async function CategoryPage({ params, searchParams }) {
    const category = await getCategoriesBySlug(params.slug);
    const recentPosts = (await getPosts()).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const categories = await getCategories();

    const currentPage = parseInt(searchParams?.page || "1", 10);
    const pageSize = 6;

    const { posts: selectedCategoryPosts, pagination } = await getPostsByCategorySlug(params.slug, currentPage, pageSize);
    
    if (!category) {
      return notFound();
    }

    return (
        <div className="bg-white dark:bg-[#3a384f] overflow-x-hidden">
            <Header />
                <main             
                    className="w-full mx-auto p-2 md:p-5 mb-10 text-[#4B4870] dark:text-white min-h-[1200px]"
                    style={{
                        '--category-color': `${category.colorcat}`,
                    }}  
                >
                    <div className="w-full sm:w-[95%] mb-10 md:mb-20 mx-auto text-[#4B4870] dark:text-white pl-3 md:pl-0">
                        <BreadCrumbs 
                            category={category.name}
                        />
                        <h1 className="font-bold text-4xl md:text-5xl mt-5 md:mt-10 mb-3">{category.name}</h1>
                        <p className="text-xl text-gray-400">{category.description}</p>
                    </div>
                    <section className="flex flex-col lg:flex-row gap-5 w-full sm:w-[95%] mx-auto z-30 bg-white dark:bg-[#3a384f] overflow-hidden">
                        <div className="w-full lg:w-[75%] flex flex-col min-h-[1500px] mb-40 lg:mb-0">
                            <div className="grid grid-cols-1 gap-6">
                                {selectedCategoryPosts.length > 0 ? (
                                    selectedCategoryPosts.map((post, index) => (
                                        <PostItem
                                            postLink={post.slug}
                                            key={index}
                                            colorcat={post.category?.colorcat}
                                            postCategoryName={post.category?.name}
                                            postTitle={post.titulo}
                                            postImg={post.image}
                                            postDate={post.fecha}
                                            postAuthor={post.author}
                                            postContent={post.contenido}
                                        />
                                    ))
                                ) : (
                                    <p>No posts found in this category.</p>
                                )}
                            </div>
                            {pagination?.pageCount > 1 && (
                                <div className="flex justify-center gap-3 mt-10">
                                    {Array.from({ length: pagination.pageCount }).map((_, i) => {
                                        const pageNumber = i + 1;
                                        return (
                                        <Link
                                            key={pageNumber}
                                            href={`/categories/${params.slug}?page=${pageNumber}`}
                                            className={`h-[50px] w-[50px] flex justify-center items-center ${
                                            pageNumber === currentPage
                                                ? 'bg-custom text-white shadow-light dark:shadow-dark'
                                                : 'bg-white dark:bg-[#2e2c3e] border border-gray-300'
                                            }`}
                                        >
                                            {pageNumber}
                                        </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
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
    )
}