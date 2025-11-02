"use client"
import { useState } from "react"

// Icons
import { PiEqualsThin, PiXThin } from "react-icons/pi";

// Components
import ListCategories from "./ListCategories";
import Socials from "./Socials";

const MenuResponsive = ({ categories = [] }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const today = new Date()
    const day = today.getDate()
    const month = today.toLocaleDateString("es-ES", { month: "long" })
    const year = today.getFullYear()

    return (
        <>
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden text-white text-[22px] md:text-2xl bg-custom h-9 w-9 md:h-10 md:w-10 flex justify-center items-center rounded-full cursor-pointer shadow-light dark:shadow-dark">
                <PiEqualsThin />
            </button>
            <div className={`fixed z-50 top-0 right-0 w-3/4 max-w-sm h-screen bg-white dark:bg-[#3a384f] shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex justify-between items-center px-8 py-5 border-b border-gray-300 dark:border-gray-600">
                    <button onClick={() => setIsMenuOpen(false)} className="text-4xl">
                        <PiXThin />
                    </button>
                    <div className="text-right text-sm leading-tight flex justify-center items-center gap-2 border-l-[1px] border-gray-300 pl-5">
                        <div className="text-3xl font-bold leading-none">{day}</div>
                        <div className="flex flex-col leading-none text-xs">
                            <span className="capitalize">{month}</span>
                            <span>{year}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full flex items-center flex-col">
                    <ListCategories categories={categories} customClass="mt-40 flex flex-col justify-center items-center gap-4 text-3xl" />

                    <div className="py-5 border-t-[1px] border-gray-300 absolute bottom-4 w-full">
                        <Socials customClass={"flex justify-center items-center gap-10 text-xl"} />
                    </div>
                </div>
            </div>

            {/* Fondo oscuro al abrir menú */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-[rgba(0,0,0,0.2)] bg-opacity-40 z-30"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}
        </>
    )
}

export default MenuResponsive;