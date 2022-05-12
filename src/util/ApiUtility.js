import axios from 'axios';

const API_URL = 'http://localhost:8000';

export default class ApiUtility {
  static async solveQuestion(number) {
    try {
      const endpoint = `${API_URL}/question${number}`;
      const { data } = await axios.get(endpoint);

      return data;
    } catch (error) {
      console.log('Error: ', error);
      return error;
    }
  }
}