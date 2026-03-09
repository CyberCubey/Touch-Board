declare module "react-leaflet-cluster" {
  import * as React from "react";
  import { DivIcon } from "leaflet";

  type ClusterProps = {
    children?: React.ReactNode;
    chunkedLoading?: boolean;
    iconCreateFunction?: (cluster: any) => DivIcon;
    [key: string]: any;
  };

  const ClusterGroup: React.ComponentType<ClusterProps>;
  export default ClusterGroup;
}
