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
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <Route>
      {currentUser ? (
        <main className="main">
          <Component
            exact
            path={path}
            onLogout={onLogout}
            handleCalendarCardClick={handleCalendarCardClick}
            handleRegisterSubmit={handleRegisterSubmit}
            handleDeleteEvent={handleDeleteEvent}
            events={events}
          />
        </main>
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
};

ProtectedRoute.defaultProps = {
  handleCalendarCardClick: () => {},
  handleRegisterSubmit: () => {},
  handleDeleteEvent: () => {},
  onLogout: () => {},
  events: [],
};
