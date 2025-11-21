import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Not Found",
};

export default function NotFound() {
    return (
        <div className="container mx-auto m-4 mt-15 px-4">
            <h1>올바르지 않은 페이지 입니다.</h1>
        </div>
    );
}
