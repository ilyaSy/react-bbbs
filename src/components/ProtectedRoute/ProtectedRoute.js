import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

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
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <Route>
      {currentUser ? (
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
      ) : (
        <Redirect to={{ pathname: '/', state: { isAuthModalOpened: true } }} />
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
};

ProtectedRoute.defaultProps = {
  handleCalendarCardClick: () => {},
  handleRegisterSubmit: () => {},
  handleDeleteEvent: () => {},
  onLogout: () => {},
  events: [],
  cities: [],
  updateCity: () => {},
  openPopupCities: () => {},
};
