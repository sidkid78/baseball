import React from 'react';
import { BaseballCard } from '@/data/cards';
import { Card as UiCard, CardContent, CardFooter } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  card: BaseballCard;
};

export const CardPreview: React.FC<Props> = ({ card }) => {
  const cardStatus = card.available ? 'Available' : 'Sold';
  // The original CardPreview design in instructions.md mentioned a 'Pending' status.
  // Our BaseballCard interface currently only has `available: boolean`.
  // 'Pending' status might require an update to the BaseballCard interface later if needed.

  return (
    <UiCard className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-white dark:focus-within:ring-offset-slate-900 bg-white dark:bg-slate-900">
      <Link
        href={`/cards/${card.id}`}
        aria-label={`View details of ${card.title}`}
        className="flex flex-col flex-grow"
      >
        <div className="aspect-[3/4] relative bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
          {card.images && card.images.length > 0 ? (
            <Image
              src={card.images[0]}
              alt={`${card.year} ${card.brand} ${card.title} baseball card`}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 768px) 40vw, (max-width: 1024px) 30vw, 20vw"
              className="object-cover transition-transform group-hover:scale-105"
              quality={80}
              priority={card.available} // Prioritize loading images of available cards
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400 dark:text-slate-600">No Image</div>
          )}
          {cardStatus !== "Available" && (
            <span
              className={`absolute top-2 left-2 z-10 rounded px-2 py-0.5 text-xs font-semibold text-white shadow-md
                ${cardStatus === 'Sold' ? 'bg-red-600 dark:bg-red-700' : 'bg-yellow-500 dark:bg-yellow-600'}`}
            >
              {cardStatus}
            </span>
          )}
        </div>
        <CardContent className="flex flex-grow flex-col p-4">
          <h3 className="truncate font-semibold text-base text-slate-900 dark:text-slate-100" title={card.title}>
            {card.title}
          </h3>
          <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
            {card.brand}, {card.year}
          </p>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Condition: <span className="font-medium">{card.condition}</span>
          </p>
          {/* Price can be displayed here if desired, kept inside the link area */}
          {card.price !== undefined && (
            <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
              Price: ${card.price.toFixed(2)}
            </p>
          )}
          {card.averageValue !== undefined && (
            <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
              Avg Value: ${card.averageValue.toFixed(2)}
            </p>
          )}
        </CardContent>
      </Link>
      <CardFooter className="p-3 pt-0 border-t border-slate-200 dark:border-slate-700 mt-auto">
        {/* Added border-t and mt-auto for separation */}
        <Link
          href={`/contact?cardId=${card.id}&cardName=${encodeURIComponent(card.title)}`}
          className={buttonVariants({ variant: "secondary", size: "sm", className: "w-full" })}
        >
          Inquire / Buy
        </Link>
      </CardFooter>
    </UiCard>
  );
};