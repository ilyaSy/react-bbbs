import axios from 'axios';
import { apiURL, TEST_MODE } from '../config/config';
// import setMockAdapter from './serverApi';

// if (TEST_MODE) {
//   setMockAdapter();
// }

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';

export default class Api {
  static setAuthHeader(authHeader) {
    axios.defaults.headers.common.Authorization = `Bearer ${authHeader}`;
  }

  static removeAuthHeader() {
    axios.defaults.headers.common.Authorization = '';
  }

  static login(userData) {
    return axios.post(`${apiURL}/token/`, userData).then(Api._handleApiResult.bind(null, 'login'));
  }

  static refreshUserInfo(jwtRefresh) {
    return axios
      .post(`${apiURL}/token/refresh/`, jwtRefresh)
      .then(Api._handleApiResult.bind(null, 'refreshUserInfo'));
  }

  static getUserInfo() {
    return axios.get(`${apiURL}/profile/`).then(Api._handleApiResult.bind(null, 'getUserInfo'));
  }

  static updateUserInfo(userData) {
    return axios
      .patch(`${apiURL}/profile/`, userData)
      .then(Api._handleApiResult.bind(null, 'updateUserInfo'));
  }

  static getProfileStory() {
    return axios
      .get(`${apiURL}/profile-stories/`)
      .then(Api._handleApiResult.bind(null, 'getProfileStory'));
  }

  static postProfileStory(storyData) {
    return axios
      .post(`${apiURL}/profile-stories/`, storyData)
      .then(Api._handleApiResult.bind(null, 'postProfileStory'));
  }

  static postQuestion(data) {
    return axios.post(`${apiURL}/question/`, data);
  }

  static postPlace(data) {
    return axios.post(`${apiURL}/place/`, data);
  }

  static deleteProfileStory(storyData) {
    return axios
      .delete(`${apiURL}/profile-stories/`, storyData)
      .then(Api._handleApiResult.bind(null, 'deleteProfileStory'));
  }

  static updateProfileStory(storyData) {
    return axios
      .patch(`${apiURL}/profile-stories/`, storyData)
      .then(Api._handleApiResult.bind(null, 'updateProfileStory'));
  }

  static getCities() {
    return axios.get(`${apiURL}/cities/`).then(Api._handleApiResult.bind(null, 'getCities'));
  }

  static getMain() {
    return axios.get(`${apiURL}/main/`).then(Api._handleApiResult.bind(null, 'getMain'));
  }

  static getPlaces() {
    return axios.get(`${apiURL}/places/`).then(Api._handleApiResult.bind(null, 'getPlaces'));
  }

  static getQuestions() {
    return axios.get(`${apiURL}/questions/`).then(Api._handleApiResult.bind(null, 'getQuestions'));
  }

  static getQuestionsTags() {
    return axios
      .get(`${apiURL}/questions/tags/`)
      .then(Api._handleApiResult.bind(null, 'getQuestionsTags'));
  }

  static getMaterials() {
    return axios.get(`${apiURL}/materials/`).then(Api._handleApiResult.bind(null, 'getMaterials'));
  }

  static getVideos() {
    return axios.get(`${apiURL}/videos/`).then(Api._handleApiResult.bind(null, 'getVideos'));
  }

  static getArticles() {
    return axios.get(`${apiURL}/articles/`).then(Api._handleApiResult.bind(null, 'getArticles'));
  }

  static getMovies() {
    return axios.get(`${apiURL}/movies/`).then(Api._handleApiResult.bind(null, 'getMovies'));
  }

  static getBooks() {
    return axios.get(`${apiURL}/books/`).then(Api._handleApiResult.bind(null, 'getBooks'));
  }

  static getRights() {
    return axios.get(`${apiURL}/rights/`).then(Api._handleApiResult.bind(null, 'getRights'));
  }

  static getEvents() {
    return axios.get(`${apiURL}/afisha/events/`).then(Api._handleApiResult.bind(null, 'getEvents'));
  }

  static setEvent(eventData) {
    return axios
      .post(`${apiURL}/afisha/event-participants/`, eventData)
      .then(Api._handleApiResult.bind(null, 'setEvent'));
  }

  static deleteEvent(eventData) {
    return axios
      .delete(`${apiURL}/afisha/event-participants/`, { data: { ...eventData } })
      .then(Api._handleApiResult.bind(null, 'deleteEvent'));
  }

  static updateEvent(eventData) {
    return axios
      .patch(`${apiURL}/afisha/event-participants/`, eventData)
      .then(Api._handleApiResult.bind(null, 'updateEvent'));
  }

  static _handleApiResult(fnName, res) {
    if (TEST_MODE) {
      return res.data;
    }

    // console.log(res);

    return ['OK', 'Created', 'No Content'].includes(res.statusText)
      ? res.data
      : Error(`Ошибка получения результата в ${fnName}: ${res.status} ${res.statusText}`);
  }
}
