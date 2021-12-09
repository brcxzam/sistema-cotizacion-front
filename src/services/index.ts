import Axios from 'axios-observable';

const instance = Axios.create({
  timeout: 1000 * 60 * 1,
});

export default instance;
