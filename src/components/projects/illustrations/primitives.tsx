"use client";

/*
 * Primitivas vectoriales usadas por las escenas. Equivalentes a los bloques
 * de LottieLab: líneas que se dibujan (trim path), barras que crecen,
 * pings, scan beams y anillos de medidor que se revelan.
 */

import { motion, type Transition } from "framer-motion";
import type { ReactNode } from "react";
import { Elem, EASE, enterVariants, type EnterKind } from "./motion";

/* ------------------------------- Líneas ------------------------------- */

interface DrawLineProps {
  d: string;
  stroke: string;
  width?: number;
  dasharray?: string;
  enterDelay?: number;
  /** true → bucle de dibujo continuo; false → se dibuja una vez al entrar. */
  loop?: boolean;
  loopDuration?: number;
  opacity?: number;
}

export function DrawLine({
  d,
  stroke,
  width = 3,
  dasharray,
  enterDelay = 0,
  loop = true,
  loopDuration = 5,
  opacity = 0.9,
}: DrawLineProps) {
  if (loop) {
    return (
      <Elem enter={enterVariants("fade", enterDelay)}>
        <motion.path
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={width}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dasharray}
          initial={false}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0.15, opacity, opacity, 0.15] }}
          transition={{ duration: loopDuration, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "stroke-dashoffset" }}
        />
      </Elem>
    );
  }
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dasharray}
      variants={enterVariants("draw", enterDelay)}
      style={{ opacity: 0, willChange: "stroke-dashoffset" }}
    />
  );
}

/* ------------------------------ Barras que crecen ------------------------------ */

interface Bar {
  x: number;
  y: number;
  h: number;
  w: number;
  fill: string;
  delay?: number;
}

interface GrowBarsProps {
  bars: Bar[];
  rx?: number;
  stagger?: number;
}

/** Barras de datos estilo "Statistics widget" que crecen escalonadas desde abajo. */
export function GrowBars({ bars, rx = 3, stagger = 0.16 }: GrowBarsProps) {
  return (
    <g>
      {bars.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          width={b.w}
          rx={rx}
          fill={b.fill}
          variants={{
            hidden: { opacity: 0, y: b.y + b.h, height: 0 },
            show: {
              opacity: 1,
              y: b.y,
              height: b.h,
              transition: { duration: 1, ease: EASE.natural, delay: b.delay ?? i * stagger },
            },
          }}
        />
      ))}
    </g>
  );
}

/* --------------------------------- Pings --------------------------------- */

interface PingProps {
  cx: number;
  cy: number;
  r?: number;
  fill: string;
  stroke?: string;
  period?: number;
  delay?: number;
  strokeWidth?: number;
}

/** Punto con anillos de expansión (estado "activo/sincronizando"). */
export function Ping({ cx, cy, r = 6, fill, stroke, period = 2.6, delay = 0, strokeWidth = 2 }: PingProps) {
  return (
    <g>
      {[0, 1].map((i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={stroke ?? fill}
          strokeWidth={strokeWidth}
          initial={false}
          animate={{ r: [r, r * 2.6], opacity: [0.85, 0] }}
          transition={{ duration: period, repeat: Infinity, ease: "easeOut", delay: delay + i * (period / 2) }}
        />
      ))}
      <circle cx={cx} cy={cy} r={r} fill={fill} />
    </g>
  );
}

/* ------------------------------- Scan beam ------------------------------- */

interface ScanBeamProps {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  period?: number;
  delay?: number;
}

/** Línea de escaneo que barre un documento en vertical (estilo KYC). */
export function ScanBeam({ x, y, w, h, color, period = 4.2, delay = 0 }: ScanBeamProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill="none"
        stroke={color}
        strokeOpacity={0.35}
        strokeWidth={2}
      />
      <motion.rect
        x={x}
        y={y - 3}
        width={w}
        height={5}
        rx={2.5}
        fill={color}
        initial={false}
        animate={{ y: [y - 3, y + h - 3, y - 3] }}
        transition={{ duration: period, repeat: Infinity, ease: "easeInOut", delay }}
        style={{ willChange: "transform" }}
      />
      <motion.rect
        x={x}
        y={y - 6}
        width={w}
        height={12}
        fill={`url(#scanFade)`}
        style={{ color, willChange: "transform" }}
        initial={false}
        animate={{ y: [y - 6, y + h - 6, y - 6], opacity: [0, 0.55, 0] }}
        transition={{ duration: period, repeat: Infinity, ease: "easeInOut", delay }}
      />
    </g>
  );
}

/* ------------------------------ Anillo medidor ------------------------------ */

interface ArcRingProps {
  cx: number;
  cy: number;
  r: number;
  stroke: string;
  width?: number;
  delay?: number;
  rotate?: number;
  /** Anillo fantasma de fondo (pista del medidor). */
  track?: boolean;
  trackStroke?: string;
}

