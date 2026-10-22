import gsap from '../gsap'

export const playHeroTimeline = () => {
  const tl = gsap.timeline({
    defaults: { ease: "power3.out" }
  })

  // Prevent FOUC by making sure items start hidden
  gsap.set('.anim-navbar, .anim-cta, .anim-countdown, .anim-location, .anim-scroll-indicator', {
    opacity: 0
  })

  tl.fromTo('.anim-navbar',
    { y: -30, opacity: 0, filter: 'blur(8px)' },
    { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7 }
  )
  .fromTo('.anim-cta',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
    "-=0.6"
  )
  .fromTo(['.anim-countdown', '.anim-location'],
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
