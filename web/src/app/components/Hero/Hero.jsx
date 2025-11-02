import { getPosts } from "@/lib/get-posts"
import getPostsByCategory from "@/utils/getPostsByCategory";

// Components
import Slider from "./Slider";
import MiniSlider from "./MiniSlider";

const Hero = async () => {
    const miniSlider = (await getPosts())
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, 5);

    const slider = (await getPostsByCategory("CSS"))
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, 3);

    return (
        <div className="min-w-[320px] w-[95%] relative gap-5 lg:h-[85dvh] grid mx-auto text-white">
            <MiniSlider 
                posts={miniSlider}
            />
            <Slider 
                posts={slider}
            />
        </div>
    )
};

export default Hero;