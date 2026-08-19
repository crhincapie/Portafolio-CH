"use client";

import { motion } from "framer-motion";
import { Elem, enterVariants, EASE, Scene } from "./motion";
import { Card, Grid, Ping, Pill, SceneBg, Txt } from "./primitives";

const C = {
  top: "#14102a",
  bottom: "#0e0a22",
  card: "#221a44",
  cardHi: "#2d2460",
  indigo: "#a78bfa",
  cyan: "#22d3ee",
  gold: "#fcd34d",
  mint: "#6ee7b7",
  text: "#efecfb",
  dim: "#8479b8",
};

const STEPS = [
  { x: 250, done: true },
  { x: 330, done: true },
  { x: 410, done: false },
  { x: 490, done: false },
];

const FIELDS = [
  { y: 206, label: 70 },
  { y: 248, label: 92 },
  { y: 290, label: 56 },
];

export function InmuebleScene() {
  return (
    <Scene>
      <Elem enter={enterVariants("fade", 0.05)}>
        <SceneBg top={C.top} bottom={C.bottom} glowCx={400} glowCy={80} glowR={360} glowColor={C.indigo} glowOpacity={0.34} />
        <Grid color="rgba(167,139,250,0.05)" />
      </Elem>

      {/* Formulario multi-paso */}
      <Elem enter={enterVariants("rise", 0.2)} hover={{ scale: 1.015 }}>
        <g>
          <Card x={180} y={64} w={440} h={312} fill={C.card} rx={24} stroke={C.indigo} strokeOpacity={0.3} strokeWidth={1.5} />

          {/* Pasos */}
          <line x1={266} y1={104} x2={474} y2={104} stroke="rgba(255,255,255,0.1)" strokeWidth={3} />
          <motion.line
            x1={266}
            y1={104}
            x2={330}
            y2={104}
            stroke={C.cyan}
            strokeWidth={3}
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0 },
              show: { pathLength: 1, transition: { duration: 1, ease: EASE.natural, delay: 0.4 } },
            }}
            style={{ opacity: 0, willChange: "stroke-dashoffset" }}
          />
          {STEPS.map((s, i) => (
            <Elem key={i} enter={enterVariants("pop", 0.3 + i * 0.14)}>
              <g>
                <circle cx={s.x} cy={104} r={16} fill={s.done ? C.cyan : C.cardHi} stroke={s.done ? "none" : C.indigo} strokeOpacity={0.5} strokeWidth={2} />
                {s.done ? (
                  <motion.path
                    d={`M${s.x - 5} 104 l4 4 8 -8`}
                    fill="none"
                    stroke="#14102a"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={enterVariants("draw", 0.5 + i * 0.14)}
                    style={{ opacity: 0, willChange: "stroke-dashoffset" }}
                  />
                ) : (
                  <Txt x={s.x} y={106} size={13} fill={C.dim} weight={700} anchor="middle">
                    {i + 1}
                  </Txt>
                )}
              </g>
            </Elem>
          ))}
          <Elem enter={enterVariants("pop", 0.85)}>
            <Ping cx={410} cy={104} r={5} fill={C.gold} period={2.4} delay={0.6} />
          </Elem>

          <Txt x={200} y={158} size={17} fill={C.text} weight={700}>
            Publicar inmueble
          </Txt>

          {/* Barra de progreso */}
          <rect x={200} y={176} width={400} height={8} rx={4} fill="rgba(255,255,255,0.09)" />
          <motion.rect
            x={200}
            y={176}
            width={0}
            height={8}
            rx={4}
            fill={C.cyan}
            variants={{
              hidden: { width: 0 },
              show: { width: 292, transition: { duration: 1.8, ease: EASE.natural, delay: 0.45 } },
            }}
          />

          {/* Campos */}
          {FIELDS.map((f, i) => (
            <Elem key={i} enter={enterVariants("slideL", 0.55 + i * 0.18)}>
              <g>
                <rect x={200} y={f.y} width={f.label} height={7} rx={3.5} fill={C.cardHi} />
                <rect x={200} y={f.y + 14} width={400} height={26} rx={8} fill={C.cardHi} stroke={C.indigo} strokeOpacity={0.35} strokeWidth={1.5} />
                <rect x={212} y={f.y + 23} width={160} height={8} rx={4} fill="rgba(255,255,255,0.14)" />
              </g>
            </Elem>
          ))}

          <Pill x={460} y={328} w={142} h={38} text="Publicar" fill={C.cyan} textFill="#14102a" fontSize={14} enter="pop" enterDelay={0.95} floatT={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }} />
        </g>
      </Elem>

      {/* Vista previa del inmueble */}
      <Elem enter={enterVariants("rise", 0.4)} hover={{ scale: 1.03 }}>
        <g>
          <Card x={400} y={416} w={340} h={128} fill={C.cardHi} rx={20} stroke={C.mint} strokeOpacity={0.35} strokeWidth={1.5} />
          <circle cx={440} cy={480} r={34} fill={C.card} stroke={C.mint} strokeOpacity={0.4} strokeWidth={1.5} />
          <motion.path
            d="M12 8.5 3.5 15H7v5h4v-4h2v4h4v-5h3.5L12 8.5zM12 6l9 7.5v2h-3v5h-5v-4h-2v4H7v-5H3v-2L12 6z"
            transform="translate(424 464) scale(1.4)"
            fill="none"
            stroke={C.mint}
            strokeWidth={1.6}
            strokeLinejoin="round"
            variants={enterVariants("draw", 0.7)}
            style={{ opacity: 0, willChange: "stroke-dashoffset" }}
          />
          <rect x={488} y={446} width={200} height={9} rx={4.5} fill={C.card} />
          <rect x={488} y={464} width={150} height={7} rx={3.5} fill={C.card} opacity={0.8} />
          <Txt x={488} y={494} size={16} fill={C.text} weight={700}>
            $ 480.000.000
          </Txt>
          <Txt x={488} y={514} size={11} fill={C.dim}>
            Apto 2 hab · Terraza · Bogotá
          </Txt>
          <Txt x={726} y={446} size={10} fill={C.mint} anchor="end">
            Aprobado
          </Txt>
        </g>
      </Elem>

      {/* Flotantes */}
      <Elem enter={enterVariants("pop", 0.7)} hover={{ scale: 1.1 }}>
        <g>
          <rect x={70} y={150} width={64} height={64} rx={18} fill={C.cardHi} stroke={C.cyan} strokeOpacity={0.5} strokeWidth={1.5} />
          <circle cx={102} cy={182} r={19} fill="none" stroke={C.mint} strokeWidth={2.5} />
          <motion.path
            d="M95 182 l5 5 10 -10"
            fill="none"
            stroke={C.mint}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={enterVariants("draw", 0.9)}
            style={{ opacity: 0, willChange: "stroke-dashoffset" }}
          />
        </g>
      </Elem>

      <Pill x={70} y={264} w={126} h={34} text="Listo · Paso 2" fill={C.cardHi} stroke={C.gold} textFill={C.gold} fontSize={12} enter="slideL" enterDelay={0.8} floatT={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />

      <Elem enter={enterVariants("pop", 0.9)}>
        <Ping cx={690} cy={150} r={5} fill={C.indigo} period={2.5} delay={0.6} />
      </Elem>
      <Elem enter={enterVariants("pop", 1)} loop={{ y: [0, -8, 0] }} loopT={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}>
        <circle cx={700} cy={560} r={4} fill={C.cyan} opacity={0.6} />
      </Elem>
      <Elem enter={enterVariants("pop", 1.1)} loop={{ y: [0, -6, 0] }} loopT={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}>
        <circle cx={90} cy={540} r={4} fill={C.mint} opacity={0.55} />
      </Elem>
    </Scene>
  );
}
