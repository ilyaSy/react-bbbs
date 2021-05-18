import {useState} from 'react';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Content from "../Content/Content";

import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import Button from "../Button/Button";
import Calendar from "../../config/pages/Calendar/Calendar";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div class="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Calendar />
        <Content />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
