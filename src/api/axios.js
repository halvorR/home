import axios from 'axios';


let instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 30000
});

export default instance;
