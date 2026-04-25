"use client";

import React, { useRef, useState } from 'react';
import { BaseballCard } from '@/data/cards';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  card: BaseballCard;
};

function getConditionClass(condition: string): string {
  const c = condition.toLowerCase();
  if (c === 'mint') return 'condition-mint';
  if (c === 'near mint') return 'condition-near-mint';
  if (c === 'excellent') return 'condition-excellent';
  if (c === 'good') return 'condition-good';
  if (c === 'fair') return 'condition-fair';
  if (c === 'poor') return 'condition-poor';
  return 'condition-good';
}

export const CardPreview: React.FC<Props> = ({ card }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  };

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => {
    setHovering(false);
    setTilt({ x: 0, y: 0 });
  };

  const conditionClass = getConditionClass(card.condition);
  const hasImage = card.images && card.images.length > 0;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="card-shimmer"
      style={{
        perspective: '1000px',
      }}
    >
      <div
        className="card-3d relative flex flex-col rounded-xl overflow-hidden border border-[rgba(201,168,76,0.15)] bg-[#141210]"
        style={{
          transform: hovering
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0)',
          boxShadow: hovering
            ? '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.35), 0 0 40px rgba(201,168,76,0.08)'
            : '0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.1)',
        }}
      >
        {/* ── Image area ─────────────────────────────── */}
        <Link
          href={`/cards/${card.id}`}
          aria-label={`View details of ${card.title}`}
          className="block"
          tabIndex={0}
        >
          <div className="aspect-[3/4] relative bg-[#0f0e0c] overflow-hidden">
            {hasImage ? (
              <Image
                src={card.images[0]}
                alt={`${card.year} ${card.brand} ${card.title}`}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 44vw, (max-width: 1024px) 30vw, 22vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                quality={85}
                priority={card.available}
              />
            ) : (
              <div className="flex h-full items-center justify-center flex-col gap-3">
                <span className="text-5xl opacity-20">⚾</span>
                <span className="text-xs tracking-widest uppercase text-[#3a3020]">No Image</span>
              </div>
            )}

            {/* Gold shimmer overlay on hover */}
            {hovering && (
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[rgba(201,168,76,0.06)] to-transparent pointer-events-none" />
            )}

            {/* Sold badge */}
            {!card.available && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-red-400 border border-red-500/40 px-3 py-1.5 rounded bg-red-950/60">
                  Sold
                </span>
              </div>
            )}

            {/* Condition badge — top left */}
            <span className={`absolute top-2.5 left-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wide ${conditionClass}`}>
              {card.condition}
            </span>
          </div>
        </Link>

        {/* ── Card content ───────────────────────────── */}
        <Link
          href={`/cards/${card.id}`}
          className="flex flex-col flex-grow p-4 gap-1"
          tabIndex={-1}
        >
          <h3 className="font-serif text-[#e0d9c4] text-base font-semibold leading-tight line-clamp-2" title={card.title}>
            {card.title}
          </h3>
          <p className="text-xs text-[#7a6e58] mt-0.5 tracking-wide">
            {card.brand} &middot; {card.year}
            {card.set && ` · ${card.set}`}
          </p>

          {/* Price row */}
          <div className="mt-2 flex items-end justify-between">
            {card.price !== undefined ? (
              <span className="font-serif text-[#c9a84c] text-lg font-bold">
                ${card.price.toLocaleString()}
              </span>
            ) : (
              <span className="text-xs text-[#5a5040] italic">Price on inquiry</span>
            )}
            {card.averageValue !== undefined && (
              <span className="text-[10px] text-[#5a5040]">
                Avg: ${card.averageValue.toLocaleString()}
              </span>
            )}
          </div>
        </Link>

        {/* ── Footer CTA ─────────────────────────────── */}
        <div className="px-4 pb-4">
          <div className="h-px w-full bg-[rgba(201,168,76,0.12)] mb-3" />
          <Link
            href={`/contact?cardId=${card.id}&cardName=${encodeURIComponent(card.title)}`}
            className="flex items-center justify-center w-full py-2.5 rounded border border-[rgba(201,168,76,0.3)] text-[#c9a84c] text-xs font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[rgba(201,168,76,0.1)] hover:border-[#c9a84c] hover:shadow-[0_0_15px_rgba(201,168,76,0.2)]"
          >
            Inquire / Buy
          </Link>
        </div>
      </div>
    </div>
  );
};