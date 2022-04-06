import axios from '@utils/axios';

const fetcher = (url: string) =>
  axios.get(url).then((response) => {
    console.log('swr fetcher');
    console.log(response?.data);
    return response.data;
  });

export default fetcher;
