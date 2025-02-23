import React, { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 className="text-xl text-neutral-light mb-4">Stay Updated</h3>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 rounded-full bg-neutral-light/10 text-neutral-light placeholder:text-neutral-light/50 focus:outline-none focus:ring-2 focus:ring-primary-light"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-neutral-light rounded-full hover:bg-primary-dark transition-colors"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}