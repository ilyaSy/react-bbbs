import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Content from '../Content/Content';
import Api from '../../utils/api';
import './App.css';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import AuthPopup from '../Modals/AuthPopup/AuthPopup';
import PopupMeet from '../Modals/PopupMeet/PopupMeet';
import PopupConfirmRegister from '../Modals/PopupConfirmRegister/PopupConfirmRegister';
import PopupRegisterSuccess from '../Modals/PopupRegisterSuccess/PopupRegisterSuccess';
import ScrollToTop from '../UI/ScrollToTop/ScrollToTop';
import PopupCities from '../Modals/PopupCities/PopupCities';
import YoutubeEmbed from '../Modals/YoutubeEmbed/YoutubeEmbed';
import useAuth from '../../hooks/useAuth';
import PopupError from '../Modals/PopupError/PopupError';

function App() {
  const [events, setEvents] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [unauthСity, setUnauthСity] = useState('');
  const [mainData, setMainData] = useState(null);
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);
  const [isConfirmRegisterModalOpened, setIsConfirmRegisterOpened] = useState(false);
  const [isRegisterSuccessModalOpened, setIsRegisterSuccessModalOpened] = useState(false);
  const [isPopupCitiesOpen, setIsPopupCitiesOpen] = useState(false);
  const [isPlacePopupOpened, setIsPlacePopupOpened] = useState(false);
  const [isPopupVideoOpen, setIsPopupVideoOpen] = useState({ isOpened: false });
  const [isRegisterErrorModalOpened, setRegisterErrorModalOpened] = useState(false);
  const [selectedCalendarCard, setSelectedCalendarCard] = useState(null);
  const [selectedConfirmCalendarCard, setSelectedConfirmCalendarCard] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    Promise.all([Api.getCities(), Api.getMain()])
      .then(([dataCities, dataMain]) => {
        setCities(dataCities);
        setMainData(dataMain);
      })
      .catch(console.log);
  }, []);

  const updateCity = (city) => {
    if (currentUser) {
      Api.updateUserInfo({
        city,
        id: currentUser.id,
        user: currentUser.user,
      })
        .then(setCurrentUser)
        .catch(console.log);
    } else {
      setUnauthСity(city);
    }
  };
  // Выбираем город пользователя !

  const openAuthModal = () => setIsAuthModalOpened(true);

  const closeAllModal = () => {
    setIsAuthModalOpened(false);
    setIsConfirmRegisterOpened(false);
    setIsRegisterSuccessModalOpened(false);
    setIsPlacePopupOpened(false);
    setSelectedCalendarCard(null);
    setIsPopupCitiesOpen(false);
    setIsPopupVideoOpen({ isOpened: false });
    setRegisterErrorModalOpened(false);
  };
  // кастомный Хук авторизации
  const { logout, handleSubmitAuth } = useAuth({ setCurrentUser, setEvents, closeAllModal });

  const openPopupCities = () => {
    setIsPopupCitiesOpen(true);
  };

  const handleVideoClick = (url) => {
    setIsPopupVideoOpen({ url, isOpened: true });
  };

  const handleCalendarCardClick = (calendarCard) => {
    setSelectedCalendarCard(calendarCard);
  };

  const handleRegisterSubmit = (calendarCard) => {
    setSelectedConfirmCalendarCard(calendarCard);
    setIsConfirmRegisterOpened(true);
  };

  const handleConfirmRegisterSubmit = (calendarCard) => {
    Api.updateEvent(calendarCard)
      .then((data) => {
        setEvents(events.map((e) => (e.id === data.id ? data : e)));
        closeAllModal();
        setIsRegisterSuccessModalOpened(true);
      })
      .catch(() => setRegisterErrorModalOpened(true));
  };

  const handleDeleteEvent = (calendarCard) => {
    Api.updateEvent(calendarCard)
      .then((data) => {
        setEvents(events.map((e) => (e.id === data.id ? data : e)));
        closeAllModal();
      })
      .catch(console.log);
  };

  const handleRecommentdPlace = () => {
    setIsPlacePopupOpened(!isPlacePopupOpened);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <ScrollToTop />
      <Header openAuthModal={openAuthModal} onLogout={logout} openPopupCities={openPopupCities} />
      <Content
        mainData={mainData}
        openAuthModal={openAuthModal}
        onLogout={logout}
        handleCalendarCardClick={handleCalendarCardClick}
        handleRegisterSubmit={handleRegisterSubmit}
        handleDeleteEvent={handleDeleteEvent}
        onRecommendPlace={handleRecommentdPlace}
        events={events}
        cities={cities}
        updateCity={updateCity}
        openPopupCities={openPopupCities}
        unauthСity={unauthСity}
        isPlacePopupOpened={isPlacePopupOpened}
        handleVideoClick={handleVideoClick}
      />
      <Footer />

      {isAuthModalOpened && (
        <AuthPopup closeAuthModal={closeAllModal} submitModal={handleSubmitAuth} />
      )}
      {selectedCalendarCard && (
        <PopupMeet
          closeModal={closeAllModal}
          selectedCalendarCard={selectedCalendarCard}
          handleRegisterSubmit={handleConfirmRegisterSubmit}
          handleDeleteEvent={handleDeleteEvent}
        />
      )}
      {isConfirmRegisterModalOpened && (
        <PopupConfirmRegister
          closeModal={closeAllModal}
          selectedConfirmCalendarCard={selectedConfirmCalendarCard}
          handleConfirmRegisterSubmit={handleConfirmRegisterSubmit}
        />
      )}
      {isRegisterSuccessModalOpened && <PopupRegisterSuccess closeModal={closeAllModal} />}
      {isRegisterErrorModalOpened && <PopupError closeModal={closeAllModal} />}
      {isPopupCitiesOpen && (
        <PopupCities
          onClose={closeAllModal}
          updateCity={updateCity}
          cities={cities}
          currentUser={currentUser}
        />
      )}
      {isPopupVideoOpen.isOpened && (
        <YoutubeEmbed onClose={closeAllModal} link={isPopupVideoOpen.url || ''} />
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
