import { cards as allCardsData, BaseballCard } from '@/data/cards';
import { CardPreview } from '@/components/card-preview';
import { CatalogControls } from '@/components/catalog-controls';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Vault — Full Collection | Dugout Treasures',
  description: 'Browse the complete collection of rare and classic baseball cards. Filter by year, brand, condition, and price.',
};

interface CardPageSearchParams {
  q?: string;
  year?: string;
  brand?: string;
  condition?: string;
  sort?: string;
}

const parsePageSearchParams = (searchParams: CardPageSearchParams) => ({
  searchTerm: searchParams.q,
  selectedYear: searchParams.year,
  selectedBrand: searchParams.brand,
  selectedCondition: searchParams.condition,
  sortBy: searchParams.sort || 'dateAdded_desc',
});

const filterAndSortCards = (
  allCards: BaseballCard[],
  filters: ReturnType<typeof parsePageSearchParams>
) => {
  let data = [...allCards];

  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    data = data.filter(card =>
      card.title.toLowerCase().includes(term) ||
      card.player.toLowerCase().includes(term) ||
      card.brand.toLowerCase().includes(term) ||
      String(card.year).includes(term)
    );
  }
  if (filters.selectedYear)
    data = data.filter(card => String(card.year) === filters.selectedYear);
  if (filters.selectedBrand)
    data = data.filter(card => card.brand === filters.selectedBrand);
  if (filters.selectedCondition)
    data = data.filter(card => card.condition === filters.selectedCondition);

  switch (filters.sortBy) {
    case 'dateAdded_asc':
      data.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()); break;
    case 'year_desc':
      data.sort((a, b) => b.year - a.year); break;
    case 'year_asc':
      data.sort((a, b) => a.year - b.year); break;
    case 'price_asc':
      data.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity)); break;
    case 'price_desc':
      data.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity)); break;
    case 'averageValue_asc':
      data.sort((a, b) => (a.averageValue ?? Infinity) - (b.averageValue ?? Infinity)); break;
    case 'averageValue_desc':
      data.sort((a, b) => (b.averageValue ?? -Infinity) - (a.averageValue ?? -Infinity)); break;
    case 'title_asc':
      data.sort((a, b) => a.title.localeCompare(b.title)); break;
    case 'title_desc':
      data.sort((a, b) => b.title.localeCompare(a.title)); break;
    default:
      data.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
  }
  return data;
};

export default async function CardsCatalogPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<CardPageSearchParams>;
}) {
  const searchParams = await searchParamsPromise;
  const parsedFilters = parsePageSearchParams(searchParams);
  const displayedCards = filterAndSortCards(allCardsData, parsedFilters);
  const availableCount = displayedCards.filter(c => c.available).length;

  return (
    <>
      {/* ── PAGE HERO ─────────────────────────────────────────── */}
      <section className="relative border-b border-[rgba(201,168,76,0.15)] bg-[#0a0906] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(201,168,76,0.07),transparent)]" />

        {/* Corner marks */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[rgba(201,168,76,0.3)]" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[rgba(201,168,76,0.3)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#7a6e58] mb-4">
            ✦ &nbsp; The Collection
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-gold-gradient mb-3">
            The Vault
          </h1>
          <p className="text-[#7a6e58] text-sm max-w-xl">
            {displayedCards.length} card{displayedCards.length !== 1 ? 's' : ''} found
            {availableCount < displayedCards.length && (
              <span className="ml-1 text-[#c9a84c]">&middot; {availableCount} available</span>
            )}
          </p>
        </div>
      </section>

      {/* ── CATALOG BODY ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <CatalogControls />

        {displayedCards.length > 0 ? (
          <section aria-label="Baseball Card Catalog">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayedCards.map(card => (
                <CardPreview key={card.id} card={card} />
              ))}
            </div>

            {/* Bottom tally */}
            <div className="mt-12 text-center">
              <p className="text-xs text-[#5a5040] tracking-wide">
                Showing {displayedCards.length} of {allCardsData.length} total cards
              </p>
              <div className="mt-4 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />
            </div>
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-6xl opacity-20">⚾</span>
            <p className="font-serif text-2xl text-[#5a5040]">No cards match your filters</p>
            <p className="text-sm text-[#3a3020]">Try clearing some filters to see more results.</p>
          </div>
        )}
      </div>
    </>
  );
}