import Location from "./Location";

export default interface LocationsResult {
  [x: string]: any;
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  }
  locations: Location[];
}