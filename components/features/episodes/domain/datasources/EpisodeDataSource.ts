import axios from 'axios';
import EpisodesResult from "../entities/EpisodesResult";
import { API_URL } from '@constants/api';

export const fetchEpisodes = async (page: number = 1): Promise<EpisodesResult> => {
  try {
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
    };
  } catch (error) {
    console.error('Error fetching locations', error);
    return {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      episodes: [],
    }
  }
}