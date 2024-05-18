'use client';
import { fontMono, fontPretendard, fontSans, fontSpoqa } from '@/libs/fonts';

export default function Fonts() {
  
  return (
    <>
      <style jsx global>{`
        :root {
          --font-spoqa: ${fontSpoqa.style.fontFamily};
          --font-mono: ${fontMono.style.fontFamily};
          --font-sans: ${fontSans.style.fontFamily};
          --font-pretandard: ${fontPretendard.style.fontFamily};
        }
      `}</style>
    </>
  );
}
