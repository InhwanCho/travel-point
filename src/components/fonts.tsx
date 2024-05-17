'use client';
import { fontMono, fontSans, fontSpoqa } from '@/libs/fonts';

export default function Fonts() {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-spoqa: ${fontSpoqa.style.fontFamily};
          --font-mono: ${fontMono.style.fontFamily};
          --font-sans: ${fontSans.style.fontFamily};
        }
      `}</style>
    </>
  );
}
