import axios from 'axios';
import { API_URL } from '../../../../../constants/api';


export const fetchCharacters = async (page: number = 1) => {
  try {
    const response = await axios.get(`${API_URL}/character/?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching characters', error);
    return [];
  }
}
