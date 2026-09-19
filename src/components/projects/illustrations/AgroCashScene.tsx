"use client";

import { motion } from "framer-motion";
import { Elem, enterVariants, EASE, Scene } from "./motion";
import { Card, DrawLine, Grid, GrowBars, Phone, Ping, Pill, SceneBg, ScanBeam, Txt } from "./primitives";
import { usePalette } from "./theme";

const C_DARK = {
  top: "#0b1017",
  bottom: "#070b11",
  card: "#111c29",
  cardHi: "#1b2b3f",
  amber: "#fbbf24",
  green: "#34d399",
  text: "#e8eef5",
  dim: "#5d7186",
};

const C_LIGHT = {
  top: "#eef6f1",
  bottom: "#ddece2",
  card: "#ffffff",
  cardHi: "#e8f1ea",
  amber: "#d97706",
  green: "#059669",
  text: "#1f2937",
  dim: "#6b7280",
};

export function AgroCashScene() {
  const C = usePalette(C_DARK, C_LIGHT);
  return (
    <Scene>
      <Elem enter={enterVariants("fade", 0.05)}>
        <SceneBg top={C.top} bottom={C.bottom} glowCx={640} glowCy={130} glowR={340} glowColor={C.amber} glowOpacity={0.28} />
        <Grid color="rgba(251,191,36,0.04)" />
      </Elem>

      {/* Dispositivo con la billetera (ahora a la derecha) */}
      <Elem enter={enterVariants("rise", 0.15)} hover={{ scale: 1.015 }}>
        <Phone x={350} y={64} w={300} h={470}>
          {/* Cabecera */}
          <circle cx={378} cy={104} r={13} fill={C.cardHi} stroke={C.amber} strokeOpacity={0.5} strokeWidth={1.5} />
          <rect x={402} y={97} width={110} height={9} rx={4.5} fill={C.cardHi} />
          <rect x={402} y={112} width={76} height={7} rx={3.5} fill={C.cardHi} opacity={0.7} />

          {/* Tarjeta de saldo */}
          <Card x={366} y={126} w={268} h={104} fill={C.card} rx={18} stroke={C.green} strokeOpacity={0.3} strokeWidth={1.5} />
          <Elem enter={enterVariants("pop", 0.45)} loop={{ rotate: 360 }} loopT={{ duration: 6, repeat: Infinity, ease: "linear" }}>
            <g>
              <circle cx={398} cy={164} r={17} fill={C.amber} />
              <circle cx={398} cy={164} r={11} fill="none" stroke="#082020" strokeWidth={2} />
              <Txt x={398} y={166} size={13} fill="#082020" weight={800} anchor="middle">
                $
              </Txt>
            </g>
          </Elem>
          <Txt x={426} y={148} size={12} fill={C.dim}>
            Saldo disponible
          </Txt>
          <Txt x={426} y={173} size={22} fill={C.text} weight={700}>
            $ 2.450.000
          </Txt>
          <rect x={426} y={190} width={110} height={6} rx={3} fill={C.cardHi} />
          <motion.rect
            x={426}
            y={190}
            width={0}
            height={6}
            rx={3}
            fill={C.green}
            variants={{
              hidden: { width: 0 },
              show: { width: 82, transition: { duration: 1.6, ease: EASE.natural, delay: 0.8 } },
            }}
          />

          {/* KYC: documento con scan */}
          <Card x={366} y={248} w={268} h={118} fill={C.card} rx={16} stroke={C.green} strokeOpacity={0.2} />
          <Txt x={386} y={272} size={12} fill={C.dim}>
            Validación de identidad
          </Txt>
          <rect x={386} y={288} width={96} height={58} rx={8} fill="#e4ecef" stroke={C.green} strokeOpacity={0.4} strokeWidth={1.5} />
          <Elem enter={enterVariants("fade", 0.7)}>
            <g>
              <rect x={394} y={300} width={80} height={6} rx={3} fill={C.cardHi} />
              <rect x={394} y={314} width={60} height={6} rx={3} fill={C.cardHi} opacity={0.7} />
              <rect x={394} y={328} width={72} height={6} rx={3} fill={C.cardHi} opacity={0.5} />
            </g>
          </Elem>
          <ScanBeam x={386} y={288} w={96} h={58} color={C.green} period={4.2} delay={1.4} />
          <Elem enter={enterVariants("fade", 1)}>
            <Txt x={500} y={306} size={14} fill={C.text}>
              Documento verificado
            </Txt>
            <Txt x={500} y={326} size={11} fill={C.dim}>
              Cédula + selfie
            </Txt>
          </Elem>
          <Elem enter={enterVariants("pop", 1.2)}>
            <Ping cx={620} cy={302} r={5} fill={C.green} period={2.4} delay={1.5} />
          </Elem>

          {/* Últimos movimientos */}
          <Card x={366} y={382} w={268} h={132} fill={C.card} rx={16} stroke={C.green} strokeOpacity={0.2} />
          <Txt x={386} y={406} size={12} fill={C.dim}>
            Últimos movimientos
          </Txt>
          {[
            { y: 426, w: 120 },
            { y: 454, w: 96 },
            { y: 482, w: 140 },
          ].map((row, i) => (
            <Elem key={i} enter={enterVariants("slideL", 0.55 + i * 0.16)}>
              <g>
                <circle cx={396} cy={row.y} r={10} fill={C.cardHi} stroke={i % 2 === 0 ? C.amber : C.green} strokeOpacity={0.6} strokeWidth={1.5} />
                <rect x={414} y={row.y - 5} width={row.w} height={8} rx={4} fill={C.cardHi} />
                <rect x={414} y={row.y + 7} width={70} height={6} rx={3} fill={C.cardHi} opacity={0.6} />
                <Txt x={620} y={row.y} size={12} fill={i % 2 === 0 ? C.amber : C.text} anchor="end">
                  {i % 2 === 0 ? "+ $420.000" : "- $85.000"}
                </Txt>
              </g>
            </Elem>
          ))}
        </Phone>
      </Elem>

      {/* Chip moneda girando (ahora a la izquierda) */}
      <Elem enter={enterVariants("pop", 0.55)} hover={{ scale: 1.1 }}>
        <rect x={92} y={150} width={66} height={66} rx={18} fill={C.cardHi} stroke={C.amber} strokeOpacity={0.5} strokeWidth={1.5} />
        <Elem enter={enterVariants("fade", 0)} loop={{ rotate: 360 }} loopT={{ duration: 6.5, repeat: Infinity, ease: "linear" }}>
          <g>
            <circle cx={125} cy={183} r={20} fill={C.amber} />
            <circle cx={125} cy={183} r={13} fill="none" stroke="#082020" strokeWidth={2.5} />
            <Txt x={125} y={185} size={15} fill="#082020" weight={800} anchor="middle">
              ₵
            </Txt>
          </g>
        </Elem>
      </Elem>

      {/* Flujo de efectivo arriba + pills (elementos en la izquierda) */}
      <DrawLine d="M200 84 c8 -16 12 -2 18 -16 c6 -14 10 -2 16 -16" stroke={C.green} width={2.5} enterDelay={0.9} loop loopDuration={3.6} opacity={0.85} />
      <Pill x={84} y={240} w={132} h={36} text="Desembolso" fill={C.cardHi} stroke={C.amber} textFill={C.amber} fontSize={13} enter="slideL" enterDelay={0.6} />
      <Pill x={88} y={336} w={140} h={36} text="Transferido ✓" fill={C.cardHi} stroke={C.green} textFill={C.green} fontSize={13} enter="slideL" enterDelay={0.8} floatT={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }} />

      <Elem enter={enterVariants("pop", 0.9)}>
        <Ping cx={302} cy={104} r={6} fill={C.amber} period={2.3} delay={1} />
      </Elem>

      {/* Métricas creciendo abajo a la izquierda */}
      <Elem enter={enterVariants("fade", 0.85)} hover={{ scale: 1.08 }}>
        <g>
          <rect x={90} y={430} width={170} height={72} rx={18} fill={C.cardHi} stroke={C.green} strokeOpacity={0.3} strokeWidth={1.5} />
          <Txt x={110} y={456} size={12} fill={C.dim}>
            Desembolsos mes
          </Txt>
          <GrowBars
            rx={3}
            stagger={0.14}
            bars={[
              { x: 150, y: 478, h: 10, w: 10, fill: C.green },
              { x: 170, y: 472, h: 16, w: 10, fill: C.green },
              { x: 190, y: 466, h: 22, w: 10, fill: C.green },
              { x: 210, y: 460, h: 28, w: 10, fill: C.green },
              { x: 230, y: 462, h: 26, w: 10, fill: C.amber },
              { x: 250, y: 454, h: 34, w: 10, fill: C.green },
              { x: 270, y: 448, h: 40, w: 10, fill: C.green },
            ]}
          />
        </g>
      </Elem>

      <Elem enter={enterVariants("pop", 1.05)} loop={{ y: [0, -8, 0] }} loopT={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}>
        <circle cx={684} cy={486} r={4} fill={C.amber} opacity={0.6} />
      </Elem>
    </Scene>
  );
}
