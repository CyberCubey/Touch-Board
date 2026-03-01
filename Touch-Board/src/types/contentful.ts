export interface Nyhed {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    title: string;
    underTitle: string;
    thumbnail?: { sys: { id: string; linkType: 'Asset' } };
    description?: any; // RichText JSON
  };
  includes?: {
    Asset?: Array<{
      sys: { id: string };
      fields: {
        file: { url: string };
      };
    }>;
  };
}

export interface Aktivitet {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    location?: { lat: number; lon: number };
    hvem: string;
    hvor: string;
    periode: string;
    description?: any;
    thumbnail?: { sys: { id: string; linkType: 'Asset' } };
  };
  includes?: Nyhed['includes']; // Samme struktur
}