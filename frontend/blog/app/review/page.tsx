"use client";

import PostList from "@/components/postList";
import { usePathname } from "next/navigation";

export default function Review() {
    const pathname = usePathname();

    // 끝에 / 제거 후 마지막 segment 가져오기
    const segments = pathname.replace(/\/$/, "").split("/");
    const lastSegment = segments[segments.length - 1];

    return <PostList category={lastSegment} />;
}
