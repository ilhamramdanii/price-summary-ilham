import axios from 'axios';
import { API_BASE_URL } from '../constants/config';

const REQUEST_TIMEOUT_MS = 10_000;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
});

export default apiClient;
