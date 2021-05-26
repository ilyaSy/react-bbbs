import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import PopupPlaces from '../PopupPlaces/PopupPlaces';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [mainData, setMainData] = useState(null);
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);
  const [isConfirmRegisterModalOpened, setIsConfirmRegisterOpened] = useState(false);
  const [isRegisterSuccessModalOpened, setIsRegisterSuccessModalOpened] = useState(false);
  const [isPlacePopupOpened, setIsPlacePopupOpened] = useState(false);
  const [selectedCalendarCard, setSelectedCalendarCard] = useState(null);
  const [selectedConfirmCalendarCard, setSelectedConfirmCalendarCard] = useState(null);
  const history = useHistory();

  const openAuthModal = () => {
    setIsAuthModalOpened(true);
  };

  const closeAllModal = () => {
    setIsAuthModalOpened(false);
    setIsConfirmRegisterOpened(false);
    setIsRegisterSuccessModalOpened(false);
    setIsPlacePopupOpened(false);
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

          Api.getUserInfo().then((userData) => {
            setCurrentUser({ userName, ...userData });
            closeAllModal();
          });
        }
      })
      .catch((err) => {
        console.log(`Error ошибка: ${err}`);
      });
  };

  const handleCalendarCardClick = (calendarCard) => {
    setSelectedCalendarCard(calendarCard);
  };

  const handleRegisterSubmit = (calendarCard) => {
    setSelectedConfirmCalendarCard(calendarCard);
    setIsConfirmRegisterOpened(true);
  };

  const handleConfirmRegisterSubmit = (calendarCard) => {
    Api.setEvent({ id: calendarCard.id })
      .then((data) => {
        console.log(data);
        setIsRegisterSuccessModalOpened(true);
      })
      .catch((err) => {
        console.log(`Error ошибка: ${err}`);
      });
  };

  const handleDeleteEvent = (calendarCard) => {
    Api.deleteEvent({ id: calendarCard.id })
      .then((data) => {
        console.log(data);
        //  setIsRegisterSuccessModalOpened(true);
        alert('Удаление события успешно');
        closeAllModal();
      })
      .catch((err) => {
        console.log(`Error ошибка: ${err}`);
      });
  };

  const handleRecommentdPlace = () => {
    setIsPlacePopupOpened(true);
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
      <ScrollToTop />
      <Header openAuthModal={openAuthModal} />
      <Content
        mainData={mainData}
        openAuthModal={openAuthModal}
        onLogout={logout}
        handleCalendarCardClick={handleCalendarCardClick}
        handleRegisterSubmit={handleRegisterSubmit}
        handleDeleteEvent={handleDeleteEvent}
        onRecommendPlace={handleRecommentdPlace}
      />
      <Footer />

      <AuthPopup
        isAuthModalOpened={isAuthModalOpened}
        closeAuthModal={closeAllModal}
        submitModal={handleSubmitAuth}
      />
      <PopupMeet
        closeModal={closeAllModal}
        selectedCalendarCard={selectedCalendarCard}
        handleRegisterSubmit={handleConfirmRegisterSubmit}
        handleDeleteEvent={handleDeleteEvent}
      />
      <PopupConfirmRegister
        closeModal={closeAllModal}
        isOpen={isConfirmRegisterModalOpened}
        selectedConfirmCalendarCard={selectedConfirmCalendarCard}
        handleConfirmRegisterSubmit={handleConfirmRegisterSubmit}
      />
      <PopupPlaces isOpen={isPlacePopupOpened} onClose={closeAllModal} />
      <PopupRegisterSuccess closeModal={closeAllModal} isOpen={isRegisterSuccessModalOpened} />
    </CurrentUserContext.Provider>
  );
}

export default App;
