import { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainPage from '../Pages/MainPage/MainPage';
import Calendar from '../Pages/Calendar/Calendar';
import PlacesPage from '../Pages/PlacesPage/PlacesPage';
import QuestionsPage from '../Pages/QuestionsPage/QuestionsPage';
import PersonalAccount from '../Pages/PersonalAccount/PersonalAccount';
import About from '../Pages/About/About';
import StoryPage from '../Pages/StoryPage/StoryPage';
import PageNotFound from '../Pages/PageNotFound/PageNotFound';
import ReadAndWatch from '../Pages/ReadAndWatch/ReadAndWatch';
import BooksPage from '../Pages/BooksPage/BooksPage';
import MoviesPage from '../Pages/MoviesPage/MoviesPage';
import VideosPage from '../Pages/VideosPage/VideosPage';
import ArticlesPage from '../Pages/ArticlesPage/ArticlesPage';
import GuidePage from '../Pages/GuidePage/GuidePage';
import RightsPage from '../Pages/RightsPage/RightsPage';
import ProtectedRoute from '../UI/ProtectedRoute/ProtectedRoute';
import './content.css';

export default function Content({
  mainData,
  openAuthModal,
  onLogout,
  handleCalendarCardClick,
  handleRegisterSubmit,
  handleDeleteEvent,
  onRecommendPlace,
  events,
  cities,
  updateCity,
  openPopupCities,
  unauthCity,
  isPlacePopupOpened,
  handleVideoClick,
  handlePlacesFormSubmit,
  refreshJWT,
}) {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.isAuthModalOpened) {
      openAuthModal();
    }
  }, [location]);

  return (
    <main className="main">
      <Switch>
        <Route exact path="/">
          <MainPage
            mainData={mainData}
            handleCalendarCardClick={handleCalendarCardClick}
            handleRegisterSubmit={handleRegisterSubmit}
            handleDeleteEvent={handleDeleteEvent}
            events={events}
            handleVideoClick={handleVideoClick}
          />
        </Route>

        <ProtectedRoute
          path="/calendar"
          component={Calendar}
          handleCalendarCardClick={handleCalendarCardClick}
          handleRegisterSubmit={handleRegisterSubmit}
          handleDeleteEvent={handleDeleteEvent}
          events={events}
          refreshJWT={refreshJWT}
        />

        <Route exact path="/stories">
          <StoryPage />
        </Route>

        <Route exact path="/about">
          <About />
        </Route>

        <Route exact path="/where-to-go">
          <PlacesPage
            onRecommendPlace={onRecommendPlace}
            openPopupCities={openPopupCities}
            unauthCity={unauthCity}
            isPlacePopupOpened={isPlacePopupOpened}
            handlePlacesFormSubmit={handlePlacesFormSubmit}
          />
        </Route>

        <Route exact path="/questions">
          <QuestionsPage />
        </Route>

        <Route exact path="/read-watch">
          <ReadAndWatch handleVideoClick={handleVideoClick} />
        </Route>

        <Route exact path="/rights">
          <RightsPage />
        </Route>

        <Route exact path="/read-watch/guide">
          <GuidePage />
        </Route>

        <Route exact path="/read-watch/videos">
          <VideosPage handleVideoClick={handleVideoClick} />
        </Route>

        <Route exact path="/read-watch/articles">
          <ArticlesPage />
        </Route>

        <Route exact path="/read-watch/movies">
          <MoviesPage handleVideoClick={handleVideoClick} />
        </Route>

        <Route exact path="/read-watch/books">
          <BooksPage />
        </Route>

        <ProtectedRoute
          path="/personal-account"
          component={PersonalAccount}
          onLogout={onLogout}
          handleCalendarCardClick={handleCalendarCardClick}
          events={events}
          cities={cities}
          updateCity={updateCity}
          openPopupCities={openPopupCities}
          refreshJWT={refreshJWT}
        />

        <Route exact path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </main>
  );
}

Content.propTypes = {
  mainData: PropTypes.objectOf(PropTypes.any),
  onLogout: PropTypes.func.isRequired,
  openAuthModal: PropTypes.func.isRequired,
  handleCalendarCardClick: PropTypes.func.isRequired,
  handleRegisterSubmit: PropTypes.func.isRequired,
  handleDeleteEvent: PropTypes.func.isRequired,
  onRecommendPlace: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.any),
  cities: PropTypes.arrayOf(PropTypes.any),
  updateCity: PropTypes.func,
  openPopupCities: PropTypes.func,
  unauthCity: PropTypes.objectOf(PropTypes.any),
  isPlacePopupOpened: PropTypes.bool.isRequired,
  handleVideoClick: PropTypes.func,
  handlePlacesFormSubmit: PropTypes.func,
  refreshJWT: PropTypes.func,
};

Content.defaultProps = {
  mainData: {},
  events: [],
  cities: [],
  updateCity: () => {},
  openPopupCities: () => {},
  unauthCity: {},
  handleVideoClick: () => {},
  handlePlacesFormSubmit: () => {},
  refreshJWT: () => {},
};
