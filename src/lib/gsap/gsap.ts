import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip)
}

export * from 'gsap/SplitText'
export * from 'gsap/Flip'
export * from 'gsap/ScrollTrigger'
export default gsap
