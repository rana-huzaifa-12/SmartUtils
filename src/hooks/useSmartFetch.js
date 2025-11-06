// src/hooks/useSmartFetch.js
import { useState, useEffect, useRef } from "react";
import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";

// ✅ This renders ToastContainer only once globally
let toastContainerAdded = false;
const ensureToastContainer = () => {
    if (toastContainerAdded) return;

    const div = document.createElement("div");
    document.body.appendChild(div);

    const root = createRoot(div);
    // ✅ Use React.createElement instead of JSX
    root.render(React.createElement(ToastContainer, {}));

    toastContainerAdded = true;
};

export const useSmartFetch = (url, options = {}) => {
    const {
        method = "GET",
        body = null,
        headers = {},
        toaster = false,
        auto = true,
        successMsg = "Request successful ✅",
        errorMsg = "An error occurred ❌",
        toastConfig = {},
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
                ...(body && { data: body }),
            });

            setData(res.data);
            setError(null);

            if (toaster) {
                ensureToastContainer();
                toast.success(res.data?.message || successMsg, {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored",
                    ...toastConfig,
                });
            }

            console.log("✅ Fetched:", res.data);
        } catch (err) {
            const msg = err.response?.data?.message || err.message;
            setError(msg);

            if (toaster) {
                ensureToastContainer();
                toast.error(`${errorMsg}: ${msg}`, {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored",
                    ...toastConfig,
                });
            }

            console.error("❌ Fetch Error:", msg);
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
