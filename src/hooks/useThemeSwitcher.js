// src/hooks/useThemeSwitcher.js
import { useEffect, useState } from "react";

export const useThemeSwitcher = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.classList.add(savedTheme);
        setTheme(savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };

    return { theme, toggleTheme };
};
