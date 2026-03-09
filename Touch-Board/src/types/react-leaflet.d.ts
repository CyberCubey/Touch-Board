declare module "react-leaflet" {
  import * as React from "react";

  export type MapContainerProps = any;
  export const MapContainer: React.FC<MapContainerProps>;

  export type TileLayerProps = any;
  export const TileLayer: React.FC<TileLayerProps>;

  export type MarkerProps = any;
  export const Marker: React.FC<MarkerProps>;

  export type PopupProps = any;
  export const Popup: React.FC<PopupProps>;

  export default {} as any;
}
