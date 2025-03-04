import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { seoConfig } from '../config/seoConfig';

interface SEOProps {
  pageKey?: keyof typeof seoConfig;
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  schema?: object;
}

export function useSEO({ pageKey, ...customProps }: SEOProps) {
  const location = useLocation();
  
  // Get default config from seoConfig if pageKey is provided
  const defaultConfig = pageKey ? seoConfig[pageKey] : null;
  
  // Merge default config with custom props
  const {
    title = defaultConfig?.title ?? '',
    description = defaultConfig?.description ?? '',
    url = defaultConfig?.url ?? `https://tsh.edu.in${location.pathname}`,
    image = defaultConfig?.image ?? '/og-image.jpg',
    schema = defaultConfig?.schema
  } = customProps;

  const fullTitle = title.includes("The Scholars' Home") ? title : `${title} | The Scholars' Home`;

  useEffect(() => {
    // Update basic meta tags
    document.title = fullTitle;

    const metaTags = {
      'description': description,
      'og:title': fullTitle,
      'og:description': description,
      'og:url': url,
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
    canonical.setAttribute('href', url);

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
  }, [fullTitle, description, url, image, schema]);
}
