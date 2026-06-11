"use client"

import React from 'react'
import Image, { type StaticImageData } from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, MapPin, Users, Ticket } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { MatchData } from '../data/stadiums'

interface StadiumModalProps {
  id: string | null
  name: string
  city: string
  capacity: string
  image: StaticImageData
  matches: MatchData[]
  isOpen: boolean
  onClose: () => void
}

export default function StadiumModal({
  id,
  name,
  city,
  capacity,
  image,
  matches,
  isOpen,
  onClose,
}: StadiumModalProps) {
  const t = useTranslations('stadiums')

  if (!id) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden flex flex-col lg:flex-row max-h-[90vh] shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 backdrop-blur-md rounded-full text-white/70 hover:text-primary transition-colors border border-white/10 hover:border-primary/50"
            >
              <X size={20} />
            </button>

            {/* Left: Stadium Image & Basic Info */}
            <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-full">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent lg:bg-gradient-to-r lg:from-black/40 lg:via-black/20 lg:to-transparent" />

              <div className="absolute bottom-0 left-0 p-6 lg:p-10 w-full mb-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                >
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                    <MapPin size={12} />
                    {city}
                  </span>
                  <h2 className="font-bebas text-4xl sm:text-5xl lg:text-7xl text-white uppercase leading-none mb-4 tracking-tight">
                    {name}
                  </h2>
                  <div className="flex items-center gap-6 text-white/80">
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-primary" />
                      <span className="font-inter text-sm font-medium tracking-tight">
                        <span className="text-white font-bold">{capacity}</span> <span className='text-primary'>{t('capacity')}</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right: Matches & Details */}
            <div className="flex-1 flex flex-col bg-[#050505] overflow-hidden">
              <div className="p-6 lg:p-10 flex-1 overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bebas text-2xl text-white uppercase tracking-wider flex items-center gap-3">
                    <Calendar className="text-primary" size={24} />
                    {t('schedule')}
                  </h3>
                </div>

                <div className="space-y-4">
                  {matches.length > 0 ? (
                    matches.map((match, idx) => (
                      <motion.div
                        key={`${match.stage}-${idx}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                        className="group flex flex-col sm:flex-row items-center gap-4 p-4 rounded-sm bg-white/5 border border-white/5 transition-all duration-300"
                      >
                        <div className="flex flex-col items-center sm:items-start min-w-[120px]">
                          <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
                            {match.time || 'TBD'}
                          </span>
                          <span className="text-xs text-white/50 font-medium">
                            {match.date}
                          </span>
                        </div>

                        <div className="flex-1 text-center sm:text-left py-2 sm:py-0">
                          <div className="text-sm font-bold text-white uppercase tracking-tight">
                            {match.teams}
                          </div>
                          <div className="text-[10px] text-white/30 font-medium uppercase tracking-widest mt-1">
                            {match.stage}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="py-20 text-center text-white/20 italic font-inter text-sm">
                      No hay partidos programados aún.
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Decoration */}
              <div className="p-6 bg-gradient-to-t from-black to-transparent border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-1 h-1 rounded-full bg-primary/30" />
                    ))}
                  </div>
                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">
                    LEGACY 2026
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
