import axios from '@utils/axios';

const fetcher = (url: string) =>
  axios.get(url).then((response) => {
    console.log(response?.data);
    return response.data;
  });

export default fetcher;
