import { getPosts } from "@/lib/get-posts";

import TrendingSlider from "./TrendingSlider";

const TrendingWrapper = async () => {

    const trending = await getPosts();

    return <TrendingSlider posts={trending} />
}

export default TrendingWrapper;