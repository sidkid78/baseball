'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon, CheckCircledIcon } from '@radix-ui/react-icons';

interface FormData {
  name: string;
  email: string;
  message: string;
  cardId: string;
  cardName: string;
  phone: string; // Honeypot field, should remain hidden
}

function ContactForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    cardId: '',
    cardName: '',
    phone: '' // Honeypot
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const cardIdParam = searchParams.get('cardId');
    const cardNameParam = searchParams.get('cardName');
    if (cardIdParam) {
      setFormData(prev => ({ ...prev, cardId: cardIdParam }));
    }
    if (cardNameParam) {
      setFormData(prev => ({ ...prev, cardName: cardNameParam }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Name is required.');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setError('Message must be at least 10 characters long.');
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            cardId: formData.cardId || undefined, // Send undefined if empty
            cardName: formData.cardName || undefined, // Send undefined if empty
            phone: formData.phone // Honeypot
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send inquiry.');
      }

      setSuccess(result.message || 'Inquiry sent successfully! We will get back to you soon.');
      // Optionally reset form
      // setFormData({
      //   name: '',
      //   email: '',
      //   message: '',
      //   cardId: '',
      //   cardName: '',
      //   phone: ''
      // });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const pageTitle = formData.cardName
    ? `Inquire about: ${formData.cardName}`
    : 'Contact Us';

  const initialMessage = formData.cardName && formData.cardId
    ? `I'm interested in the ${formData.cardName} (ID: ${formData.cardId}). Please provide more information or discuss purchase options.\n\n`
    : '';

  useEffect(() => {
    if (initialMessage && !formData.message) { // Only set if message is empty
        setFormData(prev => ({ ...prev, message: initialMessage }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]); // Rerun if initialMessage changes (e.g. cardName/cardId params load)


  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white dark:bg-slate-900">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
          {pageTitle}
        </h1>
        {formData.cardName && (
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
            Fill out the form below to ask a question or express interest in this card.
          </p>
        )}
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot Field: Visually hidden, should not be filled by users */}
        <div className="sr-only" aria-hidden="true">
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1"
            maxLength={100}
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1"
            maxLength={100}
          />
        </div>

        {formData.cardName && (
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Regarding Card:</p>
            <p className="text-slate-600 dark:text-slate-400">{formData.cardName}</p>
            {formData.cardId && <p className="text-xs text-slate-500 dark:text-slate-400">ID: {formData.cardId}</p>}
          </div>
        )}

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="mt-1"
            minLength={10}
            maxLength={2000}
            placeholder={formData.cardName ? 'Please type your inquiry here...' : 'How can we help you?'}
          />
        </div>

        {error && (
          <Alert variant="destructive" className="dark:bg-red-950 dark:border-red-800 dark:text-red-200">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert variant="default" className="bg-green-50 border-green-300 text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-200">
             <CheckCircledIcon className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div>
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? 'Sending...' : 'Send Inquiry'}
          </Button>
        </div>
      </form>
    </main>
  );
}

// Basic loading fallback component
function ContactLoading() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <header className="mb-10">
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
      </header>
      <div className="space-y-6">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
      </div>
    </main>
  );
}

// New default export for the page
export default function ContactPage() {
  return (
    <Suspense fallback={<ContactLoading />}>
      <ContactForm />
    </Suspense>
  );
} 