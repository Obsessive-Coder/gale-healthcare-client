import axios from 'axios';

const API_URL = 'https://gale-healthcare-backend.herokuapp.com';

export default class ApiUtility {
  static async solveQuestion(number) {
    try {
      const endpoint = `${API_URL}/question${number}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });

      return data;
    } catch (error) {
      console.log('Error: ', error);
      return error;
    }
  }
}