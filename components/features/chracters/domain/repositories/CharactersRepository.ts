import CharactersResult from "../entities/ChraceterResult";

export default interface CharacterRepository {
  getCharacters(page: number): Promise<CharactersResult>
}