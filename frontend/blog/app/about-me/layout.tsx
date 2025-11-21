export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            {children}
            {/* &copy; Next JS is Great! */}
        </div>
    );
}
