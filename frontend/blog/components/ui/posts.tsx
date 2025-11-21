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

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // 2025-11-21 형식
}

export default function Posts({ reviews }: { reviews: Array<Song> }) {
    return (
        <ul className="w-full">
            {reviews.map((review: Song) => (
                <Link key={review.id} href={`/posts/${review.id}`}>
                    <li className="flex justify-between items-center p-3 border-b border-gray-300 bg-white text-black hover:bg-gray-200 transition cursor-pointer">
                        <span className="font-semibold">{review.title}</span>
                        <span className="text-sm text-gray-500">
                            {formatDate(review.createDate)}
                        </span>
                    </li>
                </Link>
            ))}
        </ul>
    );
}
