import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    'https://ravi-kiran-portfolio.coding-ravikirantan7.chatgpt.site',
  ),
  title: {
    default: 'Ravi Kiran — Full-stack Developer',
    template: '%s — Ravi Kiran',
  },
  description:
    'Full-stack developer with an eye for the details. Explore Intervia, TejAi, and Yappy — thoughtful interfaces backed by real engineering.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    title: 'Ravi Kiran — Full-stack Developer',
    description:
      'Built with logic. Made to feel. Selected projects in AI, real-time communication, and everyday digital routines.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
