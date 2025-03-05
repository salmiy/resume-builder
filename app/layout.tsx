import type { Metadata } from "next";
import { IBM_Plex_Mono, Montserrat } from "next/font/google";
import type { Viewport } from 'next'
import "./globals.css";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ['latin', 'latin-ext']
})
const ibm_plex_mono = IBM_Plex_Mono({
  weight: ['300', '400', '500', '600'],
  variable: "--font-ibm-plex-mono",
  subsets: ['latin']
})


export const metadata: Metadata = {
  title: "Resume Builder",
  description: "A simple app that helps you build your resume and customize it by enabling/disabling every piece of data you input",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${ibm_plex_mono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
