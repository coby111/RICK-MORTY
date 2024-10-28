import { API_URL } from "@constants/api";
import EpisodesResult from "../../domain/entities/EpisodesResult";
import EpisodesRepository from "../../domain/repositories/EpisodesRepository";
import axios from 'axios';

export default class EpisodesDatasourceImp implements EpisodesRepository {
  async getEpisodes(page: number): Promise<EpisodesResult> {
      const response = await axios.get(`${API_URL}/episode/?page=${page}`);
      const { info, results } = response.data;

      return {
        info: {
          count: info.count,
          pages: info.pages,
          next: info.next,
          prev: info.prev,
        },
        episodes: results.map((episode: any) => ({
          id: episode.id,
          name: episode.name,
          air_date: episode.air_date,
          episode: episode.episode,
          characters: episode.characters,
          url: episode.url,
          created: episode.created,
        })),
      }
  }
}