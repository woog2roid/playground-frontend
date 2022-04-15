import axios from '@utils/axios';
import Error from './errorTypes';

const fetcher = (url: string) =>
  axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      const error = new Error(err.response.status, 'An error occurred while fetching the data.');
      throw error;
    });

export default fetcher;
