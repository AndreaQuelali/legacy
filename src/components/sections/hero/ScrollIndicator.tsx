"use client"

import React from 'react'
import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2">
      <div className="w-[1px] h-12 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-1 h-1 rounded-full bg-primary"
      />
    </div>
  )
}
