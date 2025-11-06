// src/hooks/useSmartFetch.js
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createRoot } from "react-dom/client";
import React from "react";

let toastContainerInjected = false; // ensure ToastContainer is added only once

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

    // ✅ Inject ToastContainer automatically once
    useEffect(() => {
        if (toaster && !toastContainerInjected) {
            const toastDiv = document.createElement("div");
            document.body.appendChild(toastDiv);

            const root = createRoot(toastDiv);
            root.render(
                React.createElement(ToastContainer, {
                    position: "top-right",
                    theme: "colored",
                })
            );

            toastContainerInjected = true;
        }
    }, [toaster]);

    // 🔥 Fetch logic
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
                    autoClose: 2000,
                });
            }

            console.log("✅ SmartFetch Success:", res.data);
        } catch (err) {
            const msg = err.response?.data?.message || err.message;
            setError(msg);

            if (toaster) {
                toast.error(`❌ ${msg}`, {
                    autoClose: 3000,
                });
            }

            console.error("❌ SmartFetch Error:", msg);
        } finally {
            setLoading(false);
        }
    };

    // 🧠 Auto fetch only once (prevent duplicate in Strict Mode)
    useEffect(() => {
        if (auto && !hasFetched.current) {
            hasFetched.current = true;
            fetchData();
        }
    }, [url]);

    return { data, loading, error, refetch: fetchData };
};
