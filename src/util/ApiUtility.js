import axios from 'axios';

const API_URL = 'http://localhost:8000';

export default class ApiUtility {
  async solveQuestion1() {
    try {
      const endpoint = `${API_URL}/question1`;
      const { data } = await axios.get(endpoint);

      return data;
    } catch (error) {
      console.log('Error: ', error);
      return error;
    }
  }
}