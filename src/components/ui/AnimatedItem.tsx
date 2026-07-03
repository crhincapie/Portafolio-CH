"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerItem } from "./Reveal";

interface Props {
  as: "div" | "article" | "figure" | "li";
  children: ReactNode;
  className?: string;
}

const MotionTag = {
  div: motion.div,
  article: motion.article,
  figure: motion.figure,
  li: motion.li,
} as const;

export function AnimatedItem({ as, children, className }: Props) {
  const Tag = MotionTag[as];
  return (
    <Tag variants={staggerItem} className={className}>
      {children}
    </Tag>
  );
}
