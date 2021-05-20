import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Content from '../Content/Content';
import api from '../../utils/api';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import AuthPopup from '../AuthPopup/AuthPopup';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  if (false) {
    setCurrentUser(null);
  }
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    api
      .getMain()
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

        <AuthPopup modalIsOpen={modalIsOpen} closeModal={closeModal} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
