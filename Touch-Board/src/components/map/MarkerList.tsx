import { Marker as LeafletMarker, Popup } from "react-leaflet";
import { markers } from "./markers";
import type { ReactElement } from "react";

type Props = {
  icon: any;
};

export default function MarkerList({ icon }: Props): ReactElement {
  const Marker: any = LeafletMarker;

  return (
    <>
      {markers.map((marker, i) => (
        <Marker key={i} position={marker.geocode as [number, number]} icon={icon}>
          <Popup>{marker.popUp}</Popup>
        </Marker>
      ))}
    </>
  );
}
