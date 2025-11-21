"use client";

import { useState } from "react";

export default function Write() {
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        content: "",
        category: "",
        password: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        // 서버로 전송 로직 작성 예정
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-10 max-w-2xl mx-auto p-6 border rounded-xl space-y-5 shadow-md bg-white"
        >
            <h1 className="text-2xl font-bold text-center">글쓰기</h1>

            {/* 타이틀 */}
            <div>
                <label className="block font-medium mb-1">타이틀</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="제목을 입력하세요"
                    className="w-full border p-2 rounded-md"
                />
            </div>

            {/* 타이틀 이미지 */}
            <div>
                <label className="block font-medium mb-1">
                    타이틀 이미지 URL
                </label>
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border p-2 rounded-md"
                />
            </div>

            {/* 본문 */}
            <div>
                <label className="block font-medium mb-1">본문</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={8}
                    placeholder="내용을 입력하세요"
                    className="w-full border p-2 rounded-md"
                />
            </div>

            {/* 카테고리 */}
            <div>
                <label className="block font-medium mb-1">카테고리</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md"
                >
                    <option value="">선택하세요</option>
                    <option value="review">음악 리뷰</option>
                    <option value="free">자유 글</option>
                    <option value="algorithm">알고리즘</option>
                    <option value="cs">cs 관련</option>
                </select>
            </div>

            {/* 비밀번호 */}
            <div>
                <label className="block font-medium mb-1">등록 비밀번호</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="비밀번호를 입력하세요"
                    className="w-full border p-2 rounded-md"
                />
            </div>

            {/* 버튼 */}
            <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition"
            >
                등록하기
            </button>
        </form>
    );
}
