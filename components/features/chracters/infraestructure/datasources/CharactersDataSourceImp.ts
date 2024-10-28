import axios from "axios";
import CharactersResult from "../../domain/entities/ChraceterResult";
import { API_URL } from "../../../../../constants/api";
import CharacterRepository from "../../domain/repositories/CharactersRepository";

export default class CharactersDatasourceImp implements CharacterRepository {
  async getCharacters(page: number): Promise<CharactersResult> {
    const response = await axios.get(`${API_URL}/character/?page=${page}`);
    const { info, results } = response.data;

  return {
    page,
    count: info.count,
    totalPages: info.pages,
    info: {
      count: info.count,
      pages: info.pages,
      next: info.next,
      prev: info.prev,
    },
    characters: results.map((character: any) => ({
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      type: character.type,
      gender: character.gender,
      origin: character.origin,
      location: character.location,
      image: character.image,
      episode: character.episode,
      url: character.url,
      created: character.created,
    })),
  };
}
}