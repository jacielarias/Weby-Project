"use client";
import { useState } from "react";

// Components
import ListCategories from "./ListCategories"
import DarkModeBtn from "./DarkModeBtn"
import MenuResponsive from "./MenuResponsive";
import SearchBtn from "./SearchBtn";
import Logo from "./Logo";

const Header = ({ categories }) => {
    const [search, setSearch] = useState("");

    const searcher = (e) => {
        setSearch(e.target.value);
        console.log(search);
    };

    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleDateString("en-EN", { month: "long" });
    const year = today.getFullYear();

    return (
        <>
            <header 
                className="z-20 w-full h-[10vh] md:h-[15vh] flex justify-between items-center shadow-md text-[#4B4870] dark:text-white px-6 md:px-12"
            >
                <Logo textSize={"text-4xl md:text-6xl"} />

                <nav className="hidden lg:block">
                    <ListCategories categories={categories} customClass={"flex justify-center items-center gap-10 text-lg font-semibold"} hiddenGat={"hidden"}/>
                </nav>

                <div className="h-full flex justify-center items-center gap-5 py-2">
                    <DarkModeBtn />
                    <SearchBtn 
                        search={search}
                        searcher={searcher}
                        categories={categories}     
                    />
                    <div className="items-center gap-2 ml-6 hidden lg:flex h-[40%] pl-5 border-l-[1px] border-gray-300">
                        <div className="text-3xl font-bold leading-none">{day}</div>
                        <div className="flex flex-col leading-none text-xs">
                            <span className="capitalize">{month}</span>
                            <span>{year}</span>
                        </div>
                    </div>
                    <MenuResponsive 
                        categories={categories}     
                    />
                </div>
            </header>
        </>
    )
}

export default Header
