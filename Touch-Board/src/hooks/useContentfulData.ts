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

        setNyheder(newsData.items || []);
        setAktiviteter(actData.items || []);
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