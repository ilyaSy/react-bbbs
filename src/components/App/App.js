import { useState } from 'react';
import { Helmet } from 'react-helmet';
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
import PopupError from '../Modals/PopupError/PopupError';
import PopupCities from '../Modals/PopupCities/PopupCities';
import YoutubeEmbed from '../Modals/YoutubeEmbed/YoutubeEmbed';
import ScrollToTop from '../UI/ScrollToTop/ScrollToTop';
import useAuth from '../../hooks/useAuth';
import useMainDataCities from '../../hooks/useMainDataCities';
import PopupRecomendationSuccess from '../Modals/PopupRecomendationSuccess/PopupRecomendationSuccess';

function App() {
  const [events, setEvents] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [unauthCity, setUnauthCity] = useState({});
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);
  const [isConfirmRegisterModalOpened, setIsConfirmRegisterOpened] = useState(false);
  const [isRegisterSuccessModalOpened, setIsRegisterSuccessModalOpened] = useState(false);
  const [isPopupRecomendationSuccess, setPopupRecomendationSuccess] = useState(false);
  const [isPopupCitiesOpen, setIsPopupCitiesOpen] = useState(false);
  const [isPlacePopupOpened, setIsPlacePopupOpened] = useState(false);
  const [isPopupVideoOpen, setIsPopupVideoOpen] = useState({ isOpened: false });
  const [isRegisterErrorModalOpened, setRegisterErrorModalOpened] = useState(false);
  const [selectedCalendarCard, setSelectedCalendarCard] = useState(null);
  const [selectedConfirmCalendarCard, setSelectedConfirmCalendarCard] = useState(null);

  const mainDataCities = useMainDataCities();

  const updateCity = (city) => {
    if (currentUser) {
      Api.updateUserInfo({
        city: [city],
        user: currentUser.user,
      })
        .then((data) => {
          mainDataCities.cities.forEach((c) => {
            if (c.id === data.city)
              setCurrentUser({
                cityName: c.name,
                user: data.user,
                city: data.city,
              });
          });
        })
        .catch(console.log);
    } else {
      mainDataCities.cities.forEach((c) => {
        if (c.id === parseInt(city, 10)) {
          setUnauthCity({ cityId: c.id, cityName: c.name });
        }
      });
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
    setPopupRecomendationSuccess(false);
  };
  // кастомный Хук авторизации
  const { refreshJWT, logout, handleSubmitAuth } = useAuth({
    setCurrentUser,
    setEvents,
    closeAllModal,
    openAuthModal,
  });

  const openPopupCities = () => {
    setIsPopupCitiesOpen(true);
  };

  const handleVideoClick = (url, title, info) => {
    setIsPopupVideoOpen({ url, isOpened: true, title, info });
  };

  const handleCalendarCardClick = (calendarCard) => {
    setSelectedCalendarCard(calendarCard);
  };

  const handleRegisterSubmit = (calendarCard) => {
    setSelectedConfirmCalendarCard(calendarCard);
    setIsConfirmRegisterOpened(true);
  };

  const handlePlacesFormSubmit = () => {
    setPopupRecomendationSuccess(true);
  };
  const handleConfirmRegisterSubmit = (calendarCard) => {
    Api.setEvent({ event: calendarCard.id })
      .then((data) => {
        const card = { ...calendarCard };
        if (data.id) card.booked = true;
        setEvents(events.map((e) => (e.id === card.id ? card : e)));
        closeAllModal();
        setIsRegisterSuccessModalOpened(true);
      })
      .catch(() => setRegisterErrorModalOpened(true));
  };

  const handleDeleteEvent = (calendarCard) => {
    Api.deleteEvent({ event: calendarCard.id })
      .then(() => {
        const card = { ...calendarCard, booked: false };
        setEvents(events.map((e) => (e.id === card.id ? card : e)));
        closeAllModal();
      })
      .catch(console.log);
  };

  const handleRecommentdPlace = () => {
    setIsPlacePopupOpened(!isPlacePopupOpened);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Helmet>
        <title>Наставники.про | Старшие Братья Старшие Сёстры</title>
        <meta name="description" content="application" />
      </Helmet>
      <ScrollToTop />
      <Header openAuthModal={openAuthModal} onLogout={logout} openPopupCities={openPopupCities} />
      <Content
        {...mainDataCities}
        openAuthModal={openAuthModal}
        onLogout={logout}
        handleCalendarCardClick={handleCalendarCardClick}
        handleRegisterSubmit={handleRegisterSubmit}
        handleDeleteEvent={handleDeleteEvent}
        onRecommendPlace={handleRecommentdPlace}
        events={events}
        updateCity={updateCity}
        openPopupCities={openPopupCities}
        unauthCity={unauthCity}
        isPlacePopupOpened={isPlacePopupOpened}
        handleVideoClick={handleVideoClick}
        handlePlacesFormSubmit={handlePlacesFormSubmit}
        refreshJWT={refreshJWT}
      />
      <Footer />

      {isAuthModalOpened ? (
        <AuthPopup closeAuthModal={closeAllModal} submitModal={handleSubmitAuth} />
      ) : null}
      {selectedCalendarCard ? (
        <PopupMeet
          closeModal={closeAllModal}
          selectedCalendarCard={selectedCalendarCard}
          handleRegisterSubmit={handleConfirmRegisterSubmit}
          handleDeleteEvent={handleDeleteEvent}
        />
      ) : null}
      {isConfirmRegisterModalOpened ? (
        <PopupConfirmRegister
          closeModal={closeAllModal}
          selectedConfirmCalendarCard={selectedConfirmCalendarCard}
          handleConfirmRegisterSubmit={handleConfirmRegisterSubmit}
        />
      ) : null}
      {isRegisterSuccessModalOpened ? <PopupRegisterSuccess closeModal={closeAllModal} /> : null}
      {isRegisterErrorModalOpened ? <PopupError closeModal={closeAllModal} /> : null}
      {isPopupCitiesOpen ? (
        <PopupCities
          onClose={closeAllModal}
          updateCity={updateCity}
          cities={mainDataCities.cities}
          currentUser={currentUser}
        />
      ) : null}
      {isPopupRecomendationSuccess ? (
        <PopupRecomendationSuccess closeModal={closeAllModal} />
      ) : null}
      {isPopupVideoOpen.isOpened ? (
        <YoutubeEmbed
          onClose={closeAllModal}
          link={isPopupVideoOpen.url || ''}
          title={isPopupVideoOpen.title}
          info={isPopupVideoOpen.info}
        />
      ) : null}
    </CurrentUserContext.Provider>
  );
}

export default App;
