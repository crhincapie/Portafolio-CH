"use client";

import { motion } from "framer-motion";
import { Elem, enterVariants, Scene } from "./motion";
import { Card, Grid, Ping, Pill, SceneBg, Txt } from "./primitives";

const C = {
  top: "#171233",
  bottom: "#100d26",
  card: "#221b40",
  cardHi: "#2e2654",
  lavender: "#a5b4fc",
  mint: "#6ee7b7",
  coral: "#fda4af",
  gold: "#fcd34d",
  text: "#eeeaf9",
  dim: "#7d749e",
};

const ICONS = [
  {
    x: 112,
    y: 136,
    color: C.coral,
    d: "M12 21.3s-6.8-4.4-9.5-8.2C.8 10.4 1.6 6.5 4.6 4.9 6.7 3.7 9.2 4.2 10.7 6c1.5-1.8 4-2.3 6.1-1.1 3 1.6 3.8 5.5 2.1 8.2-2.7 3.8-9.5 8.2-9.5 8.2z",
    label: "Cuerpo",
  },
  {
    x: 208,
    y: 136,
    color: C.mint,
    d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10zM2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",
    label: "Naturaleza",
  },
  {
    x: 112,
    y: 214,
    color: C.lavender,
    d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
    label: "Sueño",
  },
  {
    x: 208,
    y: 214,
    color: C.gold,
    d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
    label: "Energía",
  },
];

const ROWS = [
  { y: 164, w: 130, price: "$ 45", color: C.coral },
  { y: 196, w: 104, price: "$ 60", color: C.mint },
  { y: 228, w: 118, price: "$ 38", color: C.lavender },
];

