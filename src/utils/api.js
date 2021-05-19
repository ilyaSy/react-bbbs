import axios from 'axios';
import { apiURL } from '../config/config';

axios.defaults.headers.common['Content-Type'] = 'application/json';

export class Api {
  constructor() {
    // this._apiURL = `${apiURL}/${groupId}`;
    this._headers = {
      // authorization: tokenAuth,
      // 'Content-Type': 'application/json',
    };
  }

  login(userData) {
    return axios
      .post(`${apiURL}/token/`, userData)
      .then(this._handleApiResult.bind(null, 'getCities'));
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
      .then(this._handleApiResult.bind(null, 'addCard'));
  }

  // eslint-disable-next-line class-methods-use-this
  _handleApiResult(fnName, res) {
    if (res.ok) {
      // return res.json();
    } else {
      throw Error(`Ошибка получения результата в ${fnName}: ${res.status} ${res.statusText}`);
    }
    // Promise.reject(`Ошибка получения результата в ${fnName}: ${res.status} ${res.statusText}`);
  }
}

const api = new Api();
export default api;
