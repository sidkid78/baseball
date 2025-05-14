import { cards as allCardsData, BaseballCard } from '@/data/cards';
import { CardPreview } from '@/components/card-preview';
import { CatalogControls } from '@/components/catalog-controls';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Baseball Cards | [Your Name] Cards',
  description: 'Explore the full collection of available baseball cards.',
};

// Define the expected structure of searchParams for this page
interface CardPageSearchParams {
  q?: string;
  year?: string;
  brand?: string;
  condition?: string;
  sort?: string;
  // Add other expected params here, use string[] for multi-select if CatalogControls supports it
}

// Helper function to parse search parameters directly from the page props
const parsePageSearchParams = (searchParams: CardPageSearchParams) => {
  return {
    searchTerm: searchParams.q,
    selectedYear: searchParams.year,
    selectedBrand: searchParams.brand,
    selectedCondition: searchParams.condition,
    sortBy: searchParams.sort || 'dateAdded_desc', // Default sort
  };
};

// Filtering and Sorting Logic (remains largely the same, but ensure types match)
const filterAndSortCards = (
  allCards: BaseballCard[], 
  filters: ReturnType<typeof parsePageSearchParams>
) => {
  let Sourcedata = [...allCards];

  // Apply search term filter
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    Sourcedata = Sourcedata.filter(card => 
      card.title.toLowerCase().includes(term) ||
      card.player.toLowerCase().includes(term) ||
      card.brand.toLowerCase().includes(term) ||
      String(card.year).includes(term)
      // Add other fields to search if necessary
    );
  }

  // Apply dropdown filters
  if (filters.selectedYear) {
    Sourcedata = Sourcedata.filter(card => String(card.year) === filters.selectedYear);
  }
  if (filters.selectedBrand) {
    Sourcedata = Sourcedata.filter(card => card.brand === filters.selectedBrand);
  }
  if (filters.selectedCondition) {
    Sourcedata = Sourcedata.filter(card => card.condition === filters.selectedCondition);
  }

  // Apply sorting
  switch (filters.sortBy) {
    case 'dateAdded_desc':
      Sourcedata.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      break;
    case 'dateAdded_asc':
      Sourcedata.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
      break;
    case 'year_desc':
      Sourcedata.sort((a, b) => b.year - a.year);
      break;
    case 'year_asc':
      Sourcedata.sort((a, b) => a.year - b.year);
      break;
    case 'price_asc':
      Sourcedata.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
      break;
    case 'price_desc':
      Sourcedata.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
      break;
    case 'averageValue_asc':
      Sourcedata.sort((a, b) => (a.averageValue ?? Infinity) - (b.averageValue ?? Infinity));
      break;
    case 'averageValue_desc':
      Sourcedata.sort((a, b) => (b.averageValue ?? -Infinity) - (a.averageValue ?? -Infinity));
      break;
    case 'title_asc':
      Sourcedata.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'title_desc':
      Sourcedata.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      // Default sort (e.g., dateAdded_desc)
      Sourcedata.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      break;
  }
  return Sourcedata;
};

export default function CardsCatalogPage({ 
  searchParams 
}: {
  searchParams: CardPageSearchParams // Use the defined interface
}) {
  const parsedFilters = parsePageSearchParams(searchParams);
  const displayedCards = filterAndSortCards(allCardsData, parsedFilters);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white dark:bg-slate-900">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
          Browse All Cards
        </h1>
      </header>

      <CatalogControls />

      {displayedCards.length > 0 ? (
        <section aria-labelledby="catalog-heading">
          <h2 id="catalog-heading" className="sr-only">
            Baseball Card Catalog
          </h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-6">
            {displayedCards.map((card) => (
              <CardPreview key={card.id} card={card} />
            ))}
          </div>
        </section>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-slate-600 dark:text-slate-300">No cards match your current filters.</p>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </main>
  );
} 