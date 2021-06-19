import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Api from '../utils/api';

const JWT_KEY = 'jwt';

const useAuth = ({ setCurrentUser, setEvents, closeAllModal }) => {
  const history = useHistory();

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
          Promise.all([Api.getUserInfo(), Api.getEvents()]).then(([userData, eventsData]) => {
            setCurrentUser({ username, ...userData });
            setEvents(eventsData);
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
