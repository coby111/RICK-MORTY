import axios from "axios";
import { API_URL } from "../../../../../constants/api";
import LocationsResult from "../entities/LocationReult";

export const fetchLocations = async (page: number = 1):  Promise<LocationsResult> => {

  try {
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
    }
  } catch (error) {
    console.error("Error fetching locations", error);
    return {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      locations: [],
    };
  }
};