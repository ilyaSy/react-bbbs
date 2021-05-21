import axios from 'axios';
import { apiURL, TEST_MODE } from '../config/config';
import setMockAdapter from './serverApi';

if (TEST_MODE) {
  setMockAdapter();
}

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default class Api {
  static setAuthHeader(authHeader) {
    axios.defaults.headers.get.Authorization = `Bearer ${authHeader}`;
    axios.defaults.headers.post.Authorization = `Bearer ${authHeader}`;
  }

  static login(userData) {
    return axios.post(`${apiURL}/token/`, userData).then(Api._handleApiResult.bind(null, 'login'));
  }

  static getCities() {
    return axios.get(`${apiURL}/cities/`).then(Api._handleApiResult.bind(null, 'getCities'));
  }

  static getMain() {
    return axios.get(`${apiURL}/main/`).then(Api._handleApiResult.bind(null, 'getMain'));
  }

  static getEvents() {
    return axios.get(`${apiURL}/afisha/events/`).then(Api._handleApiResult.bind(null, 'getEvents'));
  }

  static setEvent(eventData) {
    return axios
      .post(`${apiURL}/afisha/event-participants`, eventData)
      .then(Api._handleApiResult.bind(null, 'setEvent'));
  }

  static _handleApiResult(fnName, res) {
    if (TEST_MODE) {
      return res.data;
    }

    return res.ok
      ? res.json()
      : Error(`Ошибка получения результата в ${fnName}: ${res.status} ${res.statusText}`);
  }
  // throw Error(`Ошибка получения результата в ${fnName}: ${res.status} ${res.statusText}`);
  //  Promise.reject(`Ошибка получения результата в ${fnName}: ${res.status} ${res.statusText}`);
}
