import { getImageUrl } from '../../services/contentful';
import './NewsList.scss';
import { useEffect, useState } from 'react';

type Props = {
  nyheder: any[];
  loading: boolean;
  error: string | null;
};

export default function NewsList({ nyheder, loading, error }: Props) {
  if (loading) return <div className="news-loading">Henter nyheder...</div>;
  if (error) return <div className="news-error">Fejl: {error}</div>;
  if (nyheder.length === 0) return <div className="news-empty">Ingen nyheder</div>;

  // rotation: show `pageSize` items at a time and advance every `intervalMs`
  const pageSize = 2;
  const intervalMs = 10 * 60 * 1000; // 10 minutes
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    // reset start when data changes
    setStartIndex(0);
  }, [nyheder]);

  useEffect(() => {
    if (!nyheder || nyheder.length <= pageSize) return;
    const id = setInterval(() => {
      setStartIndex(prev => (prev + pageSize) % nyheder.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [nyheder]);

  const visible = (() => {
    if (!nyheder || nyheder.length <= pageSize) return nyheder;
    const end = startIndex + pageSize;
    if (end <= nyheder.length) return nyheder.slice(startIndex, end);
    // wrap-around
    return [...nyheder.slice(startIndex), ...nyheder.slice(0, end % nyheder.length)];
  })();

  return (
    <div className="news-container">
      <h2 className="news-title">Nyheder</h2>
      {visible.map(item => {
        const img = getImageUrl(item.fields.thumbnail);

        return (
          <article key={item.sys.id} className="news-card">
            {img ? (
              <div className="news-thumbnail">
                <img
                  src={img + '?w=800'}
                  alt={item.fields.title || 'Nyhedsbillede'}
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="news-thumbnail-placeholder">Ingen billede</div>
            )}

            <div className="news-card-content">
              <h3 className="news-card-title">{item.fields.title}</h3>
              <div className="news-card-subtitle">{item.fields.underTitle}</div>
              <p className="news-excerpt">
                {item.fields.description?.content?.[0]?.content?.[0]?.value?.slice(0, 120) || ''}
                {"..."}
              </p>
              <div className="news-date">{item.sys.createdAt && new Date(item.sys.createdAt).toLocaleDateString()}</div>
            </div>
          </article>
        );
      })}
    </div>
  );
}