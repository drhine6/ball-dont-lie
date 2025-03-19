import type { Metadata } from 'next';
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import ModeToggle from '@/components/mode-toggle';
import { ThemeProvider } from '@/context/theme-context';
import { Footer } from '@/components/footer';
import { Analytics } from '@vercel/analytics/react';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'The Wilson Theory',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏀</text></svg>"
      />
      <head>
        {/* Inline script to check and apply dark mode before the page renders to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Check localStorage first
                  const storedTheme = localStorage.getItem('theme');
                  
                  // Then check system preference
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  // Apply dark mode immediately if needed
                  if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {
                  console.error('Failed to check dark mode preference:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-bg`}
      >
        <ThemeProvider>
          <ModeToggle />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
