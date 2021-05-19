import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';
import { eventsGet, eventPost, mainGet, loginPost, citiesGet } from './serverApiTestConfig';

const mock = new MockAdapter(axios, { delayResponse: 100 });

//  get main page
mock.onGet('/main/').reply(200, mainGet);

//  get cities
mock.onGet('/cities/').reply(200, citiesGet);

// get events
mock.onGet('/afisha/events/').reply(200, eventsGet);

// login
const postLogin = (config) => {
  console.log(config);
  return [200, loginPost];
};
mock.onPost('/token/').reply(postLogin);

// set event
const postEvent = (config) => {
  console.log(config);
  return [200, eventPost];
};
mock.onPost('/token/').reply(postEvent);
