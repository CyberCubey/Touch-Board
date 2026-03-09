// src/hooks/useContentful.ts
import { useState, useEffect } from 'react';
import { getNyheder, getAktiviteter } from '../services/contentful';

export function useContentful() {
  const [nyheder, setNyheder] = useState<any[]>([]);
  const [aktiviteter, setAktiviteter] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [newsData, actData] = await Promise.all([
          getNyheder(),
          getAktiviteter()
        ]);

        function resolveItems(data: any) {
          const items = data.items || [];
          const assets = (data.includes && data.includes.Asset) || [];
          const assetMap = new Map(assets.map((a: any) => [a.sys.id, a]));

          return items.map((item: any) => {
            const fields = { ...item.fields };
            // Resolve thumbnail link to actual asset object when possible
            if (fields.thumbnail && fields.thumbnail.sys && fields.thumbnail.sys.type === 'Link') {
              const id = fields.thumbnail.sys.id;
              fields.thumbnail = assetMap.get(id) || fields.thumbnail;
            }
            return { ...item, fields };
          });
        }

        setNyheder(resolveItems(newsData));
        setAktiviteter(resolveItems(actData));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { nyheder, aktiviteter, loading, error };
}