import axios from 'axios';

const token = localStorage.getItem('apiToken');
const capstoneApi = axios.create({
  baseURL: 'https://test.neuraac.com/api',
  headers: {
    Authorization: `Bearer ${token}`
  }
});
export default capstoneApi;
