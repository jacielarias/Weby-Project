export const dynamic = 'force-dynamic';

// Components
import Header from "./components/HeaderClient";
import Hero from "./components/Hero/Hero";
import CategoriesSection from "./components/CategoriesSection";
import Feed from "./components/Feed/Feed";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="bg-white dark:bg-[#3a384f] w-full min-h-screen overflow-x-hidden min-w-[320px] relative">
      <Header />
      <div className="w-full m-auto max-w-[1550px] mb-20">
        <Hero />
        <CategoriesSection />
        <Feed />
      </div>
      <Footer />
    </div>
  );
}
