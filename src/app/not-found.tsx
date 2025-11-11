import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-neutral-dark mb-4">Page Not Found</h1>
        <p className="text-neutral-dark/70 mb-8">The page you're looking for doesn't exist.</p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white rounded-lg hover:bg-green-dark transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

