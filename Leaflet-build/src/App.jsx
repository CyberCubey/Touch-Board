import "./src/styles.css";
import "leaflet/dist/leaflet.css";

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
  return (
    <MapContainer center={[57.050028, 9.965567]} zoom={15}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
