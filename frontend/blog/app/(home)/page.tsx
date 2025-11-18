import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "main",
};

export default function Home() {
    return (
        <div>
            <div className="w-4 h-4 m-4 p-4 hover:bg-amber-400 transition">
                Hello
            </div>
        </div>
    );
}
