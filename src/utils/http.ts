import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {BASE_URL} from './config';

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
});

export {http};
