import Link from 'next/link';
import { cards } from '@/data/cards';
import { CardPreview } from '@/components/card-preview';

export default function HomePage() {
  const featuredCards = cards.filter(c => c.available).slice(0, 8);
  const totalCards = cards.length;
  const availableCards = cards.filter(c => c.available).length;
  const earliestYear = Math.min(...cards.map(c => c.year));
  const brands = new Set(cards.map(c => c.brand)).size;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden">

        {/* Layered dark background */}
        <div className="absolute inset-0 bg-[#0a0906]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(201,168,76,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(139,105,20,0.08),transparent)]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Decorative corner lines */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[rgba(201,168,76,0.3)]" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[rgba(201,168,76,0.3)]" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-[rgba(201,168,76,0.3)]" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[rgba(201,168,76,0.3)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
          {/* Eyebrow */}
          <p className="animate-float-in text-[10px] tracking-[0.4em] uppercase text-[#7a6e58] font-medium mb-6">
            ✦ &nbsp; Curated since {earliestYear} &nbsp; ✦
          </p>

          {/* Main headline */}
          <h1 className="animate-float-in-delay-1 font-serif font-bold leading-none mb-6">
            <span className="block text-[clamp(3rem,8vw,7rem)] text-gold-gradient">
              Shaun&apos;s
            </span>
            <span className="block text-[clamp(2rem,5vw,4rem)] text-[#e0d9c4] tracking-wide mt-1">
              Baseball Cards
            </span>
          </h1>

          {/* Tagline */}
          <p className="animate-float-in-delay-2 font-serif italic text-[#9a8e72] text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Legendary players. Authenticated cardboard.<br />
            A collection built over decades.
          </p>

          {/* CTAs */}
          <div className="animate-float-in-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cards"
              className="group relative px-8 py-4 bg-[#c9a84c] text-black text-sm font-bold tracking-widest uppercase rounded overflow-hidden transition-all duration-300 hover:bg-[#e8c96e] hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]"
            >
              Enter The Vault
              <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-[rgba(201,168,76,0.4)] text-[#c9a84c] text-sm font-semibold tracking-widest uppercase rounded transition-all duration-300 hover:border-[#c9a84c] hover:bg-[rgba(201,168,76,0.06)]"
            >
              Make an Inquiry
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#7a6e58]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#c9a84c] to-transparent" />
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────── */}
      <section className="relative border-y border-[rgba(201,168,76,0.15)] bg-[#0d0b08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {[
            { value: totalCards, label: "Total Cards" },
            { value: availableCards, label: "Available Now" },
            { value: brands, label: "Distinct Brands" },
            { value: `${earliestYear}+`, label: "Years Spanning" },
          ].map((stat, i) => (
            <div key={i} className={`text-center px-6 ${i < 3 ? 'md:border-r md:border-[rgba(201,168,76,0.15)]' : ''}`}>
              <p className="font-serif text-[2.5rem] font-bold text-gold-gradient leading-none">{stat.value}</p>
              <p className="text-xs tracking-[0.2em] uppercase text-[#7a6e58] mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED CARDS ───────────────────────────────────────── */}
      {featuredCards.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#7a6e58] mb-3">
                ✦ &nbsp; Hand-picked selections
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#e0d9c4]">
                Featured <span className="text-gold-gradient">Listings</span>
              </h2>
            </div>
            <Link
              href="/cards"
              className="text-sm text-[#c9a84c] hover:text-[#e8c96e] transition-colors tracking-wide flex items-center gap-2 shrink-0"
            >
              View all {totalCards} cards
              <span>→</span>
            </Link>
          </div>

          {/* Gold divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent mb-12" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredCards.map((card) => (
              <CardPreview key={card.id} card={card} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="gold-divider mb-8">
              <span className="text-[#c9a84c] text-lg">⚾</span>
            </div>
            <Link
              href="/cards"
              className="inline-block px-10 py-4 border border-[rgba(201,168,76,0.4)] text-[#c9a84c] text-sm font-semibold tracking-widest uppercase rounded transition-all duration-300 hover:border-[#c9a84c] hover:bg-[rgba(201,168,76,0.06)] hover:shadow-[0_0_20px_rgba(201,168,76,0.15)]"
            >
              Browse the Full Collection
            </Link>
          </div>
        </section>
      )}

      {/* ── VALUE PROPS ──────────────────────────────────────────── */}
      <section className="border-t border-[rgba(201,168,76,0.1)] bg-[#0a0906]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: "🏆",
              title: "Hall of Fame Provenance",
              body: "Cards from the greatest players in baseball history — Griffey, Ryan, Rose, Jeter, and more.",
            },
            {
              icon: "🔍",
              title: "Condition Described Honestly",
              body: "Every card graded with collector eyes. What you see is exactly what you receive.",
            },
            {
              icon: "🤝",
              title: "Personal Transaction",
              body: "No middlemen. Contact Shaun directly for inquiries, pricing, and fast shipping.",
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-start gap-4 p-6 rounded-lg border border-[rgba(201,168,76,0.1)] bg-[rgba(201,168,76,0.03)] hover:border-[rgba(201,168,76,0.25)] transition-colors duration-300">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-serif text-xl font-semibold text-[#e0d9c4]">{item.title}</h3>
              <p className="text-sm text-[#7a6e58] leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
