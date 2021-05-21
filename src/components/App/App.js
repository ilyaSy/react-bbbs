import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Content from '../Content/Content';
import Api from '../../utils/api';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import AuthPopup from '../AuthPopup/AuthPopup';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [mainData, setMainData] = useState(null);
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);

  const history = useHistory();

  const openAuthModal = () => {
    setIsAuthModalOpened(true);
  };
  const closeAuthModal = () => {
    setIsAuthModalOpened(false);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('jwt');
    Api.removeAuthHeader();
    // localStorage.removeItem('jwtRefresh');
    history.push('/');
  };

  const handleSubmitAuth = (userName, password) => {
    Api.login({ userName, password })
      .then((data) => {
        if (data.refresh && data.access) {
          Api.setAuthHeader(data.access);
          localStorage.setItem('jwt', data.access);
          // localStorage.setItem('jwtRefresh', data.refresh);
          setCurrentUser(userName);
          closeAuthModal();
        }
      })
      .catch((err) => {
        console.log(`Error ошибка: ${err}`);
      });
  };

  useEffect(() => {
    // const jwt = localStorage.getItem('jwt');
    // if (jwt) {
    //   Api.setAuthHeader(jwt);
    //   setCurrentUser(userName);
    // }

    Api.getMain()
      .then((data) => {
        setMainData(data);
      })
      .catch((err) => {
        console.log(`Error: ошибка ${err}`);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header openAuthModal={openAuthModal} />
      <Content mainData={mainData} openAuthModal={openAuthModal} onLogout={logout} />
      <Footer />

      <AuthPopup
        isAuthModalOpened={isAuthModalOpened}
        closeAuthModal={closeAuthModal}
        submitModal={handleSubmitAuth}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
