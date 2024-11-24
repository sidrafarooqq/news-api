"use client";

import { useState, useEffect } from "react";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/external")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setPosts(data.data);
                } else {
                    setError(data.message);
                }
            })
            .catch(() => setError("An unexpected error occurred."))
            .finally(() => setLoading(false));
    }, []);

    return (
        <main className="min-h-screen bg-gray-700 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Posts</h1>
                {loading ? (
                    <p className="text-gray-500">Loading posts...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : posts.length > 0 ? (
                    <ul className="space-y-2">
                        {posts.map((post: { id: number; title: string }) => (
                            <li
                                key={post.id}
                                className="p-4 bg-gray-100 border border-gray-300 rounded-md"
                            >
                                {post.title}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No posts available.</p>
                )}
            </div>
        </main>
    );
}


