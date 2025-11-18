import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 md:h-8 md:w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500" />
            <span className="font-semibold text-sm md:text-base">
                Musikizmalyf
            </span>
        </Link>
    );
}
