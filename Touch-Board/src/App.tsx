import { useState } from 'react';
import { useContentful } from './hooks/useContentfulData';
import NewsList from './components/news/NewsList';
import MapComponent from './components/map/Map';
import './App.scss';
import InformationModal from './components/info/InformationModal';

export default function App() {
  const { nyheder, loading, error, information } = useContentful();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="app">
      {/* Info-knap øverst til højre */}
      <button
        className="info-button"
        onTouchStart={() => setShowInfo(true)}
        onClick={() => setShowInfo(true)}
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
        <InformationModal items={information} onClose={() => setShowInfo(false)} />
      )}
    </div>
  );
}
