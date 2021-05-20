import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Content from '../Content/Content';
import Api from '../../utils/api';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import AuthPopup from '../AuthPopup/AuthPopup';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitAuth = (userName, password) => {
    Api.login({ userName, password })
      .then((data) => {
        if (data.refresh && data.access) {
          Api.setAuthHeader(data.access);
          localStorage.setItem('jwtAccess', data.access);
          localStorage.setItem('jwtRefresh', data.refresh);
          setCurrentUser(userName);
          closeModal();
        }
      })
      .catch((err) => {
        console.log(`Error ошибка: ${err}`);
      });
  };

  useEffect(() => {
    // const jwt = localStorage.getItem('jwtAccess');
    // if (jwt) {
    //   Api.setAuthHeader(jwt);
    //   setCurrentUser(userName);
    // }

    Api.getMain()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(`Error: ошибка ${err}`);
      });
  }, []);

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header openModal={openModal} />
        <Content openModal={openModal} />
        <Footer />

        <AuthPopup
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          submitModal={handleSubmitAuth}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
