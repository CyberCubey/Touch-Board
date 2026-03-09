// src/hooks/useContentfulData.ts
import { useState, useEffect } from 'react';
import { getNyheder, getAktiviteter, getInformation } from '../services/contentful';

// Shared module-level cache and subscription system to avoid duplicate fetches
let cache: {
  nyheder: any[];
  aktiviteter: any[];
  information: any[];
  loading: boolean;
  error: string | null;
} = {
  nyheder: [],
  aktiviteter: [],
  information: [],
  loading: true,
  error: null,
};

const subscribers: Array<() => void> = [];
let scheduled = false;
let timeoutId: any = null;
let intervalId: any = null;

function notify() {
  subscribers.forEach(fn => fn());
}

function resolveItems(data: any) {
  const items = data.items || [];
  const assets = (data.includes && data.includes.Asset) || [];
  const assetMap = new Map(assets.map((a: any) => [a.sys.id, a]));

  return items.map((item: any) => {
    const fields = { ...item.fields };
    if (fields.thumbnail && fields.thumbnail.sys && fields.thumbnail.sys.type === 'Link') {
      const id = fields.thumbnail.sys.id;
      fields.thumbnail = assetMap.get(id) || fields.thumbnail;
    }
    return { ...item, fields };
  });
}

async function fetchAll() {
  cache.loading = true;
  cache.error = null;
  notify();

  try {
    const [newsData, actData, infoData] = await Promise.all([
      getNyheder(),
      getAktiviteter(),
      getInformation(),
    ]);

    cache.nyheder = resolveItems(newsData);
    cache.aktiviteter = resolveItems(actData);
    cache.information = resolveItems(infoData);
  } catch (err: any) {
    cache.error = err?.message || String(err);
  } finally {
    cache.loading = false;
    notify();
  }
}

function scheduleNextFetch() {
  if (scheduled) return;
  scheduled = true;

  const now = new Date();
  const hour = now.getHours();
  // next multiple of 3 hours after current time
  const nextMultiple = (Math.floor(hour / 3) * 3) + 3;
  const candidate = new Date(now);
  candidate.setHours(nextMultiple);
  candidate.setMinutes(0, 0, 0);
  const delay = candidate.getTime() - now.getTime();
  // if delay is negative (shouldn't), default to 3h
  const safeDelay = delay > 0 ? delay : 3 * 60 * 60 * 1000;

  timeoutId = setTimeout(() => {
    fetchAll();
    intervalId = setInterval(fetchAll, 3 * 60 * 60 * 1000);
  }, safeDelay);
}

function clearSchedules() {
  scheduled = false;
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

export function useContentful() {
  const [, setVersion] = useState(0);

  useEffect(() => {
    const listener = () => setVersion(v => v + 1);
    subscribers.push(listener);

    if (subscribers.length === 1) {
      fetchAll();
      scheduleNextFetch();
    }

    return () => {
      const idx = subscribers.indexOf(listener);
      if (idx !== -1) subscribers.splice(idx, 1);
      if (subscribers.length === 0) clearSchedules();
    };
  }, []);

  return {
    nyheder: cache.nyheder,
    aktiviteter: cache.aktiviteter,
    information: cache.information,
    loading: cache.loading,
    error: cache.error,
  };
}
