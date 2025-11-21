import { Github, Instagram } from "lucide-react";
import Link from "next/link";
import Logo from "./ui/logo";

export default function Footer() {
    return (
        <footer className="border-t bg-gray-50 mt-12 sm:mt-16 md:mt-20">
            <div className="container mx-auto px-4 py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
                    <div className="col-span-1 sm:col-span-2">
                        <Logo />
                        <p className="text-gray-600 mb-4 text-sm sm:text-base mt-4">
                            음악 리뷰, 개발, 개인적 생각을 끄적이는 곳
                        </p>
                        <div className="flex gap-2">
                            <Link
                                href={"https://github.com/co2ma"}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github className="h-8 w-8 sm:h-8 sm:w-8" />
                            </Link>
                            <Link
                                href={"https://www.instagram.com/re0_032/"}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Instagram className="h-8 w-8 sm:h-8 sm:w-8" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-3 sm:mb-4 text-sm sm:text-base">
                            메뉴
                        </h4>
                        <ul className="space-y-1.5 sm:space-y-2 text-gray-600 text-sm">
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-purple-600 transition-colors"
                                >
                                    홈
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/review"
                                    className="hover:text-purple-600 transition-colors"
                                >
                                    음악 리뷰
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/posts"
                                    className="hover:text-purple-600 transition-colors"
                                >
                                    글
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about-me"
                                    className="hover:text-purple-600 transition-colors"
                                >
                                    연락
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-6 sm:pt-8 border-t text-center text-gray-600 text-xs sm:text-sm">
                    <p>
                        © 2025 Co2ma's blog | musikizmalyf. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
