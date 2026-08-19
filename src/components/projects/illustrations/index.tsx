"use client";

import type { ComponentType } from "react";
import { BalancScene } from "./BalancScene";
import { TurismoScene } from "./TurismoScene";
import { AgroCashScene } from "./AgroCashScene";
import { BienestarScene } from "./BienestarScene";
import { AvaluadorScene } from "./AvaluadorScene";
import { InmuebleScene } from "./InmuebleScene";

const SCENES: Record<string, ComponentType> = {
  "balanc-funcional": BalancScene,
  "turismo-sostenible": TurismoScene,
  agrocash: AgroCashScene,
  "bienestar-a-la-carta": BienestarScene,
  "avaluador-playground": AvaluadorScene,
  "publicacion-inmueble": InmuebleScene,
};

export function hasVectorIllustration(slug: string) {
  return slug in SCENES;
}

export function VectorIllustration({ slug }: { slug: string }) {
  const SceneC = SCENES[slug];
  if (!SceneC) return null;
  return <SceneC />;
}
