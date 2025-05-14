'use client';

import { useQueryState } from 'nuqs';
import { cards as allCardsData, BaseballCard } from '@/data/cards'; // To get all possible filter options
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useCallback, useMemo } from 'react';

const CARD_CONDITIONS = [
  'Mint',
  'Near Mint',
  'Excellent',
  'Good',
  'Fair',
  'Poor',
] as const;

export type FilterOptions = {
  years: number[];
  brands: string[];
  conditions: readonly string[]; // Use readonly string[] for CARD_CONDITIONS type
};

// Helper to get unique, sorted values for filter dropdowns
const getUniqueValues = (cards: BaseballCard[], key: keyof BaseballCard) => {
  // Ensure we handle cases where the key might not be present or is optional
  return Array.from(new Set(cards.map(card => card[key]).filter(Boolean))) 
    .sort((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') return a - b;
      if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b);
      return 0;
    });
};

export function CatalogControls() {
  // const router = useRouter(); // Removed unused variable
  // const pathname = usePathname(); // Removed unused variable

  // Derive initial values from URL or set defaults
  const [searchTerm, setSearchTerm] = useQueryState('q', {
    defaultValue: '',
    history: 'replace',
    shallow: false, // We want a server roundtrip to refilter
  });
  const [selectedYear, setSelectedYear] = useQueryState('year', {
    defaultValue: '',
    history: 'replace',
    shallow: false,
  });
  const [selectedBrand, setSelectedBrand] = useQueryState('brand', {
    defaultValue: '',
    history: 'replace',
    shallow: false,
  });
  const [selectedCondition, setSelectedCondition] = useQueryState(
    'condition',
    {
      defaultValue: '',
      history: 'replace',
      shallow: false,
    }
  );
  const [sortBy, setSortBy] = useQueryState('sort', {
    defaultValue: 'dateAdded_desc', // Default sort: newest added
    history: 'replace',
    shallow: false,
  });

  // Memoize filter options to prevent re-calculating on every render
  const filterOptions = useMemo<FilterOptions>(() => ({
    years: getUniqueValues(allCardsData, 'year') as number[],
    brands: getUniqueValues(allCardsData, 'brand') as string[],
    conditions: CARD_CONDITIONS,
  }), []);

  const handleResetFilters = useCallback(() => {
    // Resetting query states will trigger navigation
    setSearchTerm(null);
    setSelectedYear(null);
    setSelectedBrand(null);
    setSelectedCondition(null);
    setSortBy('dateAdded_desc'); // Reset sort to default
  }, [setSearchTerm, setSelectedYear, setSelectedBrand, setSelectedCondition, setSortBy]);
  
  // Handlers for Select components
  const handleSelectChange = (
    setter: (value: string | null) => void,
    value: string
  ) => {
    setter(value === 'all' ? null : value);
  };

  return (
    <form
      className="mb-8 p-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm bg-slate-50/50 dark:bg-slate-900/70"
      onSubmit={(e) => e.preventDefault()} // Prevent default form submission
      aria-labelledby="filter-heading"
    >
      <h2 id="filter-heading" className="sr-only">
        Filter and Sort Cards
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
        {/* Search Input */}
        <div className="md:col-span-2 lg:col-span-1">
          <label htmlFor="search" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Search
          </label>
          <Input
            id="search"
            type="search"
            placeholder="Player, title, year..."
            value={searchTerm || ''}
            onChange={(e) => setSearchTerm(e.target.value || null)} // Set to null if empty to remove from URL
          />
        </div>

        {/* Year Filter */}
        <div>
          <label htmlFor="year-filter" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Year
          </label>
          <Select
            value={selectedYear || 'all'}
            onValueChange={(value) => handleSelectChange(setSelectedYear, value)}
          >
            <SelectTrigger id="year-filter">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {filterOptions.years.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Brand Filter */}
        <div>
          <label htmlFor="brand-filter" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Brand
          </label>
          <Select
            value={selectedBrand || 'all'}
            onValueChange={(value) => handleSelectChange(setSelectedBrand, value)}
          >
            <SelectTrigger id="brand-filter">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {filterOptions.brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Condition Filter */}
        <div>
          <label htmlFor="condition-filter" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Condition
          </label>
          <Select
            value={selectedCondition || 'all'}
            onValueChange={(value) => handleSelectChange(setSelectedCondition, value)}
          >
            <SelectTrigger id="condition-filter">
              <SelectValue placeholder="All Conditions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Conditions</SelectItem>
              {filterOptions.conditions.map((condition) => (
                <SelectItem key={condition} value={condition}>
                  {condition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sort-by" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Sort By
          </label>
          <Select
            value={sortBy || 'dateAdded_desc'}
            onValueChange={(value) => setSortBy(value || 'dateAdded_desc')} // Ensure a default sort
          >
            <SelectTrigger id="sort-by">
              <SelectValue placeholder="Sort cards" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dateAdded_desc">Newest Added</SelectItem>
              <SelectItem value="dateAdded_asc">Oldest Added</SelectItem>
              <SelectItem value="year_desc">Year (Newest First)</SelectItem>
              <SelectItem value="year_asc">Year (Oldest First)</SelectItem>
              <SelectItem value="price_asc">Price (Low to High)</SelectItem>
              <SelectItem value="price_desc">Price (High to Low)</SelectItem>
              <SelectItem value="averageValue_asc">Average Value (Low to High)</SelectItem>
              <SelectItem value="averageValue_desc">Average Value (High to Low)</SelectItem>
              <SelectItem value="title_asc">Title (A-Z)</SelectItem>
              <SelectItem value="title_desc">Title (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button type="button" variant="outline" onClick={handleResetFilters}>
          Reset Filters
        </Button>
      </div>
    </form>
  );
} 