import axios from 'axios';

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((response) => {
    console.log('swr fetcher');
    console.log(response?.data);
    return response.data;
  });

export default fetcher;
