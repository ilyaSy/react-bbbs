import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Api from '../utils/api';

const useAuth = ({ setCurrentUser, setEvents, closeAllModal }) => {
  const JWT_KEY = 'jwt';
  const history = useHistory();

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(JWT_KEY);
    Api.removeAuthHeader();
    history.push('/');
  }, [setCurrentUser, Api, history]);

  const handleSubmitAuth = useCallback(
    (userName, password) => {
      Api.login({ userName, password })
        .then((data) => {
          if (data.refresh && data.access) {
            Api.setAuthHeader(data.access);
            localStorage.setItem(JWT_KEY, data.access);
            Promise.all([Api.getUserInfo(), Api.getEvents()]).then(([userData, eventsData]) => {
              setCurrentUser({ userName, ...userData });
              setEvents(eventsData);
              closeAllModal();
            });
          }
        })
        .catch(console.log);
    },
    [Api, setCurrentUser, setEvents, closeAllModal]
  );
  return {
    logout,
    handleSubmitAuth,
  };
};
export default useAuth;
