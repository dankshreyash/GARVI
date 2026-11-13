import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../services/monitoring';

const BASE_URL = 'https://garvi-inky.vercel.app';
const DEFAULT_IMAGE = `${BASE_URL}/kcg_gujarat_transparent.png`;

function upsertMeta(attr, key, content) {
  if (!content) return;
  let element = document.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function upsertStructuredData(id, schemaJson) {
  let script = document.getElementById(id);
  if (!schemaJson) {
    if (script) script.remove();
    return;
  }
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schemaJson);
}

/**
 * Reusable SEO Manager component:
 * - Updates Document Title
 * - Injects Meta Description, Keywords, Author, Robots
 * - Configures Open Graph & Twitter Card tags
 * - Sets Canonical URL (preventing duplicate content)
 * - Injects structured Schema.org JSON-LD
 */
export default function Seo({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  noindex = false,
  schemas = []
}) {
  const location = useLocation();
  const currentCanonical = canonical || `${BASE_URL}${location.pathname}`;

  useEffect(() => {
    // 1. Document Title
    const fullTitle = title
      ? `${title} | GARVI Gujarat Higher Education`
      : 'GARVI — Gujarat Academic Ratings Visualization for Improvement | GSIRF 2026';
    document.title = fullTitle;

    // 2. Standard Meta Tags
    upsertMeta('name', 'description', description || 'GARVI (Gujarat Academic Ratings Visualization for Improvement) is the official state analytics & institutional benchmarking engine powering GSIRF for 470+ colleges.');
    if (keywords) upsertMeta('name', 'keywords', keywords);
    upsertMeta('name', 'author', 'Education Department, Government of Gujarat & Knowledge Consortium of Gujarat (KCG)');
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

    // 3. Open Graph Tags
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description || 'GARVI official state rating analytics & benchmarking engine for Gujarat institutions.');
    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:url', currentCanonical);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:site_name', 'GARVI Gujarat');
    upsertMeta('property', 'og:locale', 'en_IN');

    // 4. Twitter Card Tags
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description || 'GARVI official institutional analytics & benchmarking portal.');
    upsertMeta('name', 'twitter:image', ogImage);

    // 5. Canonical Link
    upsertCanonical(currentCanonical);

    // 6. Google Analytics Virtual Page View tracking
    trackPageView(location.pathname, fullTitle);

    // 7. JSON-LD Schemas
    if (Array.isArray(schemas) && schemas.length > 0) {
      schemas.forEach((schema, idx) => {
        upsertStructuredData(`schema-jsonld-${idx}`, schema);
      });
    }

    return () => {
      // Clean up dynamic schema scripts on unmount
      if (Array.isArray(schemas)) {
        schemas.forEach((_, idx) => {
          const el = document.getElementById(`schema-jsonld-${idx}`);
          if (el) el.remove();
        });
      }
    };
  }, [title, description, keywords, currentCanonical, ogType, ogImage, noindex, schemas, location.pathname]);

  return null;
}

