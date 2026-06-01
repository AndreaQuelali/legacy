"use client"

import { useState, useEffect, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import { useLenis } from 'lenis/react'
import gsap from '@/lib/gsap/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function TopNavBar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();
  
  const [activeSection, setActiveSection] = useState('hero');
  const scrollTriggers = useRef<globalThis.ScrollTrigger[]>([]);

  useEffect(() => {
    const sections = ['hero', 'nations', 'stadiums', 'timeline'];
    
    // Cleanup function to kill triggers accurately
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
            if (self.isActive) {
              setActiveSection(id);
            }
          },
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });
        scrollTriggers.current.push(st);
      });
      
      // Force a refresh once after a delay to account for other components' pinning
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1500);
    };

    // Initialize after a short delay to let sections register their own ScrollTriggers
    const mainTimer = setTimeout(initTriggers, 500);

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
    { id: 'timeline', label: t('road_to'), href: '#timeline' },
  ];

  return (
    <nav className="anim-navbar fixed top-0 w-full z-[100] backdrop-blur-md bg-black/30 border-b border-white/10 opacity-0">
      <div className="flex items-center justify-between px-10 py-4 max-w-[1440px] mx-auto">
        {/* Logo — 2 lines */}
        <Link href="/" className="font-bebas leading-none text-white hover:opacity-80 transition-opacity">
          <div className="text-[22px] tracking-[0.15em]">{t('title1')}</div>
          <div className="text-[22px] tracking-[0.15em]">{t('title2')}</div>
        </Link>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`cinematic-label transition-all duration-300 ${
                activeSection === link.id 
                  ? 'text-primary border-b border-primary pb-0.5' 
                  : 'text-white/70 hover:text-primary'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions & Language Switcher */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 border border-white/10 rounded-full px-3 py-1 bg-white/5">
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

          <button className="hidden sm:block cinematic-label text-primary border border-primary px-6 py-2.5 hover:bg-primary hover:text-black transition-all duration-300 glass-card">
            {t('explore')}
          </button>
          <span className="material-symbols-outlined text-white/80 cursor-pointer text-[24px] hover:text-primary transition-colors">grid_view</span>
        </div>
      </div>
    </nav>
  )
}
