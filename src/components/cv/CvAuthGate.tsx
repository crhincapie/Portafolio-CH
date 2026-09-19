"use client";

import { CvLogin } from "./CvLogin";
import { CvStudio } from "./CvStudio";
import { CvStoreProvider } from "@/lib/cv/useCvStore";

export function CvAuthGate({ authed }: { authed: boolean }) {
  if (!authed) return <CvLogin />;
  return (
    <CvStoreProvider>
      <CvStudio />
    </CvStoreProvider>
  );
}