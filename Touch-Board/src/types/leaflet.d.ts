declare module "leaflet" {
  export type LatLngExpression = any;
  export type PointExpression = any;

  export class Icon {
    constructor(options?: any);
  }

  export function divIcon(options?: any): any;
  export function point(x?: number, y?: number, round?: boolean): any;

  export type DivIcon = any;

  export default {} as any;
}