export function BienestarScene() {
  return (
    <Scene>
      <Elem enter={enterVariants("fade", 0.05)}>
        <SceneBg top={C.top} bottom={C.bottom} glowCx={640} glowCy={100} glowR={330} glowColor={C.lavender} glowOpacity={0.32} />
        <Grid color="rgba(165,180,252,0.05)" />
      </Elem>

      {/* Categorías */}
      <Elem enter={enterVariants("rise", 0.2)} hover={{ scale: 1.02 }}>
        <g>
          <Card x={64} y={64} w={300} h={192} fill={C.card} rx={20} stroke={C.lavender} strokeOpacity={0.25} />
          <Txt x={86} y={92} size={14} fill={C.text}>
            Categorías
          </Txt>
          {ICONS.map((icon, i) => (
            <Elem key={i} enter={enterVariants("pop", 0.35 + i * 0.15)} loop={{ y: [0, -6, 0] }} loopT={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }} hover={{ y: -10, scale: 1.12 }}>
              <g>
                <circle cx={icon.x} cy={icon.y} r={26} fill={C.cardHi} stroke={icon.color} strokeOpacity={0.55} strokeWidth={1.5} />
                <motion.path
                  d={icon.d}
                  transform={`translate(${icon.x - 19} ${icon.y - 19}) scale(1.6)`}
                  fill="none"
                  stroke={icon.color}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={enterVariants("draw", 0.6 + i * 0.15)}
                  style={{ opacity: 0, willChange: "stroke-dashoffset" }}
                />
                <Txt x={icon.x} y={icon.y + 44} size={11} fill={C.dim} anchor="middle">
                  {icon.label}
                </Txt>
              </g>
            </Elem>
          ))}
        </g>
      </Elem>

      {/* Servicios */}
      <Elem enter={enterVariants("rise", 0.3)} hover={{ scale: 1.015 }}>
        <g>
          <Card x={400} y={64} w={340} h={268} fill={C.card} rx={24} stroke={C.mint} strokeOpacity={0.25} />
          <Txt x={424} y={94} size={14} fill={C.text}>
            Servicios
          </Txt>
          {[
            { x: 424, label: "Todos", color: C.coral },
            { x: 490, label: "Fisio", color: C.mint },
            { x: 554, label: "Mental", color: C.lavender },
            { x: 626, label: "Nutri", color: C.gold },
          ].map((f, i) => (
            <Elem key={i} enter={enterVariants("pop", 0.4 + i * 0.1)}>
              <g>
                <rect x={f.x} y={116} width={58} height={26} rx={13} fill={f.color} opacity={i === 0 ? 1 : 0.16} />
                <Txt x={f.x + 29} y={129} size={11} fill={i === 0 ? "#170f33" : C.text} weight={600} anchor="middle">
                  {f.label}
                </Txt>
              </g>
            </Elem>
          ))}
          {ROWS.map((row, i) => (
            <Elem key={i} enter={enterVariants("slideL", 0.55 + i * 0.18)}>
              <g>
                <circle cx={436} cy={row.y} r={12} fill={C.cardHi} stroke={row.color} strokeOpacity={0.6} strokeWidth={1.5} />
                <rect x={458} y={row.y - 5} width={row.w} height={8} rx={4} fill={C.cardHi} />
                <rect x={458} y={row.y + 7} width={86} height={6} rx={3} fill={C.cardHi} opacity={0.6} />
                <Txt x={612} y={row.y} size={13} fill={row.color} anchor="end">
                  {row.price}
                </Txt>
                <circle cx={702} cy={row.y} r={11} fill="none" stroke={row.color} strokeOpacity={0.6} strokeWidth={2} />
                <motion.path
                  d={`M697 ${row.y} l3 3 6 -6`}
                  fill="none"
                  stroke={row.color}
                  strokeWidth={2}
                  strokeLinecap="round"
                  variants={enterVariants("draw", 0.75 + i * 0.18)}
                  style={{ opacity: 0, willChange: "stroke-dashoffset" }}
                />
              </g>
            </Elem>
          ))}
        </g>
      </Elem>

      {/* Pago confirmado */}
      <Elem enter={enterVariants("rise", 0.45)} hover={{ scale: 1.02 }}>
        <g>
          <Card x={400} y={368} w={340} h={156} fill={C.cardHi} rx={24} stroke={C.mint} strokeOpacity={0.35} strokeWidth={1.5} />
          <Txt x={424} y={398} size={14} fill={C.text}>
            Pago confirmado
          </Txt>
          <circle cx={472} cy={442} r={24} fill="none" stroke={C.mint} strokeWidth={2.5} />
          <motion.path
            d="M464 442 l6 6 12 -12"
            fill="none"
            stroke={C.mint}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={enterVariants("draw", 0.8)}
            style={{ opacity: 0, willChange: "stroke-dashoffset" }}
          />
          <Elem enter={enterVariants("fade", 0.95)} loop={{ opacity: [0.6, 1, 0.6] }} loopT={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}>
            <Txt x={512} y={436} size={13} fill={C.dim}>
              Sesión con Valentina
            </Txt>
            <Txt x={512} y={458} size={15} fill={C.mint} weight={700}>
              Lista para empezar
            </Txt>
          </Elem>
        </g>
      </Elem>

      {/* Chips flotantes */}
      <Elem enter={enterVariants("pop", 0.6)} loop={{ scale: [1, 1.14, 1] }} loopT={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} hover={{ scale: 1.18 }}>
        <g>
          <rect x={56} y={330} width={64} height={64} rx={18} fill={C.cardHi} stroke={C.coral} strokeOpacity={0.5} strokeWidth={1.5} />
          <motion.path
            d="M12 21.3s-6.8-4.4-9.5-8.2C.8 10.4 1.6 6.5 4.6 4.9 6.7 3.7 9.2 4.2 10.7 6c1.5-1.8 4-2.3 6.1-1.1 3 1.6 3.8 5.5 2.1 8.2-2.7 3.8-9.5 8.2-9.5 8.2z"
            transform="translate(52 326) scale(1.5)"
            fill={C.coral}
          />
        </g>
      </Elem>

      <Pill x={600} y={118} w={110} h={32} text="Nuevo · 12" fill={C.cardHi} stroke={C.gold} textFill={C.gold} fontSize={12} enter="pop" enterDelay={0.7} floatT={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }} />

      <Elem enter={enterVariants("pop", 0.9)}>
        <Ping cx={686} cy={300} r={5} fill={C.lavender} period={2.5} delay={0.6} />
      </Elem>
      <Elem enter={enterVariants("pop", 1)} loop={{ y: [0, -8, 0], x: [0, 6, 0] }} loopT={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <circle cx={110} cy={512} r={4} fill={C.mint} opacity={0.6} />
      </Elem>
      <Elem enter={enterVariants("pop", 1.1)} loop={{ y: [0, -7, 0] }} loopT={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}>
        <circle cx={320} cy={500} r={4} fill={C.coral} opacity={0.55} />
      </Elem>
    </Scene>
  );
}
