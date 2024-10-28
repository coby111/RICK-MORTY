
import EpisodesResult from '../../domain/entities/EpisodesResult';
import EpisodesDatasourceImp from '../datasources/EpisodesDatasourceImp';

export default class EpisodesRepositoryImp {
  private datasource: EpisodesDatasourceImp;

  constructor(datasource: EpisodesDatasourceImp) {
    this.datasource = datasource;
  }

  async getEpisodes(page: number): Promise<EpisodesResult> {
    return this.datasource.getEpisodes(page);
  }
}