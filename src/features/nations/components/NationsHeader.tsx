import { useTranslations } from 'next-intl'
import SplitTitle from '@/components/animations/SplitTitle'

export default function NationsHeader() {
  const t = useTranslations('nations')

  return (
    <div className="text-center mb-12 sm:mb-16">
      <span className="hero-subtitle text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em]">
        {t("subtitle")}
      </span>
      <SplitTitle 
        text={t("title")} 
        className="section-title mt-3"
      />
    </div>
  )
}
