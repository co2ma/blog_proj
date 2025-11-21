import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Me",
};

export default function AboutUs() {
    return (
        <div className="container mx-auto m-4 mt-15 px-4">
            <h1 className="w-24 h-24">안녕하세요</h1>
        </div>
    );
}
