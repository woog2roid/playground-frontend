import axios from '@utils/axios';
import Error from '@typings/errorTypes';

const fetcher = (url: string) =>
  axios
    .get(url)
    .then((response) => {
      console.log('swr fetcher', url, response.data);
      return response.data;
    })
    .catch((err) => {
      const error = new Error(err.response.status, 'An error occurred while fetching the data.');
      throw error;
    });

export default fetcher;
