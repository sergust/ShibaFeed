import axios from 'axios';

const HTTP = axios.create({
  baseURL: 'http://localhost:5000/'
});

HTTP.defaults.headers.common['Authorization'] = localStorage.getItem('token')
  ? 'Bearer ' + localStorage.getItem('token')
  : '';
export default HTTP;
