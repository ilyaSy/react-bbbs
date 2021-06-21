import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Api from '../utils/api';

const JWT_KEY = 'jwt';

const useAuth = ({ setCurrentUser, setEvents, closeAllModal }) => {
  const history = useHistory();

  useEffect(() => {
    const jwt = localStorage.getItem(JWT_KEY);
    const jwtRefresh = localStorage.getItem(`${JWT_KEY}Refresh`);
    if (jwt && jwtRefresh) {
      Api.refreshUserInfo({ refresh: jwtRefresh })
        .then((data) => {
          if (data.access) {
            localStorage.setItem(JWT_KEY, data.access);
            Api.setAuthHeader(data.access);
            Promise.all([Api.getUserInfo(), Api.getEvents()]).then(([userData, eventsData]) => {
              // setCurrentUser({ username, ...userData });
              setCurrentUser(userData);
              setEvents(eventsData.results);
              // closeAllModal();
            });
          }
        })
        .catch(console.log);
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
          Promise.all([Api.getUserInfo(), Api.getEvents()]).then(([userData, eventsData]) => {
            setCurrentUser({ username, ...userData });
            setEvents(eventsData.results);
            closeAllModal();
          });
        }
      })
      .catch(console.log);
  }, []);

  return {
    logout,
    handleSubmitAuth,
  };
};
export default useAuth;
