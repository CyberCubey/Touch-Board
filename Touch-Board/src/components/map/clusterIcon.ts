import { divIcon, point } from "leaflet";

export const createClusterCustomIcon = (cluster: any) =>
  divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
