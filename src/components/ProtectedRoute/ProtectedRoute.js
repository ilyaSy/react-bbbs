import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function ProtectedRoute({ component: Component, path, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  let className = 'content root__section';
  if (path !== '/calendar' || path !== '/personal-account') {
    className = '';
  }

  return (
    <Route>
      {currentUser ? (
        <main className={className}>
          <Component exact path={path} onLogout={onLogout} />
        </main>
      ) : (
        <Redirect to={{ pathname: '/', state: { isAuthModalOpened: true } }} />
      )}
    </Route>
  );
}

ProtectedRoute.propTypes = {
  component: PropTypes.element.isRequired,
  path: PropTypes.string.isRequired,
  onLogout: PropTypes.func,
};

ProtectedRoute.defaultProps = {
  onLogout: () => {},
};
