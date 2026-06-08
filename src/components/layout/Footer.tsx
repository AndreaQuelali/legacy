"use client"

import { useTranslations } from "next-intl"

export default function Footer() {
  const t = useTranslations("footer")
  return (
    <footer className="bg-[#131313] border-t border-white/[0.12] w-full py-16">
      <div className="flex flex-col items-center gap-7 px-10 max-w-[1440px] mx-auto text-center">
        {/* Logo */}
        <div className="font-bebas text-[36px] tracking-[0.35em] text-primary uppercase">
          LEGACY WORLD CUP 2026
        </div>

        {/* Copyright */}
        <p className="font-inter text-[10px] font-bold text-white/25 uppercase tracking-[0.2em] mt-3">
          {t("copyright")}
        </p>
      </div>
    </footer>
  )
}

