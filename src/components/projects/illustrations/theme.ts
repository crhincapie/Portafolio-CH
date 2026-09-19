"use client";

/*
 * Infraestructura de color consciente del tema para las ilustraciones.
 *
 * Las escenas se definen con una paleta (C) y un puñado de valores "hardcoded"
 * (tracks rgba(255,255,255,…), knobs, texto sobre acentos). En modo claro las
 * superficies deben invertirse pero la composición, tamaño y animación quedan
 * intactos. Este módulo centraliza la selección de paleta por tema y los tokens
 * compartidos que usan las escenas y primitivas.
 */

import { useTheme } from "@/components/theme/ThemeProvider";

export function useSceneTheme() {
  const { theme } = useTheme();
  return theme === "light";
}

/**
 * Devuelve el tema y la paleta elegida para una escena (C). Cada escena define
 * su contraparte clara manteniendo el mismo contrato de claves.
 */
export function usePalette<C extends Record<string, string>>(dark: C, lightPal: C) {
  const light = useSceneTheme();
  return light ? lightPal : dark;
}

/**
 * Tracks/underlays "blancos" dibujados sobre paneles oscuros. En modo claro el
 * panel es blanco, así que la pasada debe volverse un gris oscuro muy suave.
 */
export function track(alpha: number, light: boolean) {
  return light ? `rgba(24,24,27,${alpha})` : `rgba(255,255,255,${alpha})`;
}

/** Texto oscuro dibujado sobre acentos brillantes (p.ej. el "$" sobre el ámbar). */
export const ON_ACCENT_DARK = "#082020";
/** Versión clara de ON_ACCENT_DARK sobre acentos en modo claro. */
export const ON_ACCENT_LIGHT = "#ffffff";