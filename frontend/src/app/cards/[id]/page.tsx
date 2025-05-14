import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script'; // Import Script component
import { cards, BaseballCard } from '@/data/cards';
import { CardImageZoom } from '@/components/card-image-zoom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge'; // For displaying status

type Props = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// Function to fetch card data (replace with actual data fetching if not using local file in future)
async function getCard(id: string): Promise<BaseballCard | undefined> {
  return cards.find((card) => card.id === id);
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { id } = params;
  const card = await getCard(id);

  if (!card) {
    return {
      title: 'Card Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const imageUrl = card.images && card.images.length > 0 
    ? card.images[0].startsWith('/') ? `${siteUrl}${card.images[0]}` : card.images[0]
    : `${siteUrl}/placeholder-card-image.jpg`; // Fallback image

  return {
    title: `${card.title} (${card.year} ${card.brand}) | Heritage Cardboard`,
    description: card.description,
    openGraph: {
      title: `${card.title} (${card.year} ${card.brand})`,
      description: card.description,
      url: `${siteUrl}/cards/${id}`,
      images: [
        {
          url: imageUrl,
          width: 800, // Consider actual image dimensions or common OG dimensions
          height: 600,
          alt: `${card.title} image`,
        },
      ],
      type: 'website', // Reverted to 'website' to satisfy Next.js OG types
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${card.title} (${card.year} ${card.brand})`,
      description: card.description,
      images: [imageUrl],
    },
  };
}

export default async function CardDetailsPage({ params }: Props) {
  const card = await getCard(params.id);

  if (!card) {
    notFound();
  }

  const cardStatus = card.available ? 'Available' : 'Sold';

  // Prepare JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: card.title,
    image: card.images && card.images.length > 0 ? card.images[0].startsWith('/') ? `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${card.images[0]}` : card.images[0] : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/placeholder-card-image.jpg`,
    description: card.description,
    sku: card.id, // Use card.id as a unique identifier
    brand: {
      '@type': 'Brand',
      name: card.brand,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: card.price !== undefined ? card.price.toFixed(2) : undefined,
      availability: card.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/cards/${params.id}`,
      seller: {
        '@type': 'Organization',
        name: 'Heritage Cardboard',
      },
    },
    // You can add more properties like condition, year, etc. as additionalProperty
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Year',
        value: card.year.toString(),
      },
      {
        '@type': 'PropertyValue',
        name: 'Condition',
        value: card.condition,
      },
    ],
  };

  return (
    <>
      {/* Add JSON-LD script to the head of the page */}
      <Script
        id={`card-structured-data-${card.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8">
          <Link
            href="/cards"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors"
          >
            &larr; Back to Catalog
          </Link>
        </nav>

        <article className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="w-full">
            {card.images && card.images.length > 0 ? (
              <CardImageZoom 
                src={card.images[0]} 
                alt={`${card.title} - ${card.year} ${card.brand}`}
              />
            ) : (
              <div className="aspect-[3/4] bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-500">
                No Image Available
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <header>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {card.title}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mt-1">
                {card.year} {card.brand} {card.set ? `- ${card.set}` : ''}
              </p>
            </header>

            <div className="flex items-center space-x-3">
              <Badge variant={card.available ? 'default' : 'destructive'} className="text-sm">
                {cardStatus}
              </Badge>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Condition: <span className="font-semibold text-slate-800 dark:text-slate-100">{card.condition}</span>
              </p>
              {card.cardNumber && (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Card #: <span className="font-semibold text-slate-800 dark:text-slate-100">{card.cardNumber}</span>
                </p>
              )}
            </div>
            
            {card.price !== undefined && (
               <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                 Price: ${card.price.toFixed(2)}
               </p>
            )}

            {card.averageValue !== undefined && (
              <p className="text-lg text-slate-700 dark:text-slate-300">
                Average Value: ${card.averageValue.toFixed(2)}
              </p>
            )}

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>{card.description}</p>
            </div>

            <div className="pt-4">
              {card.available ? (
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href={`/contact?cardId=${card.id}&cardName=${encodeURIComponent(card.title)}`}>
                    Inquire or Purchase
                  </Link>
                </Button>
              ) : (
                <Button size="lg" disabled className="w-full sm:w-auto">
                  Sold
                </Button>
              )}
            </div>

            {/* Optional: Tags or other details */}
            {card.tags && card.tags.length > 0 && (
              <div className="pt-4">
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
    </>
  );
} 