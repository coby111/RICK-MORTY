import Character from "./Character";

export default interface CharactersResult {
  page: any;
  count: any;
  totalPages: any;
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  characters: Character[];
}
