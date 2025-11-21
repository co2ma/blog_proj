"use client";

interface ToastProps {
    message: string;
    type?: "success" | "error";
}

export default function Toast({ message, type = "error" }: ToastProps) {
    return (
        <div
            className={`
        fixed bottom-6 left-1/2 transform -translate-x-1/2
        px-4 py-2 rounded-lg shadow-lg animate-fadeInOut text-white
        ${type === "error" ? "bg-red-500" : "bg-green-600"}
      `}
        >
            {message}
        </div>
    );
}
