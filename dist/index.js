// src/hooks/useSmartFetch.js
import { useState, useEffect } from "react";
import axios from "axios";
var useSmartFetch = (url, options = {}) => {
  const { method = "GET", body = null, headers = {}, toaster = false, auto = true } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(auto);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios({ method, url, headers, ...body && { data: body } });
      setData(res.data);
      if (toaster) {
        alert(`\u2705 Success: ${res.data?.message || "Request successful"}`);
        console.log(`\u2705 Success: ${res.data?.message || "Request successful"}`);
      }
      ;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      if (toaster) {
        alert(`\u274C Error: ${err.message}`);
        console.log(`\u274C Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (auto) fetchData();
  }, [url]);
  return { data, loading, error, refetch: fetchData };
};

// src/hooks/useThemeSwitcher.js
import { useEffect as useEffect2, useState as useState2 } from "react";
var useThemeSwitcher = () => {
  const [theme, setTheme] = useState2("light");
  useEffect2(() => {
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
export {
  useSmartFetch,
  useThemeSwitcher
};
