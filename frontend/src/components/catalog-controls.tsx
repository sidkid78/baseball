'use client';

import { useQueryState } from 'nuqs';
import { cards as allCardsData, BaseballCard } from '@/data/cards';
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
  conditions: readonly string[];
};

const getUniqueValues = (cards: BaseballCard[], key: keyof BaseballCard) => {
  return Array.from(new Set(cards.map(card => card[key]).filter(Boolean)))
    .sort((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') return a - b;
      if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b);
      return 0;
    });
};

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

function SelectField({ id, label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a6e58]">
        {label}
      </label>
      <div className="relative gold-glow rounded">
        <select
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-[#1a1711] border border-[rgba(201,168,76,0.2)] text-[#e0d9c4] text-sm rounded px-3 py-2.5 pr-8 focus:outline-none focus:border-[#c9a84c] transition-colors cursor-pointer"
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-[#1a1711]">
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7a6e58] text-xs">▾</span>
      </div>
    </div>
  );
}

export function CatalogControls() {
  const [searchTerm, setSearchTerm] = useQueryState('q', {
    defaultValue: '',
    history: 'replace',
    shallow: false,
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
  const [selectedCondition, setSelectedCondition] = useQueryState('condition', {
    defaultValue: '',
    history: 'replace',
    shallow: false,
  });
  const [sortBy, setSortBy] = useQueryState('sort', {
    defaultValue: 'dateAdded_desc',
    history: 'replace',
    shallow: false,
  });

  const filterOptions = useMemo<FilterOptions>(() => ({
    years: getUniqueValues(allCardsData, 'year') as number[],
    brands: getUniqueValues(allCardsData, 'brand') as string[],
    conditions: CARD_CONDITIONS,
  }), []);

  const handleResetFilters = useCallback(() => {
    setSearchTerm(null);
    setSelectedYear(null);
    setSelectedBrand(null);
    setSelectedCondition(null);
    setSortBy('dateAdded_desc');
  }, [setSearchTerm, setSelectedYear, setSelectedBrand, setSelectedCondition, setSortBy]);

  // Count active filters
  const activeFilterCount = [searchTerm, selectedYear, selectedBrand, selectedCondition]
    .filter(Boolean).length;

  return (
    <div className="mb-10 rounded-xl border border-[rgba(201,168,76,0.15)] bg-[#111009] overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(201,168,76,0.1)] bg-[rgba(201,168,76,0.03)]">
        <div className="flex items-center gap-3">
          <span className="text-[#c9a84c] text-xs">⚙</span>
          <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#7a6e58]">
            Filter & Sort
          </span>
          {activeFilterCount > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(201,168,76,0.15)] text-[#c9a84c] border border-[rgba(201,168,76,0.3)]">
              {activeFilterCount} active
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-[10px] text-[#7a6e58] hover:text-[#c9a84c] transition-colors tracking-wide uppercase"
          >
            Clear all ×
          </button>
        )}
      </div>

      {/* Controls grid */}
      <form
        className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end"
        onSubmit={e => e.preventDefault()}
        aria-label="Filter and sort cards"
      >
        {/* Search */}
        <div className="sm:col-span-2 md:col-span-1 flex flex-col gap-1.5">
          <label htmlFor="search" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a6e58]">
            Search
          </label>
          <div className="relative gold-glow rounded">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a5040] text-xs">🔍</span>
            <input
              id="search"
              type="search"
              placeholder="Player, brand, year..."
              value={searchTerm || ''}
              onChange={e => setSearchTerm(e.target.value || null)}
              className="w-full bg-[#1a1711] border border-[rgba(201,168,76,0.2)] text-[#e0d9c4] text-sm rounded px-3 py-2.5 pl-8 focus:outline-none focus:border-[#c9a84c] placeholder:text-[#3a3020] transition-colors"
            />
          </div>
        </div>

        {/* Year */}
        <SelectField
          id="year-filter"
          label="Year"
          value={selectedYear || 'all'}
          onChange={v => setSelectedYear(v === 'all' ? null : v)}
          options={[
            { value: 'all', label: 'All Years' },
            ...filterOptions.years.map(y => ({ value: String(y), label: String(y) })),
          ]}
        />

        {/* Brand */}
        <SelectField
          id="brand-filter"
          label="Brand"
          value={selectedBrand || 'all'}
          onChange={v => setSelectedBrand(v === 'all' ? null : v)}
          options={[
            { value: 'all', label: 'All Brands' },
            ...filterOptions.brands.map(b => ({ value: b, label: b })),
          ]}
        />

        {/* Condition */}
        <SelectField
          id="condition-filter"
          label="Condition"
          value={selectedCondition || 'all'}
          onChange={v => setSelectedCondition(v === 'all' ? null : v)}
          options={[
            { value: 'all', label: 'All Conditions' },
            ...filterOptions.conditions.map(c => ({ value: c, label: c })),
          ]}
        />

        {/* Sort */}
        <SelectField
          id="sort-by"
          label="Sort By"
          value={sortBy || 'dateAdded_desc'}
          onChange={v => setSortBy(v || 'dateAdded_desc')}
          options={[
            { value: 'dateAdded_desc', label: 'Newest Added' },
            { value: 'dateAdded_asc', label: 'Oldest Added' },
            { value: 'year_desc', label: 'Year (New → Old)' },
            { value: 'year_asc', label: 'Year (Old → New)' },
            { value: 'price_asc', label: 'Price (Low → High)' },
            { value: 'price_desc', label: 'Price (High → Low)' },
            { value: 'averageValue_asc', label: 'Avg Value (Low → High)' },
            { value: 'averageValue_desc', label: 'Avg Value (High → Low)' },
            { value: 'title_asc', label: 'Name (A → Z)' },
            { value: 'title_desc', label: 'Name (Z → A)' },
          ]}
        />
      </form>

      {/* Active filter pills */}
      {activeFilterCount > 0 && (
        <div className="px-5 pb-4 flex flex-wrap gap-2">
          {searchTerm && (
            <span className="flex items-center gap-1.5 px-3 py-1 text-[11px] rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.25)] text-[#c9a84c]">
              Search: &ldquo;{searchTerm}&rdquo;
              <button onClick={() => setSearchTerm(null)} className="hover:text-white ml-0.5">×</button>
            </span>
          )}
          {selectedYear && (
            <span className="flex items-center gap-1.5 px-3 py-1 text-[11px] rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.25)] text-[#c9a84c]">
              Year: {selectedYear}
              <button onClick={() => setSelectedYear(null)} className="hover:text-white ml-0.5">×</button>
            </span>
          )}
          {selectedBrand && (
            <span className="flex items-center gap-1.5 px-3 py-1 text-[11px] rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.25)] text-[#c9a84c]">
              Brand: {selectedBrand}
              <button onClick={() => setSelectedBrand(null)} className="hover:text-white ml-0.5">×</button>
            </span>
          )}
          {selectedCondition && (
            <span className="flex items-center gap-1.5 px-3 py-1 text-[11px] rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.25)] text-[#c9a84c]">
              Condition: {selectedCondition}
              <button onClick={() => setSelectedCondition(null)} className="hover:text-white ml-0.5">×</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}