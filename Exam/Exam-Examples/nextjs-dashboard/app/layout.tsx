import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

// DEMO: Next.js SEO Metadata API
// This automatically generates HTML <head> tags (title, meta description).
// Crawlers read this to understand what your page is about.

//uncomment and run lighthouse in dev tools to see the SEO difference
 export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard', 
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  openGraph: {
    title: 'Acme Dashboard', // Used when sharing on social media
    description: 'This is an awesome dashboard.',
  },
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}