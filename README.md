# 🧠 SmartUtils

> **Smart, one-line utilities for web developers.**

`SmartUtils` provides modern, developer-friendly hooks and helpers for faster web development — starting with **useSmartFetch**, a powerful custom React hook for API fetching with built-in **loading**, **error handling**, **toasts**, and **auto re-fetching**.

---

## 🚀 Installation

```bash
npm install smartutils
or with yarn:

bash
Copy code
yarn add smartutils
⚡ Features
✅ One-line API fetching
✅ Automatic loading and error states
✅ Toast notifications (success & error)
✅ Re-fetch support
✅ Works with axios under the hood
✅ Lightweight and intuitive

🧩 Hook: useSmartFetch
🔹 Import
js
Copy code
import { useSmartFetch } from "smartutils";
🔹 Basic Usage
jsx
Copy code
import React from "react";
import { useSmartFetch } from "smartutils";

function App() {
  const { data, loading, error } = useSmartFetch("https://randomuser.me/api/?results=5", {
    auto: true,
    toaster: true,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {data?.results?.map((user, i) => (
          <li key={i}>{user.name.first} {user.name.last}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
🔹 Manual Fetch Example
jsx
Copy code
const { data, loading, error, refetch } = useSmartFetch("/api/users", {
  method: "POST",
  body: { name: "Huzaifa" },
  toaster: true,
  auto: false, // 👈 disables auto fetching
});

return (
  <div>
    <button onClick={refetch}>Fetch Users</button>
    {loading && <p>Loading...</p>}
    {error && <p>Error: {error}</p>}
    {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
  </div>
);
⚙️ Options
Option	Type	Default	Description
method	string	"GET"	HTTP method (GET, POST, etc.)
body	object	null	Request body for POST/PUT
headers	object	{}	Custom request headers
auto	boolean	true	Auto-fetch when component mounts
toaster	boolean	false	Show toast notifications
successMsg	string	"Request successful ✅"	Custom success message
errorMsg	string	"An error occurred ❌"	Custom error message
toastConfig	object	{}	Extra config for toast (e.g. position, autoClose)

🎨 Custom Toast Messages
You can fully control your toast notifications with toastConfig:

jsx
Copy code
useSmartFetch("/api/data", {
  toaster: true,
  successMsg: "Data Loaded Successfully!",
  errorMsg: "Something went wrong!",
  toastConfig: {
    position: "bottom-left",
    autoClose: 4000,
    theme: "dark",
  },
});
🧠 Returned Values
Value	Type	Description
data	any	API response data
loading	boolean	Fetching state
error	string | null	Error message if request fails
refetch	function	Function to trigger fetch manually

🪄 Example Response Logging
The hook automatically logs data and errors in the console:

javascript
Copy code
✅ Fetched: { ...responseData }
❌ Fetch Error: Network Error
🧱 Under the Hood
Uses Axios for API calls

Uses React Toastify for user-friendly toasts

Automatically injects <ToastContainer /> globally (no need to add it manually)

🧑‍💻 Developed By
Rana Huzaifa
🌐 GitHub: @rana-huzaifa-12
📦 NPM: smartutils

🪪 License
This project is licensed under the MIT License.

vbnet
Copy code
MIT License

Copyright (c) 2025 Rana Huzaifa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
...
⭐ Support
If you find this library useful, please star ⭐ the repo and share it with other developers!

Built with ❤️ by Rana Huzaifa

yaml
Copy code

---

Would you like me to **add code syntax highlighting badges (React, Axios, Toastify)** and a **GIF example preview** section too (for npm visuals)? It makes the package look more polished and professional.






