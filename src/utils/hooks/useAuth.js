import { useCallback } from 'react';

const useAuth = ({ setCurrentUser, setEvents, localStorage, Api, history, closeAllModal }) => {
  const JWT_KEY = 'jwt';

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(JWT_KEY);
    Api.removeAuthHeader();
    history.push('/');
  }, [setCurrentUser, localStorage, Api, history]);

  const handleSubmitAuth = useCallback(
    (userName, password) => {
      Api.login({ userName, password })
        .then((data) => {
          if (data.refresh && data.access) {
            Api.setAuthHeader(data.access);
            localStorage.setItem('jwt', data.access);
            Promise.all([Api.getUserInfo(), Api.getEvents()]).then(([userData, eventsData]) => {
              setCurrentUser({ userName, ...userData });
              setEvents(eventsData);
              closeAllModal();
            });
          }
        })
        .catch(console.log);
    },
    [Api, localStorage, setCurrentUser, setEvents, closeAllModal]
  );
  return {
    logout,
    handleSubmitAuth,
  };
};
export default useAuth;
