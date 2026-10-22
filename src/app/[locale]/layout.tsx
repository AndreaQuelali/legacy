import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { AnimationProvider } from "@/providers/AnimationProvider";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  weight: "400",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-next",
  display: "swap",
});

const BASE_URL = "https://legacy-topaz.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(BASE_URL),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", es: "/es" },
    },
    icons: {
      icon: [{ url: "/logo.png", type: "image/png" }],
      apple: [{ url: "/logo.png", type: "image/png" }],
    },
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${bebasNeue.variable} ${inter.variable}`} suppressHydrationWarning>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <SmoothScrollProvider>
              <AnimationProvider>
                <main className="relative min-h-screen">
                  {children}
                </main>
              </AnimationProvider>
            </SmoothScrollProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
