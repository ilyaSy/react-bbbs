import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';
import { apiURL } from '../config/config';
import {
  eventsGet,
  eventPost,
  mainGet,
  loginPost,
  citiesGet,
  placesGet,
  userGet,
  profileStory,
  questionsGet,
} from './serverApiTestConfig';

const mock = new MockAdapter(axios, { delayResponse: 100 });

export default function setMockAdapter() {
  // login
  const postLogin = (config) => {
    const userData = JSON.parse(config.data);
    console.log(userData.userName, userData.password);
    return [200, loginPost];
  };
  mock.onPost(`${apiURL}/token/`).reply(postLogin);

  mock.onGet(`${apiURL}/profile/`).reply(200, userGet);

  mock.onPatch(`${apiURL}/profile/`).reply(200, userGet);

  //  profile stories
  mock.onGet(`${apiURL}/profile-stories/`).reply(200, profileStory);

  const updateProfileStory = (config) => {
    const storyData = JSON.parse(config.data);
    return [200, storyData];
  };

  mock.onPatch(`${apiURL}/profile-stories/`).reply(updateProfileStory);

  const postProfileStory = (config) => {
    const storyData = JSON.parse(config.data);
    storyData.id = Math.floor(Math.random() * 100 + 1);
    storyData.image = 'https://vse-sekrety.ru/uploads/posts/2015-12/1450044662_1.jpg';
    return [200, storyData];
  };

  mock.onPost(`${apiURL}/profile-stories/`).reply(postProfileStory);

  mock.onDelete(`${apiURL}/profile-stories/`).reply(200, profileStory);

  //  get main page
  mock.onGet(`${apiURL}/main/`).reply(200, mainGet);

  //  get cities
  mock.onGet(`${apiURL}/cities/`).reply(200, citiesGet);

  //  get places
  mock.onGet(`${apiURL}/where-to-go/`).reply(200, placesGet);

  //  get questions
  mock.onGet(`${apiURL}/questions/`).reply(200, questionsGet);

  // get events
  mock.onGet(`${apiURL}/afisha/events/`).reply(200, eventsGet);

  // set event
  const postEvent = () => [200, eventPost];

  // unset event
  const deleteEvent = () => [200, eventPost];

  // unset event
  const updateEvent = () => [200, eventPost];

  mock.onPost(`${apiURL}/afisha/event-participants/`).reply(postEvent);

  mock.onDelete(`${apiURL}/afisha/event-participants/`).reply(deleteEvent);

  mock.onPatch(`${apiURL}/afisha/event-participants/`).reply(updateEvent);
}
