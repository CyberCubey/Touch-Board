import { useState } from 'react';
import { useContentful } from './hooks/useContentfulData';
import NewsList from './components/news/NewsList';
import MapComponent from './components/map/Map';
import './App.scss';

export default function App() {
  const { nyheder, loading, error } = useContentful();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="app">
      {/* Info-knap øverst til højre */}
      <button
        className="info-button"
        onTouchStart={() => setShowInfo(true)}
      >
        Info
      </button>

      <div className="main">
        {/* Venstre side – kort (placeholder) */}
        <div className="map">
          {loading && <p>Henter data...</p>}
          {error && <p>Fejl: {error}</p>}
          <MapComponent />
        </div>

        {/* Højre side – kun nyheder (uden "Lavet af..." her) */}
        <aside className="sidebar">
          <NewsList nyheder={nyheder} loading={loading} error={error} />
        </aside>
      </div>

      {/* Lille tekst nederst i sort ramme (udenfor aside) */}
      <div className="made-by">
        Dette verdenskort er lavet af elever på Webudvikler-uddannelsen
      </div>

      {/* Simpel info-modal */}
      {showInfo && (
        <div className="modal" onTouchStart={() => setShowInfo(false)}>
          <div className="modal-box" onTouchStart={e => e.stopPropagation()}>
            <button
              className="close-button"
              onTouchStart={() => setShowInfo(false)}
            >
              Luk
            </button>

            <h2>Globaliseringskontoret</h2>
            <p>Vi hjælper med Erasmus+ og udveksling.</p>
            <p>Erasmus+ er et EU-program for studerende.</p>
            <p>Kontakt: global@skolen.dk</p>
          </div>
        </div>
      )}
    </div>
  );
}
