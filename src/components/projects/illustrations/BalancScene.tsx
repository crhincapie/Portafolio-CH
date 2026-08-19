"use client";

import { motion } from "framer-motion";
import { Elem, enterVariants, EASE, Scene } from "./motion";
import { ArcRing, Card, DrawLine, GrowBars, Grid, Phone, Pill, Ping, SceneBg, Txt } from "./primitives";

const C = {
  top: "#0b1322",
  bottom: "#090f1c",
  card: "#12233b",
  cardHi: "#1b3a54",
  cyan: "#22d3ee",
  mint: "#5eead4",
  text: "#dbe7f4",
  dim: "#5b7391",
  red: "#fb7185",
};

export function BalancScene() {
  return (
    <Scene>
      <Elem enter={enterVariants("fade", 0.05)}>
        <SceneBg top={C.top} bottom={C.bottom} glowCx={620} glowCy={110} glowR={330} glowColor={C.cyan} glowOpacity={0.32} />
        <Grid />
      </Elem>

      {/* App: cabecera + anillo de actividad + métricas + ECG */}
      <Elem enter={enterVariants("rise", 0.15)} hover={{ scale: 1.015 }}>
        <Phone x={150} y={56} w={300} h={470}>
          {/* Cabecera */}
          <circle cx={178} cy={102} r={13} fill={C.cardHi} stroke={C.cyan} strokeOpacity={0.5} strokeWidth={1.5} />
          <rect x={202} y={96} width={120} height={9} rx={4.5} fill={C.cardHi} />
          <rect x={202} y={111} width={84} height={7} rx={3.5} fill={C.cardHi} opacity={0.7} />

          {/* Card del anillo */}
          <Card x={166} y={128} w={268} h={216} fill={C.card} stroke={C.cyan} strokeOpacity={0.18} />
          <Elem enter={enterVariants("fade", 0.35)} loop={{ opacity: [0.85, 1, 0.85] }} loopT={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <ArcRing cx={300} cy={234} r={66} stroke={C.cyan} width={9} track delay={0.5} />
          </Elem>
          <Elem enter={enterVariants("fade", 0.9)}>
            <Txt x={300} y={224} size={30} fill={C.cyan} weight={700} anchor="middle">
              78%
            </Txt>
            <Txt x={300} y={256} size={12} fill={C.dim} anchor="middle">
              Adherencia
            </Txt>
          </Elem>
          <Elem enter={enterVariants("pop", 1)}>
            <Ping cx={386} cy={178} r={5} fill={C.mint} period={2.4} delay={1.2} />
          </Elem>

          {/* Métricas */}
          <Card x={166} y={360} w={130} h={50} fill={C.card} rx={14} />
          <Card x={304} y={360} w={130} h={50} fill={C.card} rx={14} />
          <Elem enter={enterVariants("rise", 0.55)}>
            <Txt x={180} y={380} size={12} fill={C.dim}>
              Pasos
            </Txt>
            <Txt x={280} y={380} size={15} fill={C.text} anchor="end">
              8.4k
            </Txt>
          </Elem>
          <GrowBars
            rx={3}
            stagger={0.12}
            bars={[
              { x: 180, y: 394, h: 8, w: 6, fill: C.cyan },
              { x: 192, y: 390, h: 12, w: 6, fill: C.cyan },
              { x: 204, y: 386, h: 16, w: 6, fill: C.cyan },
              { x: 216, y: 382, h: 20, w: 6, fill: C.cyan },
              { x: 228, y: 384, h: 18, w: 6, fill: C.cyan },
            ]}
          />
          <Elem enter={enterVariants("rise", 0.6)}>
            <Txt x={318} y={380} size={12} fill={C.dim}>
              Sueño
            </Txt>
            <Txt x={420} y={380} size={15} fill={C.text} anchor="end">
              7h 20m
            </Txt>
          </Elem>

          {/* ECG */}
          <Card x={166} y={420} w={268} h={84} fill={C.card} rx={16} stroke={C.cyan} strokeOpacity={0.18} />
          <Elem enter={enterVariants("fade", 0.75)}>
            <motion.circle cx={186} cy={444} r={8} fill="none" stroke={C.red} strokeWidth={2} />
            <motion.path
              d="M186 444 c-2 -3 -3 -3 -4 0 c-1 3 -1 3 -3 1 c-2 -2 -3 -2 -4 0 l-1 1"
              fill="none"
              stroke={C.red}
              strokeWidth={2}
            />
            <Txt x={200} y={444} size={12} fill={C.dim}>
              Ritmo · 62 bpm
            </Txt>
          </Elem>
          <DrawLine
            d="M176 466 H190 l6 -12 8 22 6 -14 7 12 6 -6 H424"
            stroke={C.mint}
            width={2.5}
            enterDelay={0.95}
            loop
            loopDuration={4.2}
          />
        </Phone>
      </Elem>

      {/* Chip corazón flotante: el corazón se dibuja solo */}
      <Elem enter={enterVariants("pop", 0.5)} loop={{ y: [0, -9, 0] }} loopT={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }} hover={{ y: -14, scale: 1.08 }}>
        <rect x={492} y={140} width={66} height={66} rx={18} fill={C.cardHi} stroke={C.cyan} strokeOpacity={0.5} strokeWidth={1.5} />
        <motion.path
          d="M12 21.3s-6.8-4.4-9.5-8.2C.8 10.4 1.6 6.5 4.6 4.9 6.7 3.7 9.2 4.2 10.7 6c1.5-1.8 4-2.3 6.1-1.1 3 1.6 3.8 5.5 2.1 8.2-2.7 3.8-9.5 8.2-9.5 8.2z"
          transform="translate(507 155) scale(1.5)"
          fill="none"
          stroke={C.red}
          strokeWidth={2.2}
          strokeLinejoin="round"
          variants={enterVariants("draw", 0.75)}
          style={{ opacity: 0, willChange: "stroke-dashoffset" }}
        />
        <Txt x={525} y={222} size={11} fill={C.dim} anchor="middle">
          Hábitos
        </Txt>
      </Elem>

      {/* Ping + cita + programa */}
      <Elem enter={enterVariants("pop", 0.85)}>
        <Ping cx={474} cy={106} r={6} fill={C.cyan} period={2.2} delay={1} />
      </Elem>
      <Pill x={118} y={228} w={136} h={36} text="Cita · 9:00" fill={C.cardHi} stroke={C.cyan} textFill={C.cyan} fontSize={13} enter="slideL" enterDelay={0.6} />

      <Elem enter={enterVariants("rise", 0.7)} loop={{ y: [0, -7, 0] }} loopT={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} hover={{ y: -12, scale: 1.05 }}>
        <g>
          <rect x={520} y={312} width={192} height={92} rx={18} fill={C.cardHi} stroke={C.cyan} strokeOpacity={0.3} strokeWidth={1.5} />
          <Txt x={540} y={336} size={14} fill={C.text}>
            Programa
          </Txt>
          <Txt x={540} y={358} size={12} fill={C.dim}>
            Semana 3 · 5 de 7 días
          </Txt>
          <rect x={540} y={374} width={150} height={6} rx={3} fill="rgba(255,255,255,0.08)" />
          <motion.rect
            x={540}
            y={374}
            width={0}
            height={6}
            rx={3}
            fill={C.mint}
            variants={{
              hidden: { width: 0 },
              show: { width: 112, transition: { duration: 1.4, ease: EASE.natural, delay: 0.95 } },
            }}
          />
          <motion.circle cx={694} cy={362} r={10} fill="none" stroke={C.mint} strokeWidth={2} variants={enterVariants("pop", 1.05)} />
          <motion.path
            d="M690 362 l3 3 6 -6"
            fill="none"
            stroke={C.mint}
            strokeWidth={2}
            strokeLinecap="round"
            variants={enterVariants("draw", 1.2)}
            style={{ opacity: 0, willChange: "stroke-dashoffset" }}
          />
        </g>
      </Elem>

      {/* Detalle ECG arriba a la derecha + orbes */}
      <DrawLine d="M560 88 c6 -16 10 -2 14 -16 4 -14 8 -2 12 -16" stroke={C.cyan} width={2.5} enterDelay={1.05} loop loopDuration={3.4} opacity={0.8} />
      <Elem enter={enterVariants("pop", 1.15)} loop={{ x: [0, 8, 0], y: [0, -6, 0] }} loopT={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
        <circle cx={712} cy={488} r={4} fill={C.cyan} opacity={0.6} />
      </Elem>
      <Elem enter={enterVariants("pop", 1.25)} loop={{ y: [0, -8, 0] }} loopT={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}>
        <circle cx={120} cy={472} r={4} fill={C.mint} opacity={0.55} />
      </Elem>
    </Scene>
  );
}
