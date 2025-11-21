/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect, useState } from "react";
import Songs from "@/components/ui/songs";
import Toast from "@/components/toast";
import api from "@/lib/api";

interface Song {
    id: number;
    title: string;
    content: string;
    category: "review" | "notice" | string;
    createDate: string;
    updateDate: string;
    image: string | null;
}

export default function Home() {
    const [reviews, setReviews] = useState([]);

    const [toast, setToast] = useState({ message: "", type: "" });

    useEffect(() => {
        const stored = localStorage.getItem("toast");
        if (stored) {
            const parsed = JSON.parse(stored);

            setTimeout(() => {
                setToast(parsed);
                localStorage.removeItem("toast");
            }, 0);
        }
    }, []);

    useEffect(() => {
        api.get("/api/posts/recently?category=review")
            .then((response) => {
                setReviews(response.data);
                console.log(typeof reviews);
            })
            .catch((error) => {
                console.error("DB에서 조회가 실패 했습니다.", error);
            });
    }, []);
    return (
        <div className="relative">
            <div className="w-full h-48 bg-linear-to-r from-green-50 to-purple-200 flex justify-center items-center">
                <span className="text-lg font-semibold text-center">
                    <span className="text-3xl">"Hello, visitor!\n"</span>
                    <br />
                    <br />
                    음악에 대한 이야기, 개발 관련, 개인적 생각등을 투고하는 곳
                </span>
            </div>
            <div className="container mx-auto m-4 mt-15 px-4">
                <span className="font-semibold text-3xl">최근 리뷰 곡</span>
                <div className="p-4 mt-8 mb-8">
                    <ul
                        className="
                        flex flex-col space-y-6         /* 모바일: 세로 배치 */
                        md:flex-row md:space-y-0 md:space-x-8   /* 데스크탑: 가로 배치 */
                        list-none p-0
                    "
                    >
                        <Songs reviews={reviews} />
                    </ul>
                </div>
                <span className="font-semibold text-3xl">최근 작성 글</span>
                <div className="bg-gray-100 p-4 mt-8 mb-8">
                    <ul className="flex flex-col space-x-8 list-none p-0 gap-4">
                        {reviews.map((review: Song) => (
                            <li
                                key={review.id}
                                className="p-2 bg-gray-100 text-black rounded"
                            >
                                {review.title}{" "}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {toast.message && (
                <Toast message={toast.message} type={toast.type as any} />
            )}
        </div>
    );
}
