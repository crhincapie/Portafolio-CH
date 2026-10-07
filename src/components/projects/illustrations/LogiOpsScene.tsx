"use client";

import { motion } from "framer-motion";
import { Elem, enterVariants, EASE, Scene } from "./motion";
import { Card, DrawLine, Grid, GrowBars, Ping, Pill, SceneBg, Txt } from "./primitives";
import { track, usePalette, useSceneTheme } from "./theme";

const C_DARK = {
  top: "#0a1322",
  bottom: "#070d18",
  card: "#122238",
  cardHi: "#1b3048",
  cyan: "#4fd8ff",
  blue: "#7cc7ff",
  mint: "#5eead4",
  amber: "#fbbf24",
  text: "#e9f0fb",
  dim: "#5d7296",
};

const C_LIGHT = {
  top: "#eef4fb",
  bottom: "#dde8f3",
  card: "#ffffff",
  cardHi: "#e6f0fa",
  cyan: "#0891b2",
  blue: "#0284c7",
  mint: "#0d9488",
  amber: "#d97706",
  text: "#14202e",
  dim: "#5b7089",
};

export function LogiOpsScene() {
  const light = useSceneTheme();
  const C = usePalette(C_DARK, C_LIGHT);
  return (
    <Scene>
      <Elem enter={enterVariants("fade", 0.05)}>
        <SceneBg top={C.top} bottom={C.bottom} glowCx={580} glowCy={80} glowR={360} glowColor={C.cyan} glowOpacity={0.34} />
        <Grid color="rgba(79,216,255,0.05)" />
      </Elem>

      {/* Panel de rutas con trazado de despacho */}
      <Elem enter={enterVariants("rise", 0.25)} hover={{ scale: 1.02 }}>
        <g>
          <Card x={420} y={56} w={340} h={280} fill={C.card} rx={22} stroke={C.cyan} strokeOpacity={0.28} />
          <Txt x={442} y={88} size={13} fill={C.dim}>
            Ruta 12 · Bogotá
          </Txt>
          <Pill x={620} y={72} w={116} h={28} text="En tránsito" fill={C.cardHi} stroke={C.cyan} textFill={C.cyan} fontSize={11} enter="pop" enterDelay={0.5} />
          {/* Retícula de nodos */}
          <circle cx={474} cy={128} r={10} fill={C.cardHi} stroke={C.blue} strokeOpacity={0.6} strokeWidth={1.5} />
          <circle cx={566} cy={196} r={7} fill={C.cardHi} stroke={C.blue} strokeOpacity={0.5} strokeWidth={1.5} />
          <circle cx={652} cy={152} r={9} fill={C.cardHi} stroke={C.mint} strokeOpacity={0.6} strokeWidth={1.5} />
          {/* Ruta que se dibuja en bucle */}
          <DrawLine d="M474 128 C 500 160, 534 176, 566 196 C 588 210, 620 196, 644 166 C 660 146, 684 158, 700 178" stroke={C.cyan} width={2.5} enterDelay={0.55} loop loopDuration={4.6} opacity={0.85} />
          <DrawLine d="M474 128 C 500 104, 556 96, 596 110 C 620 120, 634 140, 652 152" stroke={C.mint} width={2} enterDelay={0.75} loop loopDuration={5.4} opacity={0.6} />
          {/* Móvil avanzando sobre la ruta */}
          <Elem enter={enterVariants("fade", 0.9)} loop={{ x: [0, 0, 16, 0], y: [0, -6, 0, 0] }} loopT={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}>
            <Ping cx={566} cy={196} r={5} fill={C.cyan} period={2.2} delay={0.6} />
          </Elem>
          {/* Camión */}
          <motion.path
            d="m6 15 4-8h7l4 8z"
            transform="translate(472 118) scale(1.6)"
            fill="none"
            stroke={C.cyan}
            strokeWidth={2.5}
            strokeLinejoin="round"
            variants={enterVariants("draw", 0.7)}
            style={{ opacity: 0, willChange: "stroke-dashoffset" }}
          />
          <Txt x={700} y={308} size={11} fill={C.dim} anchor="end">
            Despacho #00124 · ETA 14:30
          </Txt>
        </g>
      </Elem>

      {/* Panel de despachos */}
      <Elem enter={enterVariants("rise", 0.35)} hover={{ scale: 1.02 }}>
        <g>
          <Card x={64} y={56} w={300} h={280} fill={C.card} rx={22} stroke={C.blue} strokeOpacity={0.25} />
          <Txt x={86} y={88} size={13} fill={C.dim}>
            Despachos de hoy
          </Txt>
          <Txt x={86} y={120} size={28} fill={C.text} weight={800}>
            23
          </Txt>
          <Txt x={86} y={142} size={12} fill={C.mint}>
            ▲ +12% vs. ayer
          </Txt>

          {[
            { name: "Bodega Norte", status: "Entregado", color: C.mint, y: 176 },
            { name: "Ruta 07", status: "En tránsito", color: C.cyan, y: 214 },
            { name: "Novedad Cajicá", status: "Novedad", color: C.amber, y: 252 },
          ].map((r, i) => (
            <Elem key={r.name} enter={enterVariants("rise", 0.45 + i * 0.1)}>
              <g>
                <rect x={86} y={r.y} width={146} height={26} rx={8} fill={C.cardHi} />
                <Txt x={96} y={r.y + 13} size={11} fill={C.text}>
                  {r.name}
                </Txt>
                <circle cx={272} cy={r.y + 13} r={4} fill={r.color} />
                <Txt x={282} y={r.y + 13} size={10} fill={r.color}>
                  {r.status}
                </Txt>
              </g>
            </Elem>
          ))}
        </g>
      </Elem>

      {/* Volumen por hora */}
      <Elem enter={enterVariants("rise", 0.45)} hover={{ scale: 1.02 }}>
        <g>
          <Card x={64} y={372} w={300} h={180} fill={C.card} rx={22} stroke={C.blue} strokeOpacity={0.25} />
          <Txt x={86} y={398} size={12} fill={C.dim}>
            Despachos por hora
          </Txt>
          <GrowBars
            rx={4}
            stagger={0.12}
            bars={[
              { x: 90, y: 504, h: 24, w: 20, fill: C.cardHi },
              { x: 118, y: 504, h: 46, w: 20, fill: C.cardHi },
              { x: 146, y: 504, h: 68, w: 20, fill: C.cardHi },
              { x: 174, y: 504, h: 96, w: 20, fill: C.cyan },
              { x: 202, y: 504, h: 118, w: 20, fill: C.blue },
              { x: 230, y: 504, h: 84, w: 20, fill: C.cardHi },
              { x: 258, y: 504, h: 40, w: 20, fill: C.cardHi },
              { x: 286, y: 504, h: 24, w: 20, fill: C.cardHi },
            ]}
          />
          <line x1={90} y1={508} x2={308} y2={508} stroke={track(0.1, light)} strokeWidth={2} />
          <Txt x={90} y={528} size={10} fill={C.dim}>
            06:00
          </Txt>
          <Txt x={308} y={528} size={10} fill={C.dim} anchor="end">
            14:00
          </Txt>
        </g>
      </Elem>

      {/* SLA operativo */}
      <Elem enter={enterVariants("rise", 0.55)} hover={{ scale: 1.02 }}>
        <g>
          <Card x={420} y={372} w={340} h={180} fill={C.card} rx={22} stroke={C.cyan} strokeOpacity={0.28} />
          <Txt x={442} y={398} size={12} fill={C.dim}>
            SLA operativo
          </Txt>
          <Elem enter={enterVariants("fade", 0.65)} loop={{ opacity: [0.85, 1, 0.85] }} loopT={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>
            <Txt x={442} y={436} size={30} fill={C.text} weight={800}>
              96.4%
            </Txt>
          </Elem>
          <rect x={442} y={470} width={296} height={10} rx={5} fill={track(0.12, light)} />
          <motion.rect
            x={442}
            y={470}
            width={0}
            height={10}
            rx={5}
            fill={C.mint}
            variants={{
              hidden: { width: 0 },
              show: { width: 276, transition: { duration: 1.7, ease: EASE.natural, delay: 0.9 } },
            }}
          />
          <Txt x={442} y={498} size={10} fill={C.dim}>
            Objetivo 95%
          </Txt>
          <Ping cx={684} cy={410} r={5} fill={C.mint} period={2.6} delay={0.8} />
        </g>
      </Elem>

      {/* Flotantes */}
      <Pill x={360} y={520} w={128} h={34} text="Entregado · 23" fill={C.cardHi} stroke={C.mint} textFill={C.mint} fontSize={12} enter="pop" enterDelay={0.8} floatT={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }} />
      <Elem enter={enterVariants("pop", 0.9)} loop={{ y: [0, -8, 0] }} loopT={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} hover={{ y: -12, scale: 1.1 }}>
        <circle cx={512} cy={112} r={4} fill={C.amber} opacity={0.7} />
      </Elem>
      <Elem enter={enterVariants("pop", 1)} loop={{ y: [0, -6, 0] }} loopT={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}>
        <circle cx={700} cy={520} r={4} fill={C.cyan} opacity={0.55} />
      </Elem>
    </Scene>
  );
}