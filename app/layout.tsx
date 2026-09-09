import type { Metadata } from 'next';
import './globals.css';
import { MotionProvider } from '@/components/motion-system';

export const metadata: Metadata = {
  metadataBase: new URL(
    'https://ravi-kiran-portfolio.coding-ravikirantan7.chatgpt.site',
  ),
  title: {
    default: 'Ravi Kiran — Full-stack Developer',
    template: '%s — Ravi Kiran',
  },
  description:
    'Ravikiran Tandale — software developer building full-stack applications, AI workflows, and real-time experiences. Explore the work behind the code.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    title: 'Ravi Kiran — Full-stack Developer',
    description:
      'Less talk. More shipped. Explore full-stack applications, AI-powered workflows, and real-time software by Ravi Kiran.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
