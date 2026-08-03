"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface GalleryCarouselProps {
  images: string[];
  title: string;
}

const GAP = 40;

export function GalleryCarousel({ images, title }: GalleryCarouselProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, left: 0 });
  const [size, setSize] = useState<{ card: number; viewport: number } | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const measure = () => {
      const w = wrapper.clientWidth;
      const card = (1.4 * 0.8 * (w - 3 * GAP)) / 3.5;
      setSize({ card, viewport: 3 * card + 2 * GAP });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onWheel = (e: WheelEvent) => {
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 0) return;
      e.preventDefault();
      track.scrollLeft = Math.min(max, Math.max(0, track.scrollLeft + e.deltaY + e.deltaX));
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  if (images.length === 0) return null;

  const scrollByStep = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const step = size ? size.card + GAP : 300;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, left: e.currentTarget.scrollLeft };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    e.currentTarget.scrollLeft = dragStart.current.left - (e.clientX - dragStart.current.x);
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative" style={size ? { width: `${size.viewport}px` } : undefined}>
        <button
          type="button"
          onClick={() => scrollByStep(-1)}
          aria-label="Previous image"
          className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-zinc-950/80 text-xl leading-none text-white backdrop-blur transition hover:border-[#00feff]/60 hover:text-[#00feff]"
        >
          ‹
        </button>

        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="flex touch-pan-y cursor-grab select-none gap-10 overflow-hidden py-1 active:cursor-grabbing"
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="aspect-[9/19] flex-none overflow-hidden rounded-2xl border border-white/10 bg-zinc-950"
              style={size ? { width: `${size.card}px` } : undefined}
            >
              <Image
                src={src}
                alt={`${title} screenshot ${i + 1}`}
                width={414}
                height={900}
                draggable={false}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByStep(1)}
          aria-label="Next image"
          className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-zinc-950/80 text-xl leading-none text-white backdrop-blur transition hover:border-[#00feff]/60 hover:text-[#00feff]"
        >
          ›
        </button>
      </div>
    </div>
  );
}
