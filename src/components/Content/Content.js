import { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainPage from '../MainPage/MainPage';
import Calendar from '../Calendar/Calendar';
import WhereToGo from '../WhereToGo/WhereToGo';
import PersonalAccount from '../PersonalAccount/PersonalAccount';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import About from '../About/About';
import StoryPage from '../StoryPage/StoryPage';
import PageNotFound from '../PageNotFound/PageNotFound';
import './content.css';

export default function Content({
  mainData,
  openAuthModal,
  onLogout,
  handleCalendarCardClick,
  handleRegisterSubmit,
  handleDeleteEvent,
  onRecommendPlace,
}) {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.isAuthModalOpened) {
      openAuthModal();
    }
  }, [location]);

  return (
    <Switch>
      <Route exact path="/">
        <main className="content root__section">
          {/* <MainPage mainData={mainData} /> */}
          <MainPage
            mainData={mainData}
            handleCalendarCardClick={handleCalendarCardClick}
            handleRegisterSubmit={handleRegisterSubmit}
            handleDeleteEvent={handleDeleteEvent}
          />
        </main>
      </Route>

      <ProtectedRoute
        path="/calendar"
        component={Calendar}
        handleCalendarCardClick={handleCalendarCardClick}
        handleRegisterSubmit={handleRegisterSubmit}
        handleDeleteEvent={handleDeleteEvent}
      />

      <Route exact path="/stories">
        <main className="main">
          <StoryPage />
        </main>
      </Route>

      <Route exact path="/about">
        {/* <main className="content root__section"> */}
        <main className="main">
          <About />
        </main>
      </Route>

      <Route exact path="/where-to-go">
        <main className="content root__section">
          <WhereToGo onRecommendPlace={onRecommendPlace} />
        </main>
      </Route>

      {/* Вопросы */}
      {/* <Route exact path="/questions">
      </Route> */}

      {/* Задать вопрос */}
      {/* <Route exact path="/search">
      </Route> */}

      <ProtectedRoute
        path="/personal-account"
        component={PersonalAccount}
        onLogout={onLogout}
        handleCalendarCardClick={handleCalendarCardClick}
      />
      <Route exact path="*">
        <PageNotFound />
      </Route>
    </Switch>
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
};

Content.defaultProps = {
  mainData: {},
};
