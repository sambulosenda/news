'use client';

import { useState, FormEvent } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <>
      <h3 className="font-serif text-2xl font-bold mb-2">
        Get the Morning Briefing
      </h3>
      <p className="text-gray-600 mb-4">
        Start your day with the top stories delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
          required
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      {status === 'success' && (
        <p className="mt-2 text-green-600 text-sm">
          Successfully subscribed! Check your email for confirmation.
        </p>
      )}
    </>
  );
}