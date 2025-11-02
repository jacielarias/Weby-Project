"use client"
import { useState, useEffect } from "react";

// Icons
import { CiDark, CiBrightnessDown } from "react-icons/ci";

const DarkModeBtn = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    useEffect(() => {
        const savedMode = localStorage.getItem("theme");
        if (savedMode === "dark") setDarkMode(true);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);
    
    return (
        <button
            onClick={toggleDarkMode}
            className="flex justify-center items-center rounded-full ml-4 text-[28px] h-9 w-9 md:h-10 md:w-10 cursor-pointer hover:bg-[rgba(190,190,190,0.2)]"
            aria-label="Alternar modo oscuro"
        >
            {darkMode ? <CiBrightnessDown /> : <CiDark />}
        </button>
    )
}

export default DarkModeBtn;