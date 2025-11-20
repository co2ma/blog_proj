"use client";
import type { Metadata } from "next";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios
            .get(
                "http://localhost:9090/api/posts/recently?category=review&limit=3"
            )
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error("DB에서 조회가 실패 했습니다.", error);
            });
    }, []);
    return (
        <div>
            <div className="w-full h-48 bg-linear-to-r from-green-50 to-purple-200 flex justify-center items-center">
                <span className="text-lg font-semibold text-center">
                    <span className="text-3xl">"Hello, visitor!\n"</span>
                    <br />
                    <br />
                    음악에 대한 이야기, 개발 관련, 개인적 생각등을 투고하는 곳
                </span>
            </div>
            <div className="container mx-auto m-4 mt-15 px-4">
                <span className="font-semibold text-2xl">최근 리뷰 곡</span>
                <div className="bg-gray-100 p-4 mt-8 mb-8">
                    <ul className="flex space-x-8 list-none p-0">
                        {reviews.map((review) => (
                            <li
                                key={review.id}
                                className="p-2 bg-blue-500 text-white rounded"
                            >
                                <div className="grid grid-cols-5 gap-4">
                                    <div className="col-span-2 bg-blue-300 p-4 text-white">
                                        <div className="aspect-square bg-blue-500 overflow-hidden">
                                            <img
                                                src="your-image-url.jpg"
                                                alt="1:1 Photo"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="flex items-center justify-center h-full text-white text-2xl font-bold">
                                                이미지 (2/5 너비)
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-3 flex flex-col gap-4">
                                        <div className="bg-red-400 p-2 text-white">
                                            {review.title}
                                        </div>
                                        <div className="bg-red-600 p-2 text-white">
                                            {review.content.substring(0, 50)}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <span className="font-semibold text-2xl">최근 작성 글</span>
                <div className="bg-gray-100 p-4 mt-8 mb-8">
                    <ul className="flex space-x-8 list-none p-0">
                        {reviews.map((review) => (
                            <li
                                key={review.id}
                                className="p-2 bg-blue-500 text-white rounded"
                            >
                                {review.title}{" "}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
