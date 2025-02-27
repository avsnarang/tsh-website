import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  schema?: object;
}

export function useSEO({ title, description, url, image = '/og-image.jpg', schema }: SEOProps) {
  const location = useLocation();
  const fullUrl = url || `https://tsh.edu.in${location.pathname}`;
  const fullTitle = title.includes("The Scholars' Home") ? title : `${title} | The Scholars' Home`;

  useEffect(() => {
    // Update basic meta tags
    document.title = fullTitle;

    const metaTags = {
      'description': description,
      'og:title': fullTitle,
      'og:description': description,
      'og:url': fullUrl,
      'og:image': image,
      'twitter:title': fullTitle,
      'twitter:description': description,
      'twitter:image': image
    };

    // Update or create meta tags
    Object.entries(metaTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // Update JSON-LD Schema
    if (schema) {
      let jsonLd = document.querySelector('script[type="application/ld+json"]');
      if (!jsonLd) {
        jsonLd = document.createElement('script');
        jsonLd.setAttribute('type', 'application/ld+json');
        document.head.appendChild(jsonLd);
      }
      jsonLd.textContent = JSON.stringify(schema);
    }

    // Cleanup function
    return () => {
      // Optional: Remove dynamic meta tags on unmount
      // In practice, we usually don't need this as they'll be updated by the next page
    };
  }, [fullTitle, description, fullUrl, image, schema]);
}
