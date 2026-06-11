"use client"

import { useState, useEffect, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import { useLenis } from 'lenis/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

export default function TopNavBar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();

  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null)
  const scrollTriggers = useRef<globalThis.ScrollTrigger[]>([]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Expose navbar height for sections pinned under the fixed header.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = navRef.current
    if (!el) return

    const setNavHeight = () => {
      const height = el.getBoundingClientRect().height
      document.documentElement.style.setProperty('--nav-h', `${height}px`)
    }

    setNavHeight()
    const ro = new ResizeObserver(() => setNavHeight())
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const sections = ['hero', 'nations', 'stadiums', 'journey'];

    const cleanup = () => {
      scrollTriggers.current.forEach(st => st.kill());
      scrollTriggers.current = [];
    };

    const initTriggers = () => {
      cleanup();

      sections.forEach(id => {
        const st = ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top 30%",
          end: "bottom 30%",
          onToggle: (self) => {
            if (self.isActive) setActiveSection(id);
          },
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });
        scrollTriggers.current.push(st);
      });

      setTimeout(() => { ScrollTrigger.refresh(); }, 2500);
    };

    const mainTimer = setTimeout(initTriggers, 800);
    return () => {
      clearTimeout(mainTimer);
      cleanup();
    };
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as 'en' | 'es' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (lenis) {
      if (target === '#hero') {
        lenis.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        lenis.scrollTo(target, {
          duration: 1.5,
          offset: -50,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    } else {
      router.push(target);
    }
  };

  const navLinks = [
    { id: 'hero', label: t('home'), href: '#hero' },
    { id: 'nations', label: t('nations'), href: '#nations' },
    { id: 'stadiums', label: t('stadiums'), href: '#stadiums' },
    { id: 'journey', label: t('road_to'), href: '#journey' },
  ];

  return (
    <>
      <nav ref={navRef} className="anim-navbar fixed top-0 w-full z-[100] backdrop-blur-md bg-black/30 border-b border-white/10 opacity-0">
        <div className="flex items-center justify-between px-6 lg:px-10 py-4 max-w-[1440px] mx-auto">
          <Link href="/" className="font-bebas leading-none text-white hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center gap-2">
              <Image src="/icon.svg" alt="Logo" width={24} height={24} />
              <div className="text-[24px] tracking-[0.15em] flex gap-2">
                {t('title1')}
                <span className="text-primary hidden lg:block">{t('title2')}</span>
              </div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`cinematic-label transition-all duration-300 ${activeSection === link.id
                  ? 'text-primary border-b border-primary pb-0.5'
                  : 'text-white/70 hover:text-primary'
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions & Language Switcher */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Lang switcher — desktop only */}
            <div className="hidden lg:flex items-center gap-2 border border-white/10 rounded-full px-3 py-1 bg-white/5">
              <button
                onClick={() => handleLocaleChange('en')}
                className={`text-[11px] font-bold tracking-widest transition-colors ${locale === 'en' ? 'text-primary' : 'text-white/40 hover:text-white/70'}`}
              >
                EN
              </button>
              <div className="w-[1px] h-3 bg-white/10" />
              <button
                onClick={() => handleLocaleChange('es')}
                className={`text-[11px] font-bold tracking-widest transition-colors ${locale === 'es' ? 'text-primary' : 'text-white/40 hover:text-white/70'}`}
              >
                ES
              </button>
            </div>

            {/* Desktop: explore button only */}
            <button
              onClick={(e) => handleNavClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, '#nations')}
              className="hidden lg:block cinematic-label text-primary border border-primary px-6 py-2.5 hover:bg-primary hover:text-black transition-all duration-300 glass-card">
              {t('explore')}
            </button>

            {/* Mobile hamburger button */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-[6px] group"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-[1.5px] bg-white transition-all duration-400 origin-center ${isOpen ? 'rotate-45 translate-y-[7.5px]' : ''
                  }`}
              />
              <span
                className={`block h-[1.5px] bg-white transition-all duration-300 ${isOpen ? 'w-0 opacity-0' : 'w-6'
                  }`}
              />
              <span
                className={`block w-6 h-[1.5px] bg-white transition-all duration-400 origin-center ${isOpen ? '-rotate-45 -translate-y-[7.5px]' : ''
                  }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Drawer */}
      <div
        className={`fixed inset-0 z-[99] flex flex-col lg:hidden transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ backgroundColor: 'rgba(5, 5, 5, 0.97)', backdropFilter: 'blur(24px)' }}
      >
        {/* Ambient glow top-right */}
        <div className="absolute top-0 right-0 w-[50%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[30%] rounded-full bg-primary/3 blur-[100px] pointer-events-none" />

        {/* Drawer content */}
        <div className="flex flex-col justify-center flex-1 px-10 py-32 gap-2">
          {/* Section label */}
          <span className="font-inter text-[10px] font-bold tracking-[0.4em] text-primary/60 uppercase mb-8">
            {t('navigate')}
          </span>

          {/* Nav links — large cinematic style */}
          <nav className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{ transitionDelay: isOpen ? `${i * 60}ms` : '0ms' }}
                className={`group flex items-center gap-5 py-4 border-b border-white/5 transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
              >
                <span className="font-inter text-[10px] font-bold text-primary/40 tracking-[0.3em] w-5">
                  0{i + 1}
                </span>
                <span
                  className={`font-bebas text-[52px] leading-none tracking-wider transition-colors duration-300 ${activeSection === link.id ? 'text-primary' : 'text-white group-hover:text-primary'
                    }`}
                >
                  {link.label}
                </span>
                {activeSection === link.id && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
                )}
              </a>
            ))}
          </nav>

          {/* Language switcher inside drawer */}
          <div className="flex items-center gap-4 mt-10">
            <span className="font-inter text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase">
              Lang
            </span>
            <button
              onClick={() => handleLocaleChange('en')}
              className={`font-inter text-[11px] font-bold tracking-widest transition-colors ${locale === 'en' ? 'text-primary' : 'text-white/30 hover:text-white/70'}`}
            >
              EN
            </button>
            <div className="w-[1px] h-3 bg-white/10" />
            <button
              onClick={() => handleLocaleChange('es')}
              className={`font-inter text-[11px] font-bold tracking-widest transition-colors ${locale === 'es' ? 'text-primary' : 'text-white/30 hover:text-white/70'}`}
            >
              ES
            </button>
          </div>
        </div>

        {/* Bottom branding */}
        <div className="px-10 py-8 border-t border-white/5">
          <div className="font-bebas text-[14px] tracking-[0.3em] text-white/20 uppercase">
            LEGACY 2026
          </div>
        </div>
      </div>
    </>
  )
}
