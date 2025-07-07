import type { Metadata } from 'next';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Md. Jehadur Rahman Emran - Software Engineer & Researcher',
  description: 'Md. Jehadur Rahman Emran - Software Engineer, Researcher, and Full-Stack Developer. Passionate about building scalable solutions and contributing to academic research.',
  keywords: 'Software Engineer, Full-Stack Developer, Researcher, Machine Learning, Web Development, TypeScript, React',
  authors: [{ name: 'Md. Jehadur Rahman Emran' }],
  openGraph: {
    type: 'website',
    url: 'https://jehadur.dev',
    title: 'Md. Jehadur Rahman Emran - Software Engineer & Researcher',
    description: 'Passionate software engineer with expertise in full-stack development, research, and innovative problem-solving.',
    images: [
      {
        url: 'https://github.com/JehadurRE.png',
        width: 400,
        height: 400,
        alt: 'Md. Jehadur Rahman Emran',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Md. Jehadur Rahman Emran - Software Engineer & Researcher',
    description: 'Passionate software engineer with expertise in full-stack development, research, and innovative problem-solving.',
    images: ['https://github.com/JehadurRE.png'],
  },
  icons: {
    icon: 'https://github.com/JehadurRE.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}