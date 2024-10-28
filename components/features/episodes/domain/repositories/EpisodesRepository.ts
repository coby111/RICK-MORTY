import EpisodesResult from "../entities/EpisodesResult";

export default interface EpisodesRepository {
  getEpisodes(page: number): Promise<EpisodesResult>;
}