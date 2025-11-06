// src/hooks/useSmartFetch.js
import { useState, useEffect } from "react";
import axios from "axios";

export const useSmartFetch = (url, options = {}) => {
    const { method = "GET", body = null, headers = {}, toaster = false, auto = true } = options;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(auto);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios({ method, url, headers, ...(body && { data: body }) });
            setData(res.data);
            if (toaster) alert(`✅ Success: ${res.data?.message || "Request successful"}`);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            if (toaster) alert(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (auto) fetchData();
    }, [url]);

    return { data, loading, error, refetch: fetchData };
};
