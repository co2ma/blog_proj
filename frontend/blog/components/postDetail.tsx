"use client";

import api from "@/lib/api";
import Link from "next/link";
import { useState } from "react";

interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    createDate: string;
    updateDate: string;
    image: string | null;
}

export default function PostDetail({ post }: { post: Post }) {
    const [password, setPassword] = useState("");

    const handleDelete = async () => {
        try {
            const res = await api.delete(`/api/posts/${post.id}`, {
                headers: {
                    "X-API-KEY": password, // Header에 password 전달
                },
            });

            alert("삭제되었습니다.");
            window.location.href = "/";
        } catch (error) {
            console.log(error, post.id);
            alert("비밀번호가 틀렸습니다.");
        }
    };
    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            {/* Title */}
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

                <Link
                    href={`/write?id=5`}
                    className="p-3 block h-full bg-gray-100 rounded-2xl 
                    hover:bg-gray-300 transition-colors"
                >
                    수정
                </Link>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between text-gray-500 text-sm mb-6">
                <span>카테고리: {post.category}</span>
                <span>{new Date(post.createDate).toLocaleDateString()}</span>
            </div>

            {/* Image */}
            {post.image && (
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-48 max-h-[400px] object-cover rounded-2xl mb-8 border border-amber-950"
                />
            )}

            {/* Content */}
            <div className="text-lg leading-8 whitespace-pre-line mb-10">
                {post.content}
            </div>

            {/* Delete Section */}
            <div className="border-t pt-6 mt-10">
                <h2 className="text-xl font-semibold mb-3">게시글 삭제</h2>

                <div className="flex items-center gap-3">
                    <input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-amber-700"
                    />
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer"
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
}
