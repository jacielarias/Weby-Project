"use client";
import { useState, useMemo } from "react";

// Components
import ExplorePostTwoColumns from "./ExplorePostTwoColumns";
import ExplorePostSingleColumn from "./ExplorePostSingleColumn";
import ExplorePostFilterByCat from "./ExplorePostFilterByCat";
import Sidebar from "./Sidebar";

const FeedClient = ({ javascript_posts, react_posts, recentPosts, categories }) => {
    const [activeCategory, setActiveCategory] = useState("CSS");

    const selectCategory = (cat) => {
        setActiveCategory(cat);
    };

    // Filter post by selected category
    const filteredPosts = useMemo(() => {
        return recentPosts.filter(
            (post) => post.category?.name === activeCategory
        );
    }, [activeCategory, recentPosts]);

    return (
        <main className="flex flex-col lg:flex-row gap-5 w-[95%] mx-auto">
            <div className="w-full lg:w-[75%] grid gap-40">
                <ExplorePostTwoColumns 
                    explorePosts={javascript_posts}
                    title={"JavaScript"}
                    subTitle={"Learn JavaScript"}
                />
                <ExplorePostSingleColumn 
                    explorePosts={react_posts}
                    title={"React"}
                    subTitle={"Learn React"}
                />
                <ExplorePostFilterByCat 
                    explorePostByCat={filteredPosts}
                    categories={categories}
                    activeCategory={activeCategory}
                    selectCategory={selectCategory}
                />
            </div>
            <aside className="w-full lg:w-[25%]">
                <Sidebar 
                    recentPosts={recentPosts.slice(0, 4)}
                    categories={categories}
                    postsLength={recentPosts}
                />
            </aside>
        </main>


    );
};

export default FeedClient;
