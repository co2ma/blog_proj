"use client";

import Toast from "@/components/toast";
import { useEffect, useState, Suspense } from "react"; // Suspense 추가
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";

function WriteForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [formData, setFormData] = useState({
        id: "",
        title: "",
        image: "",
        content: "",
        category: "",
        password: "",
    });

    useEffect(() => {
        if (id) {
            api.get(`/api/posts/${id}`).then((res) => {
                setFormData(res.data);
            });
        }
    }, [id]);

    const [toastInfo, setToastInfo] = useState({
        message: "",
        type: "error" as "success" | "error",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // id가 비어있다면 body에서 제외
        const { id, password, ...rest } = formData;
        const requestBody = id ? { id, ...rest } : { ...rest };

        try {
            const response = await api.post("/api/posts", requestBody, {
                headers: {
                    "X-API-KEY": password,
                    "Content-Type": "application/json",
                },
            });
            localStorage.setItem(
                "toast",
                JSON.stringify({
                    message: "등록이 완료되었습니다.",
                    type: "success",
                })
            );

            router.push("/");

            //console.log("응답:", response.data);
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                "요청 처리 중 오류가 발생했습니다. 다시 시도해주세요.";

            setToastInfo({ message, type: "error" });

            setTimeout(() => {
                setToastInfo({ message: "", type: "error" });
            }, 2500);
        }
    };

    return (
        <div className="relative">
            <form
                onSubmit={handleSubmit}
                className="mt-10 max-w-2xl mx-auto p-6 border rounded-xl space-y-5 shadow-md bg-white"
            >
                <h1 className="text-2xl font-bold text-center">글쓰기</h1>

                {/* 현재 글 번호 */}
                <div>
                    <label className="block font-medium mb-1">글 ID</label>
                    <input
                        type="number"
                        name="id"
                        value={formData.id ?? ""}
                        onChange={handleChange}
                        placeholder="자동으로 입력 됩니다"
                        className="w-full border p-2 rounded-md"
                        readOnly
                    />
                </div>

                {/* 타이틀 */}
                <div>
                    <label className="block font-medium mb-1">타이틀</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title ?? ""}
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
                        value={formData.image ?? ""}
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
                        value={formData.content ?? ""}
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
                        value={formData.category ?? ""}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md cursor-pointer"
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
                    <label className="block font-medium mb-1">
                        등록 전용 키
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password ?? ""}
                        onChange={handleChange}
                        placeholder="등록 키 값을 입력해주세요"
                        className="w-full border p-2 rounded-md"
                    />
                </div>

                {/* 버튼 */}
                <button
                    type="submit"
                    className="w-full py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition cursor-pointer"
                >
                    등록하기
                </button>
            </form>
            {toastInfo.message && (
                <Toast message={toastInfo.message} type="error" />
            )}
        </div>
    );
}

export default function Write() {
    return (
        <Suspense
            fallback={<div className="text-center mt-10">Loading...</div>}
        >
            <WriteForm />
        </Suspense>
    );
}
