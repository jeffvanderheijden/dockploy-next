export const metadata = { title: "Next.js Dokploy Test" };

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body style={{ fontFamily: "system-ui", maxWidth: 900, margin: "40px auto" }}>
                {children}
            </body>
        </html>
    );
}
