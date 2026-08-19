"use client";

import { motion } from "framer-motion";
import { Elem, enterVariants, EASE, Scene } from "./motion";
import { Card, DrawLine, Grid, GrowBars, Ping, Pill, SceneBg, Txt } from "./primitives";

const C = {
  top: "#0e1526",
  bottom: "#0a101c",
  card: "#14203a",
  cardHi: "#1d2c4d",
  blue: "#7dd3fc",
  indigo: "#818cf8",
  orange: "#fb923c",
  mint: "#6ee7b7",
  text: "#e6ecf8",
  dim: "#5c6f94",
};

const BLUEPRINTS = [
  "M20 56 V20 H56",
  "M780 20 H744 V56",
  "M20 544 V580 H56",
  "M780 580 V544 H744",
];

export function AvaluadorScene() {
  return (
    <Scene>
      <Elem enter={enterVariants("fade", 0.05)}>
        <SceneBg top={C.top} bottom={C.bottom} glowCx={160} glowCy={90} glowR={320} glowColor={C.indigo} glowOpacity={0.32} />
        <Grid color="rgba(125,211,252,0.05)" />
      </Elem>

      {/* Esquinas de blueprint que se dibujan en bucle */}
      {BLUEPRINTS.map((d, i) => (
        <DrawLine key={i} d={d} stroke={C.blue} width={2} enterDelay={0.15 + i * 0.08} loop loopDuration={5} opacity={0.4} />
      ))}

      {/* Card inmueble */}
      <Elem enter={enterVariants("rise", 0.25)} hover={{ scale: 1.02 }}>
        <g>
          <Card x={64} y={64} w={300} h={228} fill={C.card} rx={20} stroke={C.blue} strokeOpacity={0.25} />
          <Txt x={86} y={94} size={14} fill={C.text}>
            Inmueble
          </Txt>
          <circle cx={140} cy={176} r={44} fill={C.cardHi} stroke={C.blue} strokeOpacity={0.35} strokeWidth={1.5} />
          <motion.path
            d="M12 8.5 3.5 15H7v5h4v-4h2v4h4v-5h3.5L12 8.5zM12 6l9 7.5v2h-3v5h-5v-4h-2v4H7v-5H3v-2L12 6z"
            transform="translate(116 152) scale(2)"
            fill="none"
            stroke={C.blue}
            strokeWidth={1.4}
            strokeLinejoin="round"
            variants={enterVariants("draw", 0.6)}
            style={{ opacity: 0, willChange: "stroke-dashoffset" }}
          />
          <rect x={200} y={150} width={140} height={10} rx={5} fill={C.cardHi} />
          <rect x={200} y={168} width={104} height={8} rx={4} fill={C.cardHi} opacity={0.7} />
          <rect x={200} y={184} width={130} height={7} rx={3.5} fill={C.cardHi} opacity={0.5} />
          <Txt x={96} y={252} size={12} fill={C.dim}>
            Apto · Chapinero
          </Txt>
        </g>
      </Elem>

      {/* Valor estimado */}
      <Elem enter={enterVariants("rise", 0.35)} hover={{ scale: 1.02 }}>
        <g>
          <Card x={400} y={64} w={340} h={180} fill={C.card} rx={24} stroke={C.indigo} strokeOpacity={0.3} />
          <Txt x={424} y={96} size={12} fill={C.dim}>
            Valor estimado
          </Txt>
          <Elem enter={enterVariants("fade", 0.6)} loop={{ opacity: [0.85, 1, 0.85] }} loopT={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <Txt x={424} y={134} size={30} fill={C.text} weight={800}>
              $ 320.000.000
            </Txt>
          </Elem>
          <Txt x={424} y={158} size={13} fill={C.mint}>
            ▲ +12% vs. promedio del barrio
          </Txt>
          <Pill x={606} y={84} w={114} h={30} text="Confianza alta" fill={C.cardHi} stroke={C.mint} textFill={C.mint} fontSize={11} enter="pop" enterDelay={0.55} />
          <DrawLine d="M420 220 C 460 200, 500 240, 540 224 C 580 208, 620 250, 660 232 C 690 220, 700 210, 722 206" stroke={C.blue} width={2.5} enterDelay={0.85} loop loopDuration={4.4} opacity={0.8} />
        </g>
      </Elem>

      {/* Comparativo de precios */}
      <Elem enter={enterVariants("rise", 0.45)} hover={{ scale: 1.02 }}>
        <g>
          <Card x={64} y={330} w={300} h={190} fill={C.card} rx={20} stroke={C.blue} strokeOpacity={0.25} />
          <Txt x={86} y={360} size={12} fill={C.dim}>
            Comparativo $/m²
          </Txt>
          <GrowBars
            rx={4}
            stagger={0.13}
            bars={[
              { x: 88, y: 470, h: 40, w: 28, fill: C.cardHi },
              { x: 124, y: 470, h: 70, w: 28, fill: C.cardHi },
              { x: 160, y: 470, h: 100, w: 28, fill: C.cardHi },
              { x: 196, y: 470, h: 130, w: 28, fill: C.cardHi },
              { x: 232, y: 470, h: 160, w: 28, fill: C.blue },
              { x: 268, y: 470, h: 186, w: 28, fill: C.orange },
            ]}
          />
          <line x1={88} y1={474} x2={296} y2={474} stroke="rgba(255,255,255,0.1)" strokeWidth={2} />
          <Txt x={282} y={462} size={11} fill={C.orange} weight={700} anchor="end">
            320k
          </Txt>
          <Txt x={88} y={492} size={10} fill={C.dim}>
            Barrios · Chapinero, Teusaquillo, Suba
          </Txt>
        </g>
      </Elem>

      {/* Slider de área */}
      <Elem enter={enterVariants("rise", 0.55)} hover={{ scale: 1.02 }}>
        <g>
          <Card x={400} y={330} w={340} h={190} fill={C.card} rx={24} stroke={C.indigo} strokeOpacity={0.3} />
          <Txt x={424} y={360} size={12} fill={C.dim}>
            Área útil
          </Txt>
          <Txt x={424} y={394} size={22} fill={C.text} weight={700}>
            62 m²
          </Txt>
          <Txt x={424} y={416} size={11} fill={C.dim}>
            Arrastra para explorar el modelo
          </Txt>
          <rect x={424} y={444} width={280} height={8} rx={4} fill="rgba(255,255,255,0.1)" />
          <motion.rect
            x={424}
            y={444}
            width={0}
            height={8}
            rx={4}
            fill={C.indigo}
            variants={{
              hidden: { width: 0 },
              show: { width: 168, transition: { duration: 1.6, ease: EASE.natural, delay: 0.9 } },
            }}
          />
          <Elem enter={enterVariants("fade", 0.7)} loop={{ x: [0, 168, 0] }} loopT={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <circle cx={424} cy={448} r={13} fill="#f4f8ff" stroke={C.indigo} strokeWidth={3} />
          </Elem>
          <Txt x={424} y={476} size={10} fill={C.dim}>
            20
          </Txt>
          <Txt x={704} y={476} size={10} fill={C.dim} anchor="end">
            120
          </Txt>
          <Elem enter={enterVariants("pop", 1.1)}>
            <Ping cx={668} cy={344} r={5} fill={C.orange} period={2.5} delay={0.8} />
          </Elem>
        </g>
      </Elem>

      {/* Flotantes */}
      <Pill x={520} y={540} w={136} h={34} text="$ 5,1M / m²" fill={C.cardHi} stroke={C.blue} textFill={C.blue} fontSize={12} enter="pop" enterDelay={0.8} floatT={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }} />
      <Elem enter={enterVariants("pop", 0.9)} loop={{ y: [0, -8, 0] }} loopT={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} hover={{ y: -12, scale: 1.1 }}>
        <circle cx={520} cy={132} r={4} fill={C.orange} opacity={0.7} />
      </Elem>
      <Elem enter={enterVariants("pop", 1)} loop={{ y: [0, -6, 0] }} loopT={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}>
        <circle cx={700} cy={520} r={4} fill={C.blue} opacity={0.55} />
      </Elem>
    </Scene>
  );
}
