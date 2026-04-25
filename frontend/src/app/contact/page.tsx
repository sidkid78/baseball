'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  message: string;
  cardId: string;
  cardName: string;
  phone: string; // honeypot
}

/* ─── Reusable field wrapper ─────────────────────────────────── */
function FieldWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#7a6e58]"
    >
      {children}
    </label>
  );
}

const inputClass =
  'w-full bg-[#1a1711] border border-[rgba(201,168,76,0.2)] text-[#e0d9c4] text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-[#c9a84c] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)] placeholder:text-[#3a3020] transition-all duration-200 resize-none';

/* ─── Main form ──────────────────────────────────────────────── */
function ContactForm() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    cardId: '',
    cardName: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  /* Populate from URL params */
  useEffect(() => {
    const cardIdParam = searchParams.get('cardId');
    const cardNameParam = searchParams.get('cardName');
    setFormData(prev => ({
      ...prev,
      cardId: cardIdParam ?? '',
      cardName: cardNameParam ?? '',
    }));
  }, [searchParams]);

  /* Pre-fill message once card params are known */
  useEffect(() => {
    if (formData.cardName && formData.cardId && !formData.message) {
      setFormData(prev => ({
        ...prev,
        message: `I'm interested in the ${formData.cardName} (ID: ${formData.cardId}). Please provide more information or discuss purchase options.\n\n`,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.cardName, formData.cardId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) { setError('Name is required.'); return false; }
    if (!formData.email.trim()) { setError('Email is required.'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setError('Message must be at least 10 characters.');
      return false;
    }
    if (formData.message.trim().length > 2000) {
      setError('Message cannot exceed 2000 characters.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          cardId: formData.cardId || undefined,
          cardName: formData.cardName || undefined,
          phone: formData.phone,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to send inquiry.');
      setSuccess(result.message || 'Inquiry sent! We\'ll be in touch shortly.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const pageTitle = formData.cardName ? `Inquire About This Card` : 'Get In Touch';
  const pageSubtitle = formData.cardName
    ? `Send Shaun a message about the ${formData.cardName}.`
    : 'Interested in a card? Have a question? Reach out directly.';

  return (
    <>
      {/* ── Page hero ─────────────────────────────────────── */}
      <section className="relative border-b border-[rgba(201,168,76,0.15)] bg-[#0a0906] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(201,168,76,0.07),transparent)]" />
        <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[rgba(201,168,76,0.3)]" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[rgba(201,168,76,0.3)]" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-8 py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#5a5040] mb-6">
            <Link href="/" className="hover:text-[#c9a84c] transition-colors">Home</Link>
            <span>›</span>
            {formData.cardName && (
              <>
                <Link href="/cards" className="hover:text-[#c9a84c] transition-colors">The Vault</Link>
                <span>›</span>
                <span className="text-[#9a8e72] truncate max-w-[200px]">{formData.cardName}</span>
                <span>›</span>
              </>
            )}
            <span className="text-[#9a8e72]">Inquire</span>
          </nav>

          <p className="text-[10px] tracking-[0.4em] uppercase text-[#7a6e58] mb-4">
            ✦ &nbsp; Direct Contact
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gold-gradient mb-3">
            {pageTitle}
          </h1>
          <p className="text-[#7a6e58] text-sm max-w-xl">{pageSubtitle}</p>
        </div>
      </section>

      {/* ── Form body ─────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12">

        {/* Card reference pill */}
        {formData.cardName && (
          <div className="mb-8 flex items-center gap-3 p-4 rounded-xl border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.04)]">
            <span className="text-[#c9a84c] text-xl">⚾</span>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#5a5040]">Regarding card</p>
              <p className="text-sm font-semibold text-[#e0d9c4] mt-0.5">{formData.cardName}</p>
              {formData.cardId && (
                <p className="text-[11px] text-[#5a5040] mt-0.5">ID: {formData.cardId}</p>
              )}
            </div>
            <Link
              href={formData.cardId ? `/cards/${formData.cardId}` : '/cards'}
              className="ml-auto text-[11px] text-[#c9a84c] hover:underline"
            >
              View card →
            </Link>
          </div>
        )}

        {/* Success state */}
        {success ? (
          <div className="rounded-xl border border-emerald-700/40 bg-emerald-950/40 p-8 text-center flex flex-col items-center gap-4">
            <span className="text-4xl">✉️</span>
            <h2 className="font-serif text-2xl text-[#e0d9c4]">Message Sent!</h2>
            <p className="text-sm text-[#9a8e72] max-w-sm">{success}</p>
            <div className="flex gap-3 mt-2">
              <Link
                href="/cards"
                className="px-5 py-2.5 rounded border border-[rgba(201,168,76,0.3)] text-[#c9a84c] text-xs font-semibold uppercase tracking-widest hover:bg-[rgba(201,168,76,0.1)] transition-all"
              >
                Browse More Cards
              </Link>
              <Link
                href="/"
                className="px-5 py-2.5 rounded text-[#5a5040] text-xs font-semibold uppercase tracking-widest hover:text-[#c9a84c] transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-xl border border-[rgba(201,168,76,0.15)] bg-[#111009] overflow-hidden"
          >
            {/* Form header */}
            <div className="px-6 py-4 border-b border-[rgba(201,168,76,0.1)] bg-[rgba(201,168,76,0.03)]">
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#7a6e58]">
                Inquiry Form
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Honeypot — hidden from users, visible to bots */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name + Email row */}
              <div className="grid sm:grid-cols-2 gap-6">
                <FieldWrapper>
                  <FieldLabel htmlFor="name">Full Name *</FieldLabel>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </FieldWrapper>

                <FieldWrapper>
                  <FieldLabel htmlFor="email">Email Address *</FieldLabel>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </FieldWrapper>
              </div>

              {/* Message */}
              <FieldWrapper>
                <div className="flex items-end justify-between">
                  <FieldLabel htmlFor="message">Message *</FieldLabel>
                  <span className="text-[10px] text-[#3a3020]">
                    {formData.message.length} / 2000
                  </span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={7}
                  minLength={10}
                  maxLength={2000}
                  placeholder={formData.cardName ? 'Type your inquiry here...' : 'How can we help?'}
                  className={inputClass}
                />
              </FieldWrapper>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-3 p-4 rounded-lg border border-red-700/40 bg-red-950/40">
                  <span className="text-red-400 mt-0.5 shrink-0">⚠</span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-red-400 mb-0.5">Error</p>
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                </div>
              )}

              {/* Submit */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[#c9a84c] text-black text-sm font-bold tracking-widest uppercase hover:bg-[#e8c96e] transition-all duration-200 hover:shadow-[0_0_25px_rgba(201,168,76,0.35)] disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
                >
                  {isLoading ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>⚾ Send Inquiry</>
                  )}
                </button>
                <p className="text-[11px] text-[#3a3020]">
                  Shaun responds personally to every inquiry.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

/* ─── Skeleton loader ────────────────────────────────────────── */
function ContactLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-24 animate-pulse space-y-6">
      <div className="h-6 w-48 bg-[#1a1711] rounded" />
      <div className="h-12 w-2/3 bg-[#1a1711] rounded" />
      <div className="h-4 w-96 bg-[#1a1711] rounded" />
      <div className="mt-8 rounded-xl border border-[rgba(201,168,76,0.1)] bg-[#111009] p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="h-12 bg-[#1a1711] rounded-lg" />
          <div className="h-12 bg-[#1a1711] rounded-lg" />
        </div>
        <div className="h-40 bg-[#1a1711] rounded-lg" />
        <div className="h-12 w-40 bg-[#1a1711] rounded-lg" />
      </div>
    </div>
  );
}

/* ─── Page export ───────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <Suspense fallback={<ContactLoading />}>
      <ContactForm />
    </Suspense>
  );
}