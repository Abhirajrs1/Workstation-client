import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export default axiosInstance;