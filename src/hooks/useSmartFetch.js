// src/hooks/useSmartFetch.js
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useSmartFetch = (url, options = {}) => {
    const {
        method = "GET",
        body = null,
        headers = {},
        toaster = false,
        auto = true,
    } = options;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(auto);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false); // prevent double fetch in Strict Mode

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios({
                method,
                url,
                headers,
                ...(body && { data: body }),
            });

            setData(res.data);
            setError(null);

            if (toaster) {
                toast.success(res.data?.message || "Request successful ✅", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored",
                });
            }

            console.log("✅ Fetched:", res.data);
        } catch (err) {
            const msg = err.response?.data?.message || err.message;
            setError(msg);

            if (toaster) {
                toast.error(`Error: ${msg}`, {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored",
                });
            }

            console.error("❌ Fetch Error:", msg);
        } finally {
            setLoading(false);
        }
    };

    // Fetch only once even in React Strict Mode
    useEffect(() => {
        if (auto && !hasFetched.current) {
            hasFetched.current = true;
            fetchData();
        }
    }, [url]);

    return { data, loading, error, refetch: fetchData };
};
