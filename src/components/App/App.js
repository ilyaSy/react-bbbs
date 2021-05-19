import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Content from '../Content/Content';
import api from '../../utils/api';

import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  if (false) {
    setCurrentUser(null);
  }

  useEffect(() => {
    api
      .getMain()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(`Error: ошибка ${err}`);
      });
  }, []);

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
