'use client';

import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';

interface Props {
  src: string;
  alt: string;
}

export function CardImageZoom({ src, alt }: Props) {
  const [isZoomed, setIsZoomed] = useState(false);

  const openZoom = useCallback(() => setIsZoomed(true), []);
  const closeZoom = useCallback(() => setIsZoomed(false), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeZoom();
      }
    };

    if (isZoomed) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isZoomed, closeZoom]);

  return (
    <>
      <button
        type="button"
        className="block group w-full aspect-[3/4] relative outline-none rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:shadow-slate-800"
        aria-label={`View zoomed image of ${alt}`}
        onClick={openZoom}
        style={{ cursor: 'zoom-in' }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover transition-transform group-hover:scale-105 duration-300 ease-in-out"
          quality={90}
          priority
        />
        <span
          className="absolute bottom-2 right-2 bg-black/60 dark:bg-slate-800/70 rounded-full p-1.5 text-white text-xs pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        >
          🔍 Zoom
        </span>
      </button>

      {isZoomed && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 dark:bg-slate-900/95 flex items-center justify-center p-4 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="zoomed-image-alt"
          onClick={closeZoom}
        >
          <button
            type="button"
            className="absolute top-4 right-4 bg-black/70 dark:bg-slate-800/80 rounded-full p-2 text-white hover:bg-black/90 dark:hover:bg-slate-700/90 transition-colors z-20 focus-visible:ring-2 focus-visible:ring-white"
            onClick={(e) => {
              e.stopPropagation();
              closeZoom();
            }}
            aria-label="Close zoomed image"
            autoFocus
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Hidden alt text for screen readers */}
          <p id="zoomed-image-alt" className="sr-only">
            {alt}
          </p>
          {/* Container to prevent image click from closing modal if image is smaller than backdrop */}
          <div
            className="relative max-h-[90vh] max-w-[90vw] animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={1600}
              className="object-contain rounded-lg shadow-2xl dark:shadow-slate-900"
              style={{ maxHeight: '90vh', width: 'auto' }}
              quality={95}
              priority
            />
          </div>
          {/* 
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn { animation: fadeIn 0.2s ease-out; }

          @keyframes scaleUp {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-scaleUp { animation: scaleUp 0.2s ease-out; }
          */}
        </div>
      )}
    </>
  );
}