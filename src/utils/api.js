import axios from 'axios';
import { apiURL, TEST_MODE } from '../config/config';
import setMockAdapter from './serverApi';

if (TEST_MODE) {
  setMockAdapter();
}

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export class Api {
  constructor() {
    this._headers = {
      // authorization: tokenAuth,
    };
  }

  login(userData) {
    return axios.post(`${apiURL}/token/`, userData).then(this._handleApiResult.bind(null, 'login'));
  }

  getCities() {
    return axios.get(`${apiURL}/cities/`).then(this._handleApiResult.bind(null, 'getCities'));
  }

  getMain() {
    return axios.get(`${apiURL}/main/`).then(this._handleApiResult.bind(null, 'getMain'));
  }

  getEvents() {
    return axios
      .get(`${apiURL}/afisha/events/`)
      .then(this._handleApiResult.bind(null, 'getEvents'));
  }

  setEvent(eventData) {
    return axios
      .post(`${apiURL}/afisha/event-participants`, eventData)
      .then(this._handleApiResult.bind(null, 'setEvent'));
  }

  // eslint-disable-next-line class-methods-use-this
  _handleApiResult(fnName, res) {
    if (TEST_MODE) {
      return res.data;
      // eslint-disable-next-line no-else-return
    } else if (res.ok) {
      return res.json();
    } else {
      throw Error(`Ошибка получения результата в ${fnName}: ${res.status} ${res.statusText}`);
    }
    //  Promise.reject(`Ошибка получения результата в ${fnName}: ${res.status} ${res.statusText}`);
  }
}

const api = new Api();
export default api;
