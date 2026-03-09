import { Marker as LeafletMarker } from "react-leaflet";
import type { ReactElement } from "react";
import { useContentful } from "../../hooks/useContentfulData";
import { useState } from "react";
import ActivityModal from "../activities/ActivityModal";

type Props = {
  icon: any;
};

export default function MarkerList({ icon }: Props): ReactElement {
  const Marker: any = LeafletMarker;
  const { aktiviteter } = useContentful();
  const [selected, setSelected] = useState<any | null>(null);

  // derive markers from activities that have location
  const activityMarkers = (aktiviteter || [])
    .map((a: any) => {
      const loc = a.fields?.location;
      if (!loc || typeof loc.lat !== 'number' || typeof loc.lon !== 'number') return null;
      return {
        activity: a,
        id: a.sys?.id,
        position: [loc.lat, loc.lon] as [number, number],
        popup: a.fields?.title || 'Aktivitet',
      };
    })
    .filter(Boolean) as { activity: any; id: string; position: [number, number]; popup: string }[];

  return (
    <>
      {activityMarkers.map(marker => (
        <Marker
          key={marker.id}
          position={marker.position}
          icon={icon}
          eventHandlers={{ click: () => setSelected(marker.activity) }}
        />
      ))}

      {selected && (
        <ActivityModal activity={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
