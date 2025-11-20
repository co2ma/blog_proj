/* eslint-disable @next/next/no-img-element */

"use client";
import type { Metadata } from "next";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:9090/api/posts/recently?category=review")
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
                <span className="font-semibold text-3xl">최근 리뷰 곡</span>
                <div className="p-4 mt-8 mb-8">
                    <ul
                        className="
                        flex flex-col space-y-6         /* 모바일: 세로 배치 */
                        md:flex-row md:space-y-0 md:space-x-8   /* 데스크탑: 가로 배치 */
                        list-none p-0
                    "
                    >
                        {reviews.map((review) => (
                            <li
                                key={review.id}
                                className="p-2 bg-gray-100 text-white rounded-2xl  hover:bg-gray-200 transition cursor-pointer"
                            >
                                <Link
                                    href={`/review/${review.id}`}
                                    className="block w-full h-full"
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className=" w-32 h-32 col-span-2 bg-black p-2 text-white rounded-2xl">
                                            <div className="aspect-square bg-blue-500 overflow-hidden rounded-2xl">
                                                <img
                                                    src={review.image}
                                                    alt="1:1 Photo"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-2 flex flex-col ">
                                            <div className="text-3xl p-2 text-black font-semibold">
                                                {review.title}
                                            </div>
                                            <div className="p-2 text-blue-900">
                                                {review.content.substring(
                                                    0,
                                                    50
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <span className="font-semibold text-3xl">최근 작성 글</span>
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
