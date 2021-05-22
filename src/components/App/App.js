import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Content from '../Content/Content';
import Api from '../../utils/api';
import './App.css';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import AuthPopup from '../AuthPopup/AuthPopup';
import PopupMeet from '../PopupMeet/PopupMeet';
import PopupConfirmRegister from '../PopupConfirmRegister/PopupConfirmRegister';
import PopupRegisterSuccess from '../PopupRegisterSuccess/PopupRegisterSuccess';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [currentUser, setCurrentUser] = useState(null);
  const [mainData, setMainData] = useState(null);
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);
  const [isConfirmRegisterModalOpened, setIsConfirmRegisterOpened] = useState(false);
  const [isRegisterSuccessModalOpened, setIsRegisterSuccessModalOpened] = useState(false);
  const [selectedCalendarCard, setSelectedCalendarCard] = useState({});
  const history = useHistory();

  const openAuthModal = () => {
    setIsAuthModalOpened(true);
  };
  const closeAllModal = () => {
    setIsAuthModalOpened(false);
    setIsConfirmRegisterOpened(false);
    setIsRegisterSuccessModalOpened(false);
    setSelectedCalendarCard({
      isOpen: false,
    });
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
          closeAllModal();
        }
      })
      .catch((err) => {
        console.log(`Error ошибка: ${err}`);
      });
  };
  const handleCalendarCardClick = (calendarCard) => {
    setSelectedCalendarCard(calendarCard);
  };
  const handlerRegisterSubmit = () => {
    setIsConfirmRegisterOpened(true);
  };
  const handlerConfirmRegisterSubmit = () => {
    setIsRegisterSuccessModalOpened(true);
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
      <Content
        mainData={mainData}
        openAuthModal={openAuthModal}
        onLogout={logout}
        handleCalendarCardClick={handleCalendarCardClick}
        handlerRegisterSubmit={handlerRegisterSubmit}
      />
      <Footer />

      <AuthPopup
        isAuthModalOpened={isAuthModalOpened}
        closeAuthModal={closeAllModal}
        submitModal={handleSubmitAuth}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
      />
      <PopupMeet
        closeModal={closeAllModal}
        selectedCalendarCard={selectedCalendarCard}
        handlerRegisterSubmit={handlerConfirmRegisterSubmit}
      />
      <PopupConfirmRegister
        closeModal={closeAllModal}
        isOpen={isConfirmRegisterModalOpened}
        handlerConfirmRegisterSubmit={handlerConfirmRegisterSubmit}
      />
      <PopupRegisterSuccess closeModal={closeAllModal} isOpen={isRegisterSuccessModalOpened} />
    </CurrentUserContext.Provider>
  );
}

export default App;
