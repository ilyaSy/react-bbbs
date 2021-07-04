import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Api from '../utils/api';

const JWT_KEY = 'jwt';

const useAuth = ({ setCurrentUser, setEvents, closeAllModal, openAuthModal }) => {
  const history = useHistory();

  const refreshJWT = useCallback((showAuthPopup = false) => {
    const jwt = localStorage.getItem(JWT_KEY);
    const jwtRefresh = localStorage.getItem(`${JWT_KEY}Refresh`);
    if (jwt && jwtRefresh) {
      Api.refreshUserInfo({ refresh: jwtRefresh })
        .then((data) => {
          if (data.access) {
            localStorage.setItem(JWT_KEY, data.access);
            Api.setAuthHeader(data.access);
            Promise.all([Api.getUserInfo(), Api.getCities(), Api.getEvents()]).then(
              ([userData, citiesData, eventsData]) => {
                citiesData.forEach((city) => {
                  if (city.id === userData.city)
                    setCurrentUser({
                      cityName: city.name,
                      user: userData.user,
                      city: userData.city,
                    });
                });
                setEvents(eventsData.results);
              }
            );
          } else {
            history.push('/');
            if (showAuthPopup) openAuthModal();
          }
        })
        .catch(console.log);
    } else {
      history.push('/');
      if (showAuthPopup) openAuthModal();
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(JWT_KEY);
    Api.removeAuthHeader();
    history.push('/');
  }, []);

  const handleSubmitAuth = useCallback((username, password) => {
    Api.login({ username, password })
      .then((data) => {
        if (data.refresh && data.access) {
          Api.setAuthHeader(data.access);
          localStorage.setItem(JWT_KEY, data.access);
          localStorage.setItem(`${JWT_KEY}Refresh`, data.refresh);
          Promise.all([Api.getUserInfo(), Api.getCities(), Api.getEvents()]).then(
            ([userData, citiesData, eventsData]) => {
              citiesData.forEach((city) => {
                if (city.id === userData.city)
                  setCurrentUser({
                    cityName: city.name,
                    user: userData.user,
                    city: userData.city,
                  });
              });
              setEvents(eventsData.results);
              closeAllModal();
              history.goBack();
            }
          );
        }
      })
      .catch(console.log);
  }, []);

  return {
    refreshJWT,
    logout,
    handleSubmitAuth,
  };
};
export default useAuth;
