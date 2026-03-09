import type { ReactElement } from 'react';
import './ActivityModal.scss';
import { getImageUrl } from '../../services/contentful';
import { useEffect } from 'react';
import { useContentful } from '../../hooks/useContentfulData';

type Props = {
  activity: any;
  onClose: () => void;
};

export default function ActivityModal({ activity, onClose }: Props): ReactElement {
  if (!activity) return <></>;

  const { fields, sys } = activity;
  const img = getImageUrl(fields?.thumbnail);
  const { aktiviteter } = useContentful();

  useEffect(() => {
    // compute and set CSS vars for image width and height based on reference image
    const root = document.documentElement;
    const existingW = root.style.getPropertyValue('--activity-image-width');
    const existingH = root.style.getPropertyValue('--activity-image-height');
    if (existingW && existingH) return;

    const ref = (aktiviteter || []).find((a: any) => a.fields?.title === 'Byens mini-Olympiade');
    const refUrl = ref ? getImageUrl(ref.fields?.thumbnail) : null;

    if (refUrl) {
      const imgEl = new Image();
      imgEl.src = refUrl;
      imgEl.onload = () => {
        const w = Math.round(imgEl.naturalWidth / 2);
        const h = Math.round(imgEl.naturalHeight / 2);
        const maxW = 900;
        const maxH = 700;
        const finalW = Math.min(w, maxW);
        const finalH = Math.min(h, maxH);
        root.style.setProperty('--activity-image-width', `${finalW}px`);
        root.style.setProperty('--activity-image-height', `${finalH}px`);
      };
      imgEl.onerror = () => {
        root.style.setProperty('--activity-image-width', '500px');
        root.style.setProperty('--activity-image-height', '320px');
      };
    } else {
      root.style.setProperty('--activity-image-width', '500px');
      root.style.setProperty('--activity-image-height', '320px');
    }
  }, [aktiviteter]);

  return (
    <div className="activity-modal-backdrop" onClick={onClose}>
      <div className="activity-modal" onClick={e => e.stopPropagation()}>
        <button className="activity-modal-close" onClick={onClose}>×</button>

        <div className="activity-modal-header">
          <div className="activity-left">
            <h2 className="activity-title">{fields?.title}</h2>
            <div className="activity-meta">
              <div><strong>Hvem:</strong> {fields?.hvem}</div>
              <div><strong>Hvor:</strong> {fields?.hvor}</div>
              <div><strong>Periode:</strong> {fields?.periode}</div>
            </div>

            <div className="activity-body">
              {/* Render plain text from Contentful rich text or string description */}
              {fields?.description ? (
                typeof fields.description === 'string' ? (
                  <p>{fields.description}</p>
                ) : (
                  <p>{extractRichTextPlain(fields.description)}</p>
                )
              ) : null}
            </div>
          </div>

          <div className="activity-right">
            {img ? (
              <div className="activity-image">
                <img src={img + '?w=1200'} alt={fields?.title || 'Aktivitet'} />
              </div>
            ) : (
              <div className="activity-image activity-image--placeholder" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple helper to extract plain text from Contentful Rich Text document
function extractRichTextPlain(node: any): string {
  if (!node) return '';
  if (Array.isArray(node)) return node.map(extractRichTextPlain).join('');
  if (typeof node === 'string') return node;
  const nodeType = node.nodeType;
  if (nodeType === 'text') return node.value || '';
  const content = node.content || node.data || [];
  if (Array.isArray(content)) return content.map(extractRichTextPlain).join('');
  return '';
}
