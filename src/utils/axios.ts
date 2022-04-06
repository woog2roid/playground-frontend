import axios, { AxiosInstance } from 'axios';

const customAxios: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}`, // 기본 서버 주소 입력
  withCredentials: true,
});

export default customAxios;
