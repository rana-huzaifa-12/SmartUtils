// src/hooks/useSmartFetch.js
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
var useSmartFetch = (url, options = {}) => {
  const {
    method = "GET",
    body = null,
    headers = {},
    toaster = false,
    auto = true
  } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(auto);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios({
        method,
        url,
        headers,
        ...body && { data: body }
      });
      setData(res.data);
      setError(null);
      if (toaster) {
        toast.success(res.data?.message || "Request successful \u2705", {
          position: "top-right",
          autoClose: 2e3,
          theme: "colored"
        });
      }
      console.log("\u2705 Fetched:", res.data);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setError(msg);
      if (toaster) {
        toast.error(`Error: ${msg}`, {
          position: "top-right",
          autoClose: 3e3,
          theme: "colored"
        });
      }
      console.error("\u274C Fetch Error:", msg);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (auto && !hasFetched.current) {
      hasFetched.current = true;
      fetchData();
    }
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
