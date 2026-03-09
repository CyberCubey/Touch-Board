import { getImageUrl } from '../../services/contentful';

type Props = {
  nyheder: any[];
  loading: boolean;
  error: string | null;
};

export default function NewsList({ nyheder, loading, error }: Props) {
  if (loading) return <p>Henter nyheder...</p>;
  if (error) return <p>Fejl: {error}</p>;
  if (nyheder.length === 0) return <p>Ingen nyheder</p>;

  return (
    <div>
      <h2>Nyheder</h2>
      {nyheder.map(item => {
        const img = getImageUrl(item.fields.thumbnail);

        return (
          <div key={item.sys.id} style={{ marginBottom: '1rem' }}>
            {img && (
              <img
                src={img + '?w=300'}
                alt={item.fields.title}
                style={{ width: '100%', marginBottom: '0.5rem' }}
              />
            )}
            <h3>{item.fields.title}</h3>
            <p>{item.fields.underTitle}</p>
            <p>
              {item.fields.description?.content?.[0]?.content?.[0]?.value?.slice(0, 100) || ''}...
            </p>
          </div>
        );
      })}
    </div>
  );
}