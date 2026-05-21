import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { AnimationProvider } from "@/providers/AnimationProvider";

const bebasNeue = localFont({
  src: "../../public/fonts/BebasNeue-Regular.ttf",
  variable: "--font-bebas-neue",
  weight: "400",
  style: "normal",
  display: "swap",
});

const inter = localFont({
  src: "../../public/fonts/Inter.ttf",
  variable: "--font-inter-next",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LEGACY | World Cup 2026",
  description: "A cinematic football experience inspired by the 2026 World Cup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body
        className="antialiased"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <AnimationProvider>
              <main className="relative min-h-screen">
                {children}
              </main>
            </AnimationProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
