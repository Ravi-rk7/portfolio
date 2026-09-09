import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function SiteHeader({ home = false }: { home?: boolean }) {
  const base = home ? '' : '/';
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header wrap">
        <Link href="/" className="wordmark" aria-label="Ravi Kiran, home">
          rk<span className="brand-dot">.</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <a href={`${base}#work`}>
            Work <span className="nav-count">03</span>
          </a>
          <a href={`${base}#about`}>About</a>
          <a href={`${base}#contact`} className="nav-contact">
            Let’s connect <ArrowUpRight size={17} />
          </a>
        </nav>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer wrap">
      <Link href="/" className="wordmark" aria-label="Ravi Kiran, home">
        rk<span className="brand-dot">.</span>
      </Link>
      <p>© {new Date().getFullYear()} Ravikiran Tandale</p>
      <a href="#main">
        Back to top <ArrowUpRight size={16} />
      </a>
    </footer>
  );
}
