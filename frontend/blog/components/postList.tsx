/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    createDate: string;
    updateDate: string;
    image: string | null;
}

export default function PostList({ category }: { category: string }) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 6; // 한 페이지 6개

    const fetchPosts = async () => {
        try {
            const res = await api.get(
                `/api/posts?page=${page}&size=${pageSize}&category=${category}`
            );
            setPosts(res.data.data); // 리스트
            setTotalPages(res.data.totalPages); // 총 페이지 수
        } catch (err) {
            console.log("게시물 불러오기 실패", err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(
                    `/api/posts?page=1&size=6&category=${category}`
                );
                setPosts(res.data.data); // ✅ 비동기 후 setState
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">게시판</h1>

            {/* 게시물 목록 */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 cursor-pointer">
                {posts.map((post) => (
                    <Link key={post.id} href={`../posts/${post.id}`}>
                        <li className="border rounded-xl shadow-md p-4 hover:shadow-lg transition">
                            <img
                                src={post.image ?? ""}
                                alt={post.title}
                                className="w-full h-40 object-cover rounded-md mb-3"
                            />

                            <h2 className="text-lg font-bold mb-1">
                                {post.title}
                            </h2>
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {post.content}
                            </p>

                            <div className="flex justify-between mt-4 text-xs text-gray-500">
                                <span>{post.category}</span>
                                <span>
                                    {new Date(
                                        post.createDate
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>

            {/* 페이지네이션 */}
            <div className="flex justify-center gap-3 mt-8">
                {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                        <button
                            key={pageNum}
                            className={`px-4 py-1 rounded-lg border cursor-pointer ${
                                page === pageNum
                                    ? "bg-black text-white"
                                    : "bg-white text-black hover:bg-gray-200"
                            }`}
                            onClick={() => setPage(pageNum)}
                        >
                            {pageNum}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
