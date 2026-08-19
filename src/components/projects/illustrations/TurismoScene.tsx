"use client";

import { motion } from "framer-motion";
import { Elem, enterVariants, Scene } from "./motion";
import { Card, DrawLine, Grid, Ping, Pill, SceneBg, Txt } from "./primitives";

const C = {
  top: "#0c1d1d",
  bottom: "#071313",
  card: "#10241f",
  cardHi: "#1d4038",
  sun: "#fbbf24",
  amber: "#fcd34d",
  teal: "#2dd4bf",
  mint: "#6ee7b7",
  sky: "#38bdf8",
  text: "#e6f2ee",
  dim: "#6f8f87",
  leaf: "#4ade80",
};

const SUN_RAYS: Array<[number, number, number, number]> = [
  [0, -34, 0, -24],
  [0, 34, 0, 24],
  [-34, 0, -24, 0],
  [34, 0, 24, 0],
  [-24, -24, -17, -17],
  [24, 24, 17, 17],
  [24, -24, 17, -17],
  [-24, 24, -17, 17],
];

export function TurismoScene() {
  return (
    <Scene>
      <Elem enter={enterVariants("fade", 0.05)}>
        <SceneBg top={C.top} bottom={C.bottom} glowCx={220} glowCy={120} glowR={340} glowColor={C.sun} glowOpacity={0.3} />
        <Grid color="rgba(45,212,191,0.04)" />
      </Elem>

      {/* Card editorial con paisaje */}
      <Elem enter={enterVariants("rise", 0.2)} hover={{ scale: 1.015 }}>
        <g>
          <Card x={400} y={66} w={340} h={316} fill={C.card} rx={24} stroke={C.teal} strokeOpacity={0.25} />

          {/* Paisaje: cielo → atardecer */}
          <defs>
            <linearGradient id="mountSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1c3a47" />
              <stop offset="100%" stopColor="#0b1d1a" />
            </linearGradient>
          </defs>
          <rect x={418} y={86} width={304} height={176} rx={16} fill="url(#mountSky)" />

          {/* Sol con rayos que giran lentamente */}
          <circle cx={576} cy={148} r={120} fill={C.sun} opacity={0.14} />
          <circle cx={576} cy={148} r={30} fill={C.sun} />
          <Elem enter={enterVariants("fade", 0.4)} loop={{ rotate: 360 }} loopT={{ duration: 32, repeat: Infinity, ease: "linear" }}>
            <g transform="translate(576 148)">
              {SUN_RAYS.map(([x1, y1, x2, y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.amber} strokeWidth={3} strokeLinecap="round" opacity={0.9} />
              ))}
            </g>
          </Elem>

          {/* Montañas */}
          <path
            d="M418 262 L474 200 L512 240 L560 170 L612 232 L660 194 L700 232 L722 232 L722 262 Z"
            fill="#0b1d1a"
          />
          <motion.path
            d="M474 200 L512 240 L560 170 L612 232 L660 194"
            fill="none"
            stroke={C.sky}
            strokeWidth={2.5}
            strokeLinecap="round"
            variants={enterVariants("draw", 0.6)}
            style={{ opacity: 0, willChange: "stroke-dashoffset" }}
          />

          {/* Título + score */}
          <rect x={418} y={282} width={200} height={10} rx={5} fill={C.cardHi} />
          <rect x={418} y={300} width={140} height={8} rx={4} fill={C.cardHi} opacity={0.7} />
          <Pill x={598} y={342} w={126} h={30} text="CO₂ · -34%" fill={C.cardHi} stroke={C.teal} textFill={C.mint} fontSize={12} enter="pop" enterDelay={0.8} floatT={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} />
        </g>
      </Elem>

      {/* Mapa con ruta que se dibuja */}
      <Elem enter={enterVariants("rise", 0.3)} hover={{ scale: 1.02 }}>
        <g>
          <Card x={64} y={330} w={300} h={180} fill={C.card} rx={20} stroke={C.teal} strokeOpacity={0.25} />
          <Txt x={86} y={356} size={12} fill={C.dim}>
            Ruta · 3 paradas · sin huella
          </Txt>
          <DrawLine d="M92 462 C 142 404, 198 470, 254 424 C 286 402, 316 386, 336 380" stroke={C.teal} width={3} dasharray="2 7" enterDelay={0.7} loop loopDuration={4.6} />
          <Elem enter={enterVariants("pop", 0.55)}>
            <Ping cx={92} cy={462} r={5} fill={C.amber} period={2.4} />
          </Elem>
          <Elem enter={enterVariants("pop", 1)}>
            <Ping cx={336} cy={380} r={5} fill={C.teal} period={2.6} delay={0.4} />
          </Elem>
          {[
            [150, 440],
            [210, 462],
            [272, 428],
          ].map(([x, y], i) => (
            <Elem key={i} enter={enterVariants("pop", 0.8 + i * 0.15)} loop={{ y: [0, -5, 0] }} loopT={{ duration: 3.6 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}>
              <circle cx={x} cy={y} r={4} fill={C.mint} opacity={0.9} />
            </Elem>
          ))}
        </g>
      </Elem>

      {/* Itinerario */}
      <Elem enter={enterVariants("rise", 0.4)} hover={{ scale: 1.02 }}>
        <g>
          <Card x={64} y={64} w={300} h={212} fill={C.card} rx={20} stroke={C.teal} strokeOpacity={0.25} />
          <Txt x={86} y={92} size={14} fill={C.text}>
            Itinerario
          </Txt>
          {([
            [132, "Día 1 · Llegada"],
            [164, "Día 2 · Bosque"],
            [196, "Día 3 · Ribera"],
          ] as Array<[number, string]>).map(([y], i) => (
            <Elem key={i} enter={enterVariants("slideL", 0.5 + i * 0.18)}>
              <g>
                <circle cx={92} cy={y} r={13} fill="none" stroke={C.teal} strokeOpacity={0.5} strokeWidth={2} />
                <motion.path
                  d="M87.5 132 l3 3 6 -6"
                  fill="none"
                  stroke={C.mint}
                  strokeWidth={2}
                  strokeLinecap="round"
                  variants={enterVariants("draw", 0.7 + i * 0.18)}
                  style={{ opacity: 0, willChange: "stroke-dashoffset" }}
                />
                <rect x={114} y={y - 6} width={170} height={9} rx={4.5} fill={C.cardHi} />
                <rect x={114} y={y + 8} width={120} height={6} rx={3} fill={C.cardHi} opacity={0.6} />
              </g>
            </Elem>
          ))}
        </g>
      </Elem>

      {/* Chips flotantes */}
      <Elem enter={enterVariants("pop", 0.7)} loop={{ rotate: [0, -6, 6, 0] }} loopT={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} hover={{ rotate: 8, scale: 1.1 }}>
        <g>
          <rect x={96} y={540} width={62} height={62} rx={18} fill={C.cardHi} stroke={C.leaf} strokeOpacity={0.5} strokeWidth={1.5} />
          <motion.path
            d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10zM2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"
            transform="translate(96 536) scale(1.4)"
            fill="none"
            stroke={C.leaf}
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={enterVariants("draw", 0.95)}
            style={{ opacity: 0, willChange: "stroke-dashoffset" }}
          />
        </g>
      </Elem>

      <Pill x={430} y={418} w={150} h={40} text="Reservar" fill={C.amber} textFill="#082120" fontSize={14} enter="pop" enterDelay={0.9} floatT={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }} />
      <Elem enter={enterVariants("pop", 1.05)}>
        <Ping cx={672} cy={118} r={5} fill={C.teal} period={2.8} delay={0.5} />
      </Elem>
      <Elem enter={enterVariants("pop", 1.15)} loop={{ y: [0, -8, 0] }} loopT={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}>
        <circle cx={700} cy={486} r={4} fill={C.amber} opacity={0.6} />
      </Elem>
    </Scene>
  );
}
