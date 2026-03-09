import type { ReactElement } from 'react';
import './InformationModal.scss';

type Props = {
  items: any[];
  onClose: () => void;
};

function extractPlain(node: any): string {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractPlain).join('');
  if (node.nodeType === 'text') return node.value || '';
  const content = node.content || [];
  return Array.isArray(content) ? content.map(extractPlain).join('') : '';
}

export default function InformationModal({ items, onClose }: Props): ReactElement {
  return (
    <div className="information-backdrop" onClick={onClose}>
      <div className="information-modal" onClick={e => e.stopPropagation()}>
        <button className="information-close" onClick={onClose}>×</button>
        <h2>Information</h2>
        <div className="information-list">
          {items && items.length > 0 ? (
            items.map((it: any) => (
              <section key={it.sys?.id} className="information-item">
                <h3 className="information-item-title">{it.fields?.title}</h3>
                <div className="information-item-body">
                  {it.fields?.description ? (
                    typeof it.fields.description === 'string' ? (
                      <p>{it.fields.description}</p>
                    ) : (
                      <p>{extractPlain(it.fields.description)}</p>
                    )
                  ) : null}
                  { /* Render a URL/link if available in common fields */ }
                  { (it.fields?.url || it.fields?.link || it.fields?.website) && (
                    <div className="information-item-footer">
                      <a
                        href={ensureUrl(it.fields?.url || it.fields?.link || it.fields?.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {it.fields?.urlText || 'Læs mere'}
                      </a>
                    </div>
                  )}
                </div>
              </section>
            ))
          ) : (
            <p>Ingen information fundet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ensureUrl(raw: string | undefined): string {
  if (!raw) return '#';
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
  return 'https://' + raw;
}
