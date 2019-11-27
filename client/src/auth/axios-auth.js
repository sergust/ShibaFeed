import axios from 'axios';
import localStorage from 'reactive-localstorage';

const HTTP = axios.create({
  baseURL: 'http://localhost:5000/'
});

localStorage.on('change', () => {
  HTTP.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('token');
});

export default HTTP;
