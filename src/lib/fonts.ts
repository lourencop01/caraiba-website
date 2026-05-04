import localFont from 'next/font/local';

export const cormorantGaramond = localFont({
  src: '../../public/CormorantGaramond-VariableFont_wght.woff2',
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  weight: '100 900',
});
