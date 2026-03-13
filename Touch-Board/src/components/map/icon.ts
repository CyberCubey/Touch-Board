import markerImg from "../../icons/marker.png";
import { Icon } from "leaflet";

export function createCustomIcon(): Icon {
  return new Icon({
    iconUrl: String(markerImg),
    iconSize: [38, 38],
  });
}
