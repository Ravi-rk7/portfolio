import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SiteHeader, SiteFooter } from '@/components/site-header';

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="not-found wrap">
        <p className="eyebrow">404 / A WRONG TURN</p>
        <h1>
          Nothing built
          <br />
          here. <span className="serif-word">Yet.</span>
        </h1>
        <p>
          The page you’re looking for doesn’t exist. The work is right this way.
        </p>
        <Link className="text-link" href="/#work">
          <ArrowLeft size={17} /> Back to selected work
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
