import Episode from "./Episode";

export default interface EpisodesResult {
  [x: string]: any;
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  episodes: Episode[];
}