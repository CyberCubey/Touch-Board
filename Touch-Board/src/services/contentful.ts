// src/services/contentful.ts
const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

export async function fetchContentful(contentType: string) {
  const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?` +
              `access_token=${ACCESS_TOKEN}&` +
              `content_type=${contentType}&` +
              `include=5&` +          // ← vigtigt for at få billeder med
              `limit=100`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Contentful fejl: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

export async function getNyheder() {
  return fetchContentful('nyheder');
}

export async function getAktiviteter() {
  return fetchContentful('aktiviteter');
}

// Hjælpefunktion til at få billede-URL
export function getImageUrl(thumbnail: any) {
  if (!thumbnail?.fields?.file?.url) return null;
  return 'https:' + thumbnail.fields.file.url;
}