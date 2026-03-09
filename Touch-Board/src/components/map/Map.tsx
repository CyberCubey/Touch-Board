import type { ReactElement } from "react";
import "leaflet/dist/leaflet.css";
import "./map.scss";

import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { createCustomIcon } from "./icon";
import { createClusterCustomIcon } from "./clusterIcon";
import MarkerList from "./MarkerList";

export default function MapComponent(): ReactElement {
  const customIcon = createCustomIcon();

  const MapContainerAny: any = MapContainer;
  const TileLayerAny: any = TileLayer;
  const MarkerClusterGroupAny: any = MarkerClusterGroup;

  return (
    <MapContainerAny center={[57.050028, 9.965567]} zoom={15}>
      <TileLayerAny
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroupAny chunkedLoading iconCreateFunction={createClusterCustomIcon}>
        <MarkerList icon={customIcon} />
      </MarkerClusterGroupAny>
    </MapContainerAny>
  );
}
