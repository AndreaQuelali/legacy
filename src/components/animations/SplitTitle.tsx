"use client"

import { useEffect, useRef } from "react"
import gsap from "@/lib/gsap/gsap"
import { SplitText } from "@/lib/gsap/gsap"
import { cn } from "../../lib/utils"

interface SplitTitleProps {
  text: string
  className?: string
  delay?: number
  type?: "chars" | "words" | "lines"
  stagger?: number
  onComplete?: () => void
  trigger?: boolean
}

export default function SplitTitle({
  text,
  className,
  delay = 0,
  type = "chars",
  stagger = 0.05,
  onComplete,
  trigger = true
}: SplitTitleProps) {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!textRef.current || !trigger) return

    const ctx = gsap.context(() => {
      const split = new SplitText(textRef.current, { type })
      
      const targets = type === "chars" ? split.chars : type === "words" ? split.words : split.lines

      gsap.fromTo(targets, 
        { 
          y: 15, 
          opacity: 0,
          filter: "blur(10px)"
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          delay: delay,
          onComplete: onComplete,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%",
          }
        }
      )
    })

    return () => ctx.revert()
  }, [text, type, delay, stagger, onComplete, trigger])

  return (
    <h2 
      ref={textRef} 
      className={cn("split-title", className)}
    >
      {text}
    </h2>
  )
}
