"use client";

import { LenisProvider } from "@/components/motion/LenisProvider";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { PageLoader } from "@/components/motion/PageLoader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { MotionConfig } from "framer-motion";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LenisProvider>
        <PageLoader />
        <CustomCursor />
        <SkipToContent />
        <Header />
        <main id="contenido-principal" className="relative">
          {children}
        </main>
        <Footer />
      </LenisProvider>
    </MotionConfig>
  );
}
