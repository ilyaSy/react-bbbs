import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';
import { apiURL } from '../config/config';
import { eventsGet, eventPost, mainGet, loginPost, citiesGet } from './serverApiTestConfig';

const mock = new MockAdapter(axios, { delayResponse: 100 });

export default function setMockAdapter() {
  // login
  const postLogin = (config) => {
    console.log(config);
    return [200, loginPost];
  };
  mock.onPost(`${apiURL}/token/`).reply(postLogin);

  //  get main page
  mock.onGet(`${apiURL}/main/`).reply(200, mainGet);

  //  get cities
  mock.onGet(`${apiURL}/cities/`).reply(200, citiesGet);

  // get events
  mock.onGet(`${apiURL}/afisha/events/`).reply(200, eventsGet);

  // set event
  const postEvent = (config) => {
    console.log(config);
    return [200, eventPost];
  };
  mock.onPost(`${apiURL}/afisha/event-participants/`).reply(postEvent);
}
