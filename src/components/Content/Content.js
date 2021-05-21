import { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainPage from '../MainPage/MainPage';
import Calendar from '../Calendar/Calendar';
import WhereToGo from '../WhereToGo/WhereToGo';
import PersonalAccount from '../PersonalAccount/PersonalAccount';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './content.css';

export default function Content({
  mainData,
  openAuthModal,
  onLogout,
  handleCalendarCardClick,
  handlerRegisterSubmit,
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
          <MainPage mainData={mainData} />
        </main>
      </Route>

      <ProtectedRoute
        path="/calendar"
        component={Calendar}
        handleCalendarCardClick={handleCalendarCardClick}
        handlerRegisterSubmit={handlerRegisterSubmit}
      />

      {/* <Route exact path="/calendar">
        <main>
          <Calendar />
        </main>
      </Route> */}

      <Route exact path="/about">
        {/* <About /> */}
      </Route>

      <Route exact path="/where-to-go">
        <main className="content root__section">
          <WhereToGo />
        </main>
      </Route>

      <Route exact path="/questions">
        {/* Вопросы */}
      </Route>

      <Route exact path="/search">
        {/* Задать вопрос */}
      </Route>

      <ProtectedRoute path="/personal-account" component={PersonalAccount} onLogout={onLogout} />
      {/* <Route exact path="/personal-account">
        <PersonalAccount onLogout={onLogout} />
      </Route> */}
    </Switch>
  );
}

Content.propTypes = {
  mainData: PropTypes.objectOf(PropTypes.any).isRequired,
  onLogout: PropTypes.func.isRequired,
  openAuthModal: PropTypes.func.isRequired,
  handleCalendarCardClick: PropTypes.func.isRequired,
  handlerRegisterSubmit: PropTypes.func.isRequired,
};

Content.defaultProps = {};
