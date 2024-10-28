import LocationsResult from './../entities/LocationReult';

export default interface LocationsRepository {
  getLocations(page: number): Promise<LocationsResult>;
}