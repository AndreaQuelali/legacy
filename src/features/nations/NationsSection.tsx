"use client"

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import SplitTitle from '@/components/animations/SplitTitle'
import PlayerGallery3D from './components/PlayerGallery3D'
import NationInfoOverlay from './components/NationInfoOverlay'
import NationMobileSheet from './components/NationMobileSheet'
import { getNationFolder } from './data/nations'
import { getNationImageData } from './assets/nationImages'
import { useNationsData } from './hooks/useNationsData'
import { useNationsSection } from './hooks/useNationsSection'

export default function NationsSection() {
  const t = useTranslations('nations')
  const { nations, galleryItems } = useNationsData()
  const {
    sectionRef,
    selectedId,
    setSelectedId,
    ballHoveredIndex,
    showBallIntro,
    heroCinematicDone,
    selectedNation,
    selectedIndex,
    handleBallCardEnter,
    handleBallComplete,
    handlePrev,
    handleNext,
  } = useNationsSection({ nations })

  const folder = selectedId ? getNationFolder(selectedId) : null

  return (
    <section
      id="nations"
      ref={sectionRef}
      className={`relative h-[90dvh] w-full bg-[#050505] overflow-hidden ${heroCinematicDone ? '' : 'invisible pointer-events-none'
        }`}
    >
      <AnimatePresence>
        {selectedId && folder && selectedNation && (
          <motion.div
            key={selectedId + '-bg'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div className="absolute inset-0">
              <Image
                src={getNationImageData(folder, 'bg')}
                alt={selectedNation.name}
                fill
                className="object-cover opacity-50"
                priority
              />
              <div className="absolute inset-0 bg-black/65" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/60" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,_rgba(234,179,8,0.025)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative flex flex-col overflow-hidden h-full pt-[var(--nav-h,5rem)]">
        {!selectedId && (
          <div className="shrink-0 z-20 text-center pointer-events-none px-4 pt-6 md:pt-8 pb-2">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="h-px w-8 bg-primary/40" />
              <span className="hero-subtitle text-[10px] sm:text-[11px] tracking-[0.4em] text-primary">
                {t('subtitle')}
              </span>
              <div className="h-px w-8 bg-primary/40" />
            </div>

            <SplitTitle
              text={t('title')}
              className="section-title drop-shadow-lg"
              type="words"
            />

            <p className="font-inter text-[10px] sm:text-xs text-white/25 mt-2 sm:mt-3 tracking-[0.2em] hidden sm:block uppercase">
              {t('select_hint')}
            </p>
          </div>
        )}

        <div
          className={`relative flex-1 min-h-0 z-[10] flex items-center justify-center transition-all duration-700 ${selectedId ? 'md:ml-auto md:w-[40%] md:flex-none' : 'w-full'
            }`}
        >
          <PlayerGallery3D
            items={galleryItems}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId(id)}
            ballHoveredIndex={ballHoveredIndex}
            showBallIntro={showBallIntro}
            onBallCardEnter={handleBallCardEnter}
            onBallComplete={handleBallComplete}
          />
        </div>

        <div className="hidden md:block">
          <NationInfoOverlay
            nation={selectedNation}
            onClose={() => setSelectedId(null)}
          />
        </div>

        <NationMobileSheet
          nation={selectedNation}
          nations={nations}
          selectedIndex={selectedIndex}
          onClose={() => setSelectedId(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </section>
  )
}
