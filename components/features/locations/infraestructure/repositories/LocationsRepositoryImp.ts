import LocationsResult from "../../domain/entities/LocationReult";
import LocationsDatasourceImp from "../datasources/LocationsDatasourceImp";

export default class LocationsRepositoryImp {
  private datasource: LocationsDatasourceImp;

  constructor(datasource: LocationsDatasourceImp) {
    this.datasource = datasource;
  }

  async getLocations(page: number): Promise<LocationsResult> {
    return this.datasource.getLocations(page);
  }
}
