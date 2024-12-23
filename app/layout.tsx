import '@/app/globals.css';

export const metadata = {
    title: 'Weather Dashboard',
    description: 'Dashboard displaying current and forecasted weather data by location.',
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
