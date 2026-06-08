"use client"

import { useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'
import type { NationData } from '../data/nations'
import NationDetailContent from './NationDetailContent'

interface NationMobileSheetProps {
  nation: NationData | null
  nations: NationData[]
  selectedIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function NationMobileSheet({
  nation,
  nations,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
}: NationMobileSheetProps) {
  const t = useTranslations('nations')

  return (
    <AnimatePresence>
      {nation && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.4 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 80 || info.velocity.y > 400) {
              onClose()
            }
          }}
          className="md:hidden absolute bottom-0 inset-x-0 z-[50] bg-black/90 backdrop-blur-xl border-t border-white/10 rounded-t-3xl px-6 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] max-h-[55vh] overflow-y-auto"
        >
          <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />

          <button
            onClick={onClose}
            aria-label={t('close')}
            className="absolute top-5 right-6 text-white/40 hover:text-white transition-colors font-bebas text-sm tracking-widest"
          >
            ✕ {t('close')}
          </button>

          <NationDetailContent nation={nation} layout="mobile" />

          <div className="flex justify-between mt-4">
            <button
              onClick={onPrev}
              disabled={selectedIndex <= 0}
              aria-label={t('prev_nation')}
              className="flex items-center gap-2 font-bebas text-sm tracking-widest text-white/40 hover:text-primary disabled:opacity-20 transition-colors"
            >
              ← {selectedIndex > 0 ? nations[selectedIndex - 1].name : ''}
            </button>
            <button
              onClick={onNext}
              disabled={selectedIndex >= nations.length - 1}
              aria-label={t('next_nation')}
              className="flex items-center gap-2 font-bebas text-sm tracking-widest text-white/40 hover:text-primary disabled:opacity-20 transition-colors"
            >
              {selectedIndex < nations.length - 1 ? nations[selectedIndex + 1].name : ''} →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
