"use client"

import React from 'react'
import { useTranslations } from 'next-intl'
import HeroTitle from './HeroTitle'
import HeroSubtitle from './HeroSubtitle'
import HeroActions from './HeroActions'

interface HeroContentProps {
  h1Ref?: React.RefObject<HTMLHeadingElement | null>
  pRef?: React.RefObject<HTMLParagraphElement | null>
}

export default function HeroContent({ h1Ref, pRef }: HeroContentProps) {
  const t = useTranslations("hero")

  return (
    <div className="relative z-10 text-center px-6 flex flex-col items-center max-w-5xl">
      <HeroSubtitle />
      <HeroTitle h1Ref={h1Ref} />
      
      <p 
        ref={pRef} 
        className="body-muted max-w-xl mx-auto mt-6"
      >
        {t("description")}
      </p>

      <HeroActions />
    </div>
  )
}
