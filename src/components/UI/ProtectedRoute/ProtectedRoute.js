import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { Redirect, Route } from 'react-router-dom';
import { Route } from 'react-router-dom';
// import Api from '../../../utils/api';
import CurrentUserContext from '../../../contexts/CurrentUserContext';

// const JWT_KEY = 'jwt';

export default function ProtectedRoute({
  component: Component,
  path,
  onLogout,
  handleCalendarCardClick,
  handleRegisterSubmit,
  handleDeleteEvent,
  events,
  cities,
  updateCity,
  openPopupCities,
  refreshJWT,
}) {
  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    refreshJWT(true);
  }, []);

  return (
    <Route>
      {currentUser && (
        <Component
          exact
          path={path}
          onLogout={onLogout}
          handleCalendarCardClick={handleCalendarCardClick}
          handleRegisterSubmit={handleRegisterSubmit}
          handleDeleteEvent={handleDeleteEvent}
          events={events}
          cities={cities}
          updateCity={updateCity}
          openPopupCities={openPopupCities}
        />
      )}
    </Route>
  );
}

ProtectedRoute.propTypes = {
  // PropTypes.element.isRequired, линтер ругаетсяна елеменрт
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  onLogout: PropTypes.func,
  handleCalendarCardClick: PropTypes.func,
  handleRegisterSubmit: PropTypes.func,
  handleDeleteEvent: PropTypes.func,
  events: PropTypes.arrayOf(PropTypes.any),
  cities: PropTypes.arrayOf(PropTypes.any),
  updateCity: PropTypes.func,
  openPopupCities: PropTypes.func,
  refreshJWT: PropTypes.func,
};

ProtectedRoute.defaultProps = {
  handleCalendarCardClick: () => {},
  handleRegisterSubmit: () => {},
  handleDeleteEvent: () => {},
  onLogout: () => {},
  events: [],
  cities: [],
  refreshJWT: () => {},
  updateCity: () => {},
  openPopupCities: () => {},
};
