import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Me",
};

export default function AboutUs() {
    return (
        <div>
            <h1 className="w-24 h-24">About Us</h1>
        </div>
    );
}
