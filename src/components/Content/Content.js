import { Switch, Route } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import Calendar from '../Calendar/Calendar';
import WhereToGo from '../WhereToGo/WhereToGo';
import './content.css';

export default function Content() {
  return (
    <Switch>
      <main className="content root__section">
        <Route exact path="/">
          <MainPage />
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
      </main>
    </Switch>
  );
}
