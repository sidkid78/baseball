import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8">
        <span className="text-8xl opacity-10">⚾</span>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-serif text-6xl font-bold text-gold-gradient">404</h1>
        </div>
      </div>
      
      <h2 className="font-serif text-2xl text-[#e0d9c4] mb-4">Out of the Park</h2>
      <p className="text-[#7a6e58] max-w-md mx-auto mb-10 leading-relaxed">
        The card or page you are looking for isn&apos;t in our collection. 
        It might have been traded or moved to another section of the vault.
      </p>
      
      <Link 
        href="/cards"
        className="px-8 py-3 bg-[#c9a84c] text-black text-sm font-bold tracking-widest uppercase rounded hover:bg-[#e8c96e] transition-all"
      >
        Return to the Vault
      </Link>
    </div>
  );
}
