/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

interface Song {
    id: number;
    title: string;
    content: string;
    category: "review" | "notice" | string;
    createDate: string;
    updateDate: string;
    image: string;
}

export default function Songs({ reviews }: { reviews: Array<Song> }) {
    return reviews.map((review: Song) => (
        <li
            key={review.id}
            className="p-2 bg-gray-100 text-white rounded-2xl  hover:bg-gray-200 transition cursor-pointer"
        >
            <Link href={`/review/${review.id}`} className="block w-full h-full">
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
                            {review.content.substring(0, 50)}
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    ));
}
