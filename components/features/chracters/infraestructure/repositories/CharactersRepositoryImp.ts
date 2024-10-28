import CharactersDatasourceImp from './../datasources/CharactersDataSourceImp';
import CharactersResult from './../../domain/entities/ChraceterResult';
export default class charactersRepositoryImp {
  private datasource: CharactersDatasourceImp;

  constructor(datasource: CharactersDatasourceImp) {
    this.datasource = datasource;
  }

  async getCharacters(page: number): Promise<CharactersResult> {
    return this.datasource.getCharacters(page);
  }
}