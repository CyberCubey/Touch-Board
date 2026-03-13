import "./src/styles.css";
import "leaflet/dist/leaflet.css";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Icon, divIcon, point } from "leaflet";

const customIcon = new Icon({
  iconUrl: require("./icons/marker.png"),
  iconSize: [38, 38],
});

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};



const SPACE_ID = 'fgprzh3vayg6';
const ACCESS_TOKEN = 'Tj3D7r-2e5ksKPaWSnr1ZrI5hp9K-7ky6kVjU1qJYZY';

const markers = [
  {
    geocode: [57.047817, 9.968126],
    popUp: "TECHCOLLEGE 1",
  },
  {
    geocode: [57.051446, 9.96374],
    popUp: "TECHCOLLEGE 2",
  },
  {
    geocode: [27.9656, -15.58764],
    popUp: "Gran Canaria",
  },
  {
    geocode: [51.500725, -0.124454],
    popUp: "BIG BEN",
  },
];

export default function App() {
  const [entries, setEntries] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}`
      );
      const data = await res.json();
      setEntries(data.items || []);

if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Failed to fetch entries");
  }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <>
      {loading && <p>Loading entries...</p>}
      {error && <p>Error: {error}</p>}

      <MapContainer center={[57.050028, 9.965567]} zoom={15}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {markers.map((marker, idx) => (
            <Marker key={idx} position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
}