import axios from "axios";
import LocationsRepository from "../../domain/repositories/LocationsRepository";
import { API_URL } from "../../../../../constants/api";
import LocationsResult from "../../domain/entities/LocationReult";


export default class LocationsDatasourceImp implements LocationsRepository {
  async getLocations(page: number): Promise<LocationsResult> {
    const response = await axios.get(`${API_URL}/location/?page=${page}`);
    const { info, results } = response.data;

    return {
      info: {
        count: info.count,
        pages: info.pages,
        next: info.next,
        prev: info.prev,
      },
      locations: results.map((location: any) => ({
        id: location.id,
        name: location.name,
        type: location.type,
        dimension: location.dimension,
        residents: location.residents,
        url: location.url,
        created: location.created,
      })),
    };
  }
}