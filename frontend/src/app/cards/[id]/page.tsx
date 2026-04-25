import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { cards, BaseballCard } from '@/data/cards';
import { CardImageZoom } from '@/components/card-image-zoom';

async function getCard(id: string): Promise<BaseballCard | undefined> {
  return cards.find((card) => card.id === id);
}

export async function generateMetadata(
  { params: paramsPromise }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const params = await paramsPromise;
  const card = await getCard(params.id);
  if (!card) return { title: 'Card Not Found' };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const imageUrl = card.images?.length > 0
    ? (card.images[0].startsWith('/') ? `${siteUrl}${card.images[0]}` : card.images[0])
    : `${siteUrl}/placeholder-card-image.jpg`;

  return {
    title: `${card.title} (${card.year} ${card.brand}) | Dugout Treasures`,
    description: card.description,
    openGraph: {
      title: `${card.title} (${card.year} ${card.brand})`,
      description: card.description,
      url: `${siteUrl}/cards/${params.id}`,
      images: [{ url: imageUrl, width: 800, height: 600, alt: card.title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${card.title} (${card.year} ${card.brand})`,
      description: card.description,
      images: [imageUrl],
    },
  };
}

function ConditionBadge({ condition }: { condition: string }) {
  const map: Record<string, string> = {
    'mint': 'condition-mint',
    'near mint': 'condition-near-mint',
    'excellent': 'condition-excellent',
    'good': 'condition-good',
    'fair': 'condition-fair',
    'poor': 'condition-poor',
  };
  const cls = map[condition.toLowerCase()] ?? 'condition-good';
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full tracking-wide ${cls}`}>
      {condition}
    </span>
  );
}

function SpecItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 py-3 border-b border-[rgba(201,168,76,0.1)] last:border-0">
      <span className="text-[10px] tracking-[0.25em] uppercase text-[#5a5040]">{label}</span>
      <span className="text-sm text-[#e0d9c4] font-medium">{value}</span>
    </div>
  );
}

export default async function CardDetailsPage(
  { params: paramsPromise }: { params: Promise<{ id: string }> }
) {
  const params = await paramsPromise;
  const card = await getCard(params.id);
  if (!card) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: card.title,
    image: card.images?.length > 0
      ? (card.images[0].startsWith('/') ? `${siteUrl}${card.images[0]}` : card.images[0])
      : `${siteUrl}/placeholder-card-image.jpg`,
    description: card.description,
    sku: card.id,
    brand: { '@type': 'Brand', name: card.brand },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: card.price !== undefined ? card.price.toFixed(2) : undefined,
      availability: card.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${siteUrl}/cards/${params.id}`,
      seller: { '@type': 'Organization', name: 'Dugout Treasures' },
    },
  };

  return (
    <>
      <Script
        id={`card-ld-${card.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── BREADCRUMB ─────────────────────────────────────────── */}
      <div className="border-b border-[rgba(201,168,76,0.1)] bg-[#0a0906]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4">
          <nav className="flex items-center gap-2 text-xs text-[#5a5040]">
            <Link href="/" className="hover:text-[#c9a84c] transition-colors">Home</Link>
            <span>›</span>
            <Link href="/cards" className="hover:text-[#c9a84c] transition-colors">The Vault</Link>
            <span>›</span>
            <span className="text-[#9a8e72] truncate max-w-[200px]">{card.title}</span>
          </nav>
        </div>
      </div>

      {/* ── MAIN CONTENT ───────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <article className="grid md:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">

          {/* ── LEFT: Image ──────────────────────────────────────── */}
          <div className="sticky top-24">
            {/* Status ribbon */}
            {!card.available && (
              <div className="mb-4 flex items-center justify-center py-2.5 rounded-lg bg-red-950/60 border border-red-800/40">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-red-400">
                  This Card Has Been Sold
                </span>
              </div>
            )}

            {/* Card image */}
            <div className="rounded-xl overflow-hidden border border-[rgba(201,168,76,0.2)] shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              {card.images?.length > 0 ? (
                <CardImageZoom
                  src={card.images[0]}
                  alt={`${card.title} — ${card.year} ${card.brand}`}
                />
              ) : (
                <div className="aspect-[3/4] bg-[#141210] flex flex-col items-center justify-center gap-4">
                  <span className="text-6xl opacity-10">⚾</span>
                  <span className="text-xs tracking-widest uppercase text-[#3a3020]">No Image Available</span>
                </div>
              )}
            </div>

            {/* Secondary images */}
            {card.images && card.images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {card.images.slice(1).map((img, i) => (
                  <div key={i} className="aspect-square rounded overflow-hidden border border-[rgba(201,168,76,0.15)]">
                    <img src={img} alt={`${card.title} view ${i + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Details ───────────────────────────────────── */}
          <div className="flex flex-col gap-6">

            {/* Eyebrow */}
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#7a6e58] mb-2">
                {card.brand} · {card.year}{card.set ? ` · ${card.set}` : ''}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#e0d9c4] leading-tight">
                {card.title}
              </h1>
            </div>

            {/* Condition + status row */}
            <div className="flex items-center gap-3 flex-wrap">
              <ConditionBadge condition={card.condition} />
              {card.cardNumber && (
                <span className="text-xs text-[#7a6e58] border border-[rgba(201,168,76,0.15)] px-2.5 py-1 rounded-full">
                  #{card.cardNumber}
                </span>
              )}
            </div>

            {/* Gold divider */}
            <div className="h-px bg-gradient-to-r from-[rgba(201,168,76,0.3)] to-transparent" />

            {/* Price */}
            <div>
              {card.price !== undefined ? (
                <div className="flex items-end gap-4">
                  <div>
                    <p className="text-[10px] tracking-[0.25em] uppercase text-[#5a5040] mb-1">Asking Price</p>
                    <p className="font-serif text-5xl font-bold text-gold-gradient leading-none">
                      ${card.price.toLocaleString()}
                    </p>
                  </div>
                  {card.averageValue !== undefined && (
                    <div className="pb-1">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-[#5a5040] mb-1">Market Avg</p>
                      <p className="text-lg text-[#7a6e58] font-medium">${card.averageValue.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#5a5040] mb-1">Price</p>
                  <p className="font-serif text-2xl text-[#c9a84c] italic">Contact for pricing</p>
                  {card.averageValue !== undefined && (
                    <p className="text-sm text-[#7a6e58] mt-1">
                      Market avg: <span className="text-[#9a8e72] font-medium">${card.averageValue.toLocaleString()}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* CTA */}
            {card.available ? (
              <Link
                href={`/contact?cardId=${card.id}&cardName=${encodeURIComponent(card.title)}`}
                className="flex items-center justify-center gap-3 py-4 rounded-lg bg-[#c9a84c] text-black text-sm font-bold tracking-widest uppercase hover:bg-[#e8c96e] transition-all duration-200 hover:shadow-[0_0_30px_rgba(201,168,76,0.35)] animate-gold-pulse"
              >
                <span>⚾</span>
                Inquire or Purchase
              </Link>
            ) : (
              <div className="flex items-center justify-center py-4 rounded-lg border border-red-800/40 bg-red-950/30 text-red-400 text-sm font-semibold tracking-widest uppercase">
                Sold — No Longer Available
              </div>
            )}

            {/* ── STORY LINK (1971 Ryan only) ───────────────────────── */}
            {card.id === 'nolan-ryan-1971-topps-513' && (
              <a
                href="/1971-nolan.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl overflow-hidden border border-[rgba(201,75,40,0.3)] bg-[#111009] hover:border-[rgba(201,75,40,0.6)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,75,40,0.12)]"
              >
                <div className="relative flex items-center gap-5 px-5 py-4">
                  {/* Red left accent bar */}
                  <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-[#c94b28] to-transparent" />

                  {/* Icon */}
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-[rgba(201,75,40,0.1)] border border-[rgba(201,75,40,0.25)] flex items-center justify-center text-lg group-hover:bg-[rgba(201,75,40,0.2)] transition-colors">
                    📖
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#7a6e58] mb-0.5">
                      Collector&apos;s Story
                    </p>
                    <p className="text-sm font-semibold text-[#e0d9c4] leading-snug group-hover:text-[#c94b28] transition-colors">
                      The Calm Before the Trade That Changed Baseball.
                    </p>
                    <p className="text-xs text-[#5a5040] mt-0.5 truncate">
                      Read the cinematic story behind this card →
                    </p>
                  </div>
                </div>
              </a>
            )}

            {/* ── STORY LINK (McGwire Fleer only) ──────────────────── */}
            {card.id === 'mark-mcgwire-1987-fleer-update-u76' && (
              <a
                href="/mcguire-fleer.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl overflow-hidden border border-[rgba(201,168,76,0.25)] bg-[#111009] hover:border-[rgba(201,168,76,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.12)]"
              >
                <div className="relative flex items-center gap-5 px-5 py-4">
                  {/* Gold left accent bar */}
                  <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-[#c9a84c] to-transparent" />

                  {/* Icon */}
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center text-lg group-hover:bg-[rgba(201,168,76,0.18)] transition-colors">
                    📖
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#7a6e58] mb-0.5">
                      Collector&apos;s Story
                    </p>
                    <p className="text-sm font-semibold text-[#e0d9c4] leading-snug group-hover:text-[#c9a84c] transition-colors">
                      Before the Myth. Before the Bash.
                    </p>
                    <p className="text-xs text-[#5a5040] mt-0.5 truncate">
                      Read the cinematic story behind this card →
                    </p>
                  </div>
                </div>
              </a>
            )}

            {/* ── STORY LINK (Pete Rose only) ───────────────────────── */}
            {card.id === 'pete-rose-1964-topps-125' && (
              <a
                href="/pete-rose.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl overflow-hidden border border-[rgba(185,48,38,0.3)] bg-[#111009] hover:border-[rgba(185,48,38,0.6)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(185,48,38,0.12)]"
              >
                <div className="relative flex items-center gap-5 px-5 py-4">
                  {/* Red left accent bar */}
                  <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-[#b93026] to-transparent" />

                  {/* Icon */}
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-[rgba(185,48,38,0.1)] border border-[rgba(185,48,38,0.25)] flex items-center justify-center text-lg group-hover:bg-[rgba(185,48,38,0.2)] transition-colors">
                    📖
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#7a6e58] mb-0.5">
                      Collector&apos;s Story
                    </p>
                    <p className="text-sm font-semibold text-[#e0d9c4] leading-snug group-hover:text-[#b93026] transition-colors">
                      The Genesis of Charlie Hustle.
                    </p>
                    <p className="text-xs text-[#5a5040] mt-0.5 truncate">
                      Read the cinematic story behind this card →
                    </p>
                  </div>
                </div>
              </a>
            )}

            {/* Specs section */}
            <div className="rounded-xl border border-[rgba(201,168,76,0.15)] bg-[#111009] overflow-hidden">
              <div className="px-5 py-3 border-b border-[rgba(201,168,76,0.1)] bg-[rgba(201,168,76,0.03)]">
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#7a6e58]">
                  Card Specifications
                </span>
              </div>
              <div className="px-5 divide-y divide-[rgba(201,168,76,0.08)]">
                <SpecItem label="Player" value={card.player} />
                <SpecItem label="Year" value={card.year} />
                <SpecItem label="Brand / Manufacturer" value={card.brand} />
                {card.set && <SpecItem label="Set / Series" value={card.set} />}
                <SpecItem label="Condition" value={<ConditionBadge condition={card.condition} />} />
                {card.cardNumber && <SpecItem label="Card Number" value={`#${card.cardNumber}`} />}
                <SpecItem
                  label="Availability"
                  value={
                    card.available
                      ? <span className="text-emerald-400">Available</span>
                      : <span className="text-red-400">Sold</span>
                  }
                />
              </div>
            </div>

            {/* Description */}
            <div className="rounded-xl border border-[rgba(201,168,76,0.15)] bg-[#111009] overflow-hidden">
              <div className="px-5 py-3 border-b border-[rgba(201,168,76,0.1)] bg-[rgba(201,168,76,0.03)]">
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#7a6e58]">
                  About This Card
                </span>
              </div>
              <p className="px-5 py-4 text-sm text-[#9a8e72] leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Tags */}
            {card.tags && card.tags.length > 0 && (
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#5a5040] mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[11px] rounded-full bg-[rgba(201,168,76,0.07)] border border-[rgba(201,168,76,0.15)] text-[#7a6e58] hover:border-[rgba(201,168,76,0.35)] hover:text-[#c9a84c] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Back link */}
            <Link
              href="/cards"
              className="text-sm text-[#5a5040] hover:text-[#c9a84c] transition-colors flex items-center gap-2 mt-2"
            >
              ← Back to The Vault
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}