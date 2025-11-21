"use client"; //서버는 뭐가 됐든 렌더링을 함

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./ui/logo";
import { Moon, PenBox, Sun } from "lucide-react";

export default function Header() {
    const [isDark, setIsDark] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4 md:gap-8">
                    <Logo />
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className="text-sm hover:text-purple-600 transition-colors"
                        >
                            홈
                        </Link>
                        <Link
                            href="/review"
                            className="text-sm hover:text-purple-600 transition-colors"
                        >
                            음악 리뷰
                        </Link>
                        <Link
                            href="/posts"
                            className="text-sm hover:text-purple-600 transition-colors"
                        >
                            글
                        </Link>
                        <Link
                            href="/about-me"
                            className="text-sm hover:text-purple-600 transition-colors"
                        >
                            연락
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <button className="w-6 h-6 transition cursor-pointer">
                        <Link href={`/write`} className="block w-full h-full">
                            <PenBox />
                        </Link>
                    </button>
                    <button
                        className="transition cursor-pointer"
                        onClick={() => {
                            setIsDark(!isDark);
                        }}
                    >
                        {isDark === false ? <Sun /> : <Moon />}
                    </button>
                </div>
            </div>
        </header>
    );
}

// return (
//     <nav>
//         <ul className="flex gap-4 m-4 justify-around items-center">
//             <li>
//                 <Link href="/" className="flex items-center gap-2">
//                     <div className="h-7 w-7 md:h-8 md:w-8 rounded-lg from-purple-600 to-blue-500" />
//                     <span className="font-semibold text-sm md:text-base">
//                         내 블로그
//                     </span>
//                 </Link>
//             </li>
//             <li className="font-semibold text-sm md:text-base">
//                 <Link href="/">Home</Link> {path === "/" ? "⭐" : ""}
//             </li>
//             <li className="font-semibold text-sm md:text-base">
//                 <Link href="/about-us">About-us</Link>
//                 {path === "/about-us" ? "⭐" : ""}
//             </li>
//             <button onClick={() => setCount((c) => c + 1)}>{count}</button>
//         </ul>
//     </nav>
// );
