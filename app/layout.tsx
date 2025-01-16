import { Inter } from "next/font/google";
import '@/app/globals.css';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] });

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
        <html lang="en" className={inter.className}>
            <body>{children}</body>
        </html>
    )
}
