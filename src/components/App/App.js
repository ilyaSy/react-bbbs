import { useState } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Content from '../Content/Content';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Content />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