/** Anillo de medidor que se dibuja al entrar (pathLength), estilo Meter Card. */
export function ArcRing({
  cx,
  cy,
  r,
  stroke,
  width = 6,
  delay = 0,
  rotate = -90,
  track = false,
  trackStroke = "rgba(255,255,255,0.07)",
}: ArcRingProps) {
  return (
    <g transform={`rotate(${rotate} ${cx} ${cy})`}>
      {track && <circle cx={cx} cy={cy} r={r} fill="none" stroke={trackStroke} strokeWidth={width} />}
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={stroke}
        strokeWidth={width}
        strokeLinecap="round"
        variants={enterVariants("draw", delay)}
        style={{ opacity: 0, willChange: "stroke-dashoffset" }}
      />
    </g>
  );
}

/* --------------------------------- UI mock --------------------------------- */

interface PhoneProps {
  x: number;
  y: number;
  w: number;
  h: number;
  bezel?: string;
  screen?: string;
  children?: ReactNode;
}

export function Phone({ x, y, w, h, bezel = "#0f1622", screen = "#0b1422", children }: PhoneProps) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={30} fill={bezel} />
      <rect x={x + 5} y={y + 5} width={w - 10} height={h - 10} rx={25} fill={screen} />
      <rect x={x + w / 2 - 28} y={y + 14} width={56} height={8} rx={4} fill={bezel} />
      {children}
    </g>
  );
}

interface CardProps {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  rx?: number;
  stroke?: string;
  strokeOpacity?: number;
  strokeWidth?: number;
  opacity?: number;
}

export function Card({ x, y, w, h, fill, rx = 14, stroke, strokeOpacity = 0.5, strokeWidth = 1.5, opacity = 1 }: CardProps) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={rx}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeOpacity={stroke ? strokeOpacity : undefined}
      opacity={opacity}
    />
  );
}

interface PillProps {
  x: number;
  y: number;
  w: number;
  h: number;
  text?: string;
  fill: string;
  stroke?: string;
  textFill?: string;
  fontSize?: number;
  enter?: EnterKind;
  enterDelay?: number;
  floatT?: Transition;
  hover?: boolean;
  children?: ReactNode;
}

/** Píldora flotante estilo bento (chip de datos/accent). */
export function Pill({
  x,
  y,
  w,
  h,
  text,
  fill,
  stroke,
  textFill = "#e6f6ff",
  fontSize = 15,
  enter = "pop",
  enterDelay = 0,
  floatT,
  hover = true,
  children,
}: PillProps) {
  return (
    <Elem
      enter={enterVariants(enter, enterDelay)}
      loop={
        floatT
          ? { y: [0, -8, 0] }
          : undefined
      }
      loopT={floatT ?? { duration: 5, repeat: Infinity, ease: "easeInOut" }}
      hover={hover ? { y: -10, scale: 1.06 } : undefined}
    >
      <g>
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx={h / 2}
          fill={fill}
          stroke={stroke}
          strokeOpacity={stroke ? 0.55 : undefined}
        />
        {children}
        {text && (
          <text
            x={x + w / 2}
            y={y + h / 2}
            fontSize={fontSize}
            fontWeight={600}
            fill={textFill}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {text}
          </text>
        )}
      </g>
    </Elem>
  );
}

interface TxtProps {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  fill?: string;
  weight?: number;
  anchor?: "start" | "middle" | "end";
  spacing?: number;
}

export function Txt({ x, y, children, size = 16, fill = "#e2e8f0", weight = 600, anchor = "start", spacing }: TxtProps) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={fill}
      fontWeight={weight}
      textAnchor={anchor}
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      letterSpacing={spacing}
      dominantBaseline="central"
    >
      {children}
    </text>
  );
}

/** Fondo degradado suave + glow radial para la escena. */
export function SceneBg({ top, bottom, glowCx, glowCy, glowR, glowColor, glowOpacity = 0.4 }: {
  top: string;
  bottom: string;
  glowCx: number;
  glowCy: number;
  glowR: number;
  glowColor: string;
  glowOpacity?: number;
}) {
  return (
    <g>
      <defs>
        <linearGradient id="sceneBg" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor={top} />
          <stop offset="100%" stopColor={bottom} />
        </linearGradient>
        <radialGradient id="sceneGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glowColor} stopOpacity={glowOpacity} />
          <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="scanFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect width={800} height={600} fill="url(#sceneBg)" />
      <circle cx={glowCx} cy={glowCy} r={glowR} fill="url(#sceneGlow)" />
    </g>
  );
}

/** Retícula tenue de fondo, muy usada en los backgrounds de LottieLab. */
export function Grid({ color = "rgba(255,255,255,0.04)", step = 40 }: { color?: string; step?: number }) {
  const lines: ReactNode[] = [];
  for (let x = 0; x <= 800; x += step) {
    lines.push(<line key={`v${x}`} x1={x} y1={0} x2={x} y2={600} stroke={color} strokeWidth={1} />);
  }
  for (let y = 0; y <= 600; y += step) {
    lines.push(<line key={`h${y}`} x1={0} y1={y} x2={800} y2={y} stroke={color} strokeWidth={1} />);
  }
  return <g>{lines}</g>;
}

export const ZERO_T: Transition = { duration: 0.3 };
