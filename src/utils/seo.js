import { useEffect } from 'react';

export const SITE_URL = 'https://servya.buildnaya.com';
export const SITE_NAME = 'Servya';
export const DEFAULT_DESCRIPTION =
  'Servya puts your restaurant menu on every table as a QR code and sends each order straight to the kitchen board. Built for restaurants, cafes, bars and hotel dining.';
export const DEFAULT_IMAGE = `${SITE_URL}/images/hospitality/hero-steak-alt.webp?v=4`;
export const TWITTER_HANDLE = '@buildnaya';

function absoluteUrl(path = '/') {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function absoluteImage(src) {
  if (!src) return DEFAULT_IMAGE;
  if (/^https?:\/\//i.test(src)) return src;
  return `${SITE_URL}${src.startsWith('/') ? src : `/${src}`}`;
}

function upsertMeta(attr, key, content) {
  if (!content) return;
  let node = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attr, key);
    document.head.appendChild(node);
  }
  node.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let node = document.head.querySelector(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement('link');
    node.setAttribute('rel', rel);
    document.head.appendChild(node);
  }
  node.setAttribute('href', href);
}

function setJsonLd(id, data) {
  const existing = document.getElementById(id);
  if (!data) {
    if (existing) existing.remove();
    return;
  }
  const node = existing || document.createElement('script');
  node.type = 'application/ld+json';
  node.id = id;
  node.text = JSON.stringify(data);
  if (!existing) document.head.appendChild(node);
}

/** Update title, description, canonical, Open Graph, Twitter, and optional JSON-LD. */
export function applyPageSeo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image,
  type = 'website',
  noIndex = false,
  jsonLd,
  jsonLdId = 'servya-jsonld',
}) {
  const fullTitle = title?.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`;
  const url = absoluteUrl(path);
  const imageUrl = absoluteImage(image);

  document.title = fullTitle || `${SITE_NAME}: QR Ordering & Kitchen Board`;
  upsertMeta('name', 'description', description);
  upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
  upsertMeta('name', 'theme-color', '#0b0806');
  upsertMeta('name', 'author', 'BuildNaya');
  upsertLink('canonical', url);

  upsertMeta('property', 'og:site_name', SITE_NAME);
  upsertMeta('property', 'og:type', type);
  upsertMeta('property', 'og:title', fullTitle);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', url);
  upsertMeta('property', 'og:image', imageUrl);
  upsertMeta('property', 'og:locale', 'en_IN');

  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', fullTitle);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', imageUrl);
  upsertMeta('name', 'twitter:site', TWITTER_HANDLE);

  setJsonLd(jsonLdId, jsonLd);
}

export function usePageSeo(options) {
  useEffect(() => {
    applyPageSeo(options);
  }, [
    options.title,
    options.description,
    options.path,
    options.image,
    options.type,
    options.noIndex,
    options.jsonLdId,
    JSON.stringify(options.jsonLd),
  ]);
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    legalName: 'BuildNaya',
    url: SITE_URL,
    logo: `${SITE_URL}/logo192.png`,
    email: 'hello@buildnaya.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sector 62',
      addressLocality: 'Noida',
      postalCode: '201308',
      addressCountry: 'IN',
    },
    sameAs: ['https://buildnaya.com'],
  };
}

export function softwareSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      description: 'Trial plan available',
    },
    provider: {
      '@type': 'Organization',
      name: 'BuildNaya',
      url: 'https://buildnaya.com',
    },
  };
}

export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

export function articleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description || post.excerpt,
    image: [absoluteImage(post.image)],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'Servya team',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo192.png`,
      },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
