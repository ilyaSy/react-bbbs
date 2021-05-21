import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainPage from '../MainPage/MainPage';
import Calendar from '../Calendar/Calendar';
import WhereToGo from '../WhereToGo/WhereToGo';
import PersonalAccount from '../PersonalAccount/PersonalAccount';
import './content.css';

export default function Content({ mainData }) {
  return (
    <Switch>
      <main className="content root__section">
        <Route exact path="/">
          <MainPage mainData={mainData} />
        </Route>

        <Route exact path="/calendar">
          <Calendar />
        </Route>

        <Route exact path="/about">
          {/* <About /> */}
        </Route>

        <Route exact path="/where-to-go">
          <WhereToGo />
        </Route>

        <Route exact path="/questions">
          {/* Вопросы */}
        </Route>

        <Route exact path="/search">
          {/* Задать вопрос */}
        </Route>

        <Route exact path="/personal-account">
          <PersonalAccount />
        </Route>
      </main>
    </Switch>
  );
}

Content.propTypes = {
  mainData: PropTypes.objectOf(PropTypes.any).isRequired,
};

Content.defaultProps = {};
