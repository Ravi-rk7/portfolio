'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import {
  ArrowUpRight,
  ArrowUp,
  BriefcaseBusiness,
  Code2,
  House,
  Pause,
  Play,
} from 'lucide-react';
import { Github } from '@/components/github-icon';
import { Button } from '@/components/ui/button';
import { useMotionPreference } from '@/components/motion-system';

function LocalTime() {
  const [time, setTime] = useState('INDIA / IST');
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date()) + ' IST',
      );
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);
  return (
    <span className="local-time mono">
      <span className="live-dot" />
      {time}
    </span>
  );
}

export function SiteHeader({ home = false }: { home?: boolean }) {
  const pathname = usePathname();
  const [active, setActive] = useState(home ? 'home' : 'work');
  const { stopped, systemReduced, toggle } = useMotionPreference();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 35 });
  useEffect(() => {
    if (pathname !== '/') {
      setActive('work');
      return;
    }
    setActive('home');
    const elements = [
      { element: document.querySelector('.identity-panel'), id: 'home' },
      { element: document.getElementById('work'), id: 'work' },
      { element: document.getElementById('stack'), id: 'work' },
      { element: document.getElementById('about'), id: 'about' },
      { element: document.getElementById('contact'), id: 'contact' },
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            const match = elements.find(
              (item) => item.element === entry.target,
            );
            if (match) setActive(match.id);
          }
      },
      { rootMargin: '-10% 0px -65% 0px', threshold: 0 },
    );
    elements.forEach((item) => {
      if (item.element) observer.observe(item.element);
    });
    return () => observer.disconnect();
  }, [pathname]);
  const base = home ? '' : '/';
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header wrap">
        <Link href="/" className="identity-brand" aria-label="Ravi Kiran, home">
          <span className="brand-glyph">
            rk<span>_</span>
          </span>
          <span className="brand-descriptor mono">
            RAVIKIRAN TANDALE
            <br />
            <span>SOFTWARE DEVELOPER</span>
          </span>
        </Link>
        <div className="header-right">
          <LocalTime />
          <a
            href="https://github.com/Ravi-rk7"
            target="_blank"
            rel="noopener noreferrer"
            className="header-github mono"
          >
            <Github size={16} /> GITHUB <ArrowUpRight size={14} />
          </a>
        </div>
      </header>
      <nav className="floating-dock" aria-label="Main navigation">
        <div className="dock-links">
          {[
            { id: 'home', label: 'Home', icon: House, href: base + '#main' },
            {
              id: 'work',
              label: 'Work',
              icon: BriefcaseBusiness,
              href: base + '#work',
            },
            { id: 'about', label: 'About', icon: Code2, href: base + '#about' },
          ].map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={'dock-item ' + (active === item.id ? 'is-active' : '')}
              aria-current={active === item.id ? 'location' : undefined}
            >
              {active === item.id && (
                <motion.span
                  className="dock-active"
                  layoutId="dock-active"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <item.icon size={17} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
        <span className="dock-divider" />
        <a
          className="dock-control"
          href="https://github.com/Ravi-rk7"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ravi Kiran on GitHub"
          title="GitHub"
        >
          <Github size={19} />
        </a>
        <Button
          variant="ghost"
          size="icon"
          className="dock-control motion-control"
          onClick={toggle}
          disabled={systemReduced}
          aria-pressed={stopped}
          aria-label={
            systemReduced
              ? 'Reduced motion is enabled in your system settings'
              : stopped
                ? 'Enable animations'
                : 'Pause animations'
          }
          title={
            systemReduced
              ? 'System reduced motion'
              : stopped
                ? 'Enable animations'
                : 'Pause animations'
          }
        >
          {stopped ? <Play size={17} /> : <Pause size={17} />}
        </Button>
        <motion.span
          className="dock-progress"
          style={{ scaleX: stopped ? scrollYProgress : progress }}
        />
      </nav>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer wrap">
      <div>
        <span className="footer-mark">rk_</span>
        <p className="mono">© {new Date().getFullYear()} RAVIKIRAN TANDALE</p>
      </div>
      <a href="#main" className="mono">
        BACK TO THE TOP <ArrowUp size={15} />
      </a>
    </footer>
  );
}
