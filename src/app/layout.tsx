import '@/app/globals.css';

export const metadata = {
    title: 'Next.js Weather Dashboard App',
    description: 'Dashboard displaying weather data by location',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
