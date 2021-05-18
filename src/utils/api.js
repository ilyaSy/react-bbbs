import {apiURL} from '../config/config';

export class Api{
  constructor(){
    // this._apiURL = `${apiURL}/${groupId}`;
    this._headers = { 
      // authorization: tokenAuth,
      'Content-Type': 'application/json'
    };
  }

  login(userData){
    return fetch(`${apiURL}/token/`, {method: 'POST', headers: this._headers, body: JSON.stringify(userData)})
      .then(this._handleApiResult.bind(null, 'getCities'))
  }

  getCities(){
    return fetch(`${apiURL}/cities/`, {headers: this._headers})
      .then(this._handleApiResult.bind(null, 'getCities'))
  }

  getMain(){
    return fetch(`${apiURL}/main/`, {headers: this._headers})
      .then(this._handleApiResult.bind(null, 'getMain'))
  }

  getEvents(){
    return fetch(`${apiURL}/afisha/events/`, {headers: this._headers})
      .then(this._handleApiResult.bind(null, 'getEvents'))
  }

  setEvent(eventData){
    return fetch(`${apiURL}/afisha/event-participants`, {method: 'POST', headers: this._headers, body: JSON.stringify(eventData)})
      .then(this._handleApiResult.bind(null, 'addCard'))
  }

  _handleApiResult(fnName, res){
    if (res.ok) {
      // return res.json();
    }
    else {
      throw Error(`Ошибка получения результата в ${fnName}: ${res.status} ${res.statusText}`);
    }
    // Promise.reject(`Ошибка получения результата в ${fnName}: ${res.status} ${res.statusText}`);
  }
}

const api = new Api();

export default api;