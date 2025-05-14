import Link from 'next/link';
import { cards } from '@/data/cards'; // Assuming your cards data and type are here
import { CardPreview } from '@/components/card-preview'; // Assuming your CardPreview component

export default function HomePage() {
  const featuredCards = cards.slice(0, 8); // Display up to 8 featured cards

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white dark:bg-slate-900">
      <header className="text-center sm:text-left mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl mb-3">
          Welcome to Shaun&apos;s Baseball Cards
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto sm:mx-0">
          Explore a curated selection of rare and classic baseball cards from my personal collection. Find your next treasure!
        </p>
        <div className="mt-6">
          <Link
            href="/cards"
            className="inline-block rounded-md bg-blue-600 dark:bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-blue-700 dark:hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400 transition-colors"
          >
            Browse All Cards &rarr;
          </Link>
        </div>
      </header>

      {featuredCards.length > 0 && (
        <section aria-labelledby="featured-cards-heading">
          <h2 id="featured-cards-heading" className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-6">
            Featured Cards
          </h2>
          <div
            className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
          >
            {featuredCards.map((card) => (
              <CardPreview key={card.id} card={card} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
