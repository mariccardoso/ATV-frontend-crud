import "./globals.css";

export const metadata = {
    title: "CRUD - POST",
    description: "Projeto para consumo de API REST",
    icons: {
        icon: "/icons/favicon.ico",
    },
};

export default function RootLayout({ children }) {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
}
