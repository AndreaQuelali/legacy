import gsap, { SplitText } from '../gsap'

export const playHeroTimeline = () => {
  const tl = gsap.timeline({
    defaults: { ease: "power3.out" }
  })

  // Prevent FOUC by making sure items start hidden
  gsap.set('.anim-navbar, .anim-subtitle, .anim-title-1, .anim-title-2, .anim-desc, .anim-cta, .anim-countdown, .anim-scroll-indicator', {
    opacity: 0
  })

  tl.fromTo('.anim-navbar',
    { y: -30, opacity: 0, filter: 'blur(8px)' },
    { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2 }
  )
  .fromTo('.anim-subtitle',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 1 },
    "-=0.6"
  )

  // Use SplitText for the main titles
  const title1 = new SplitText('.anim-title-1', { type: 'chars' })
  const title2 = new SplitText('.anim-title-2', { type: 'chars' })

  // Set parents to visible immediately as we are animating characters
  gsap.set(['.anim-title-1', '.anim-title-2'], { opacity: 1 })

  tl.fromTo(title1.chars,
    { opacity: 0, y: 15, filter: 'blur(10px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, stagger: 0.08 },
    "-=0.6"
  )
  .fromTo(title2.chars,
    { opacity: 0, y: 15, filter: 'blur(10px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, stagger: 0.08 },
    "-=0.7"
  )
  .fromTo('.anim-desc',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 1 },
    "-=0.8"
  )
  .fromTo('.anim-cta',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
    "-=0.6"
  )
  .fromTo('.anim-countdown',
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
    "-=0.6"
  )
  .fromTo('.anim-scroll-indicator',
    { opacity: 0 },
    { opacity: 1, duration: 1 },
    "-=0.4"
  )

  // Floating animation for the scroll indicator dot
  gsap.to('.anim-scroll-indicator .indicator-dot', {
    y: 8,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    delay: 1.5
  })

  return tl
}
