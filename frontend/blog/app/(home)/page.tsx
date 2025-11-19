import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "main",
};

export default function Home() {
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
                <div className="bg-gray-100 p-4 mt-4 mb-12">
                    <ul className="flex space-x-8 list-none p-0">
                        <li className="p-2 bg-blue-500 text-white rounded">
                            항목 1
                        </li>
                        <li className="p-2 bg-blue-500 text-white rounded">
                            항목 2
                        </li>
                        <li className="p-2 bg-blue-500 text-white rounded">
                            항목 3
                        </li>
                        <li className="p-2 bg-blue-500 text-white rounded">
                            항목 4
                        </li>
                        <li className="p-2 bg-blue-500 text-white rounded">
                            항목 5
                        </li>
                    </ul>
                </div>
                <span className="font-semibold text-2xl">최근 작성 글</span>
                <div className="bg-gray-100 p-4 mt-4 mb-12">
                    <ul className="flex space-x-8 list-none p-0">
                        <li className="p-2 bg-blue-500 text-white rounded">
                            항목 1
                        </li>
                        <li className="p-2 bg-blue-500 text-white rounded">
                            항목 2
                        </li>
                        <li className="p-2 bg-blue-500 text-white rounded">
                            항목 3
                        </li>
                        <li className="p-2 bg-blue-500 text-white rounded">
                            항목 4
                        </li>
                        <li className="p-2 bg-blue-500 text-white rounded">
                            항목 5
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
