import { Switch, Route } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import Calendar from '../Calendar/Calendar';
import WhereToGo from '../WhereToGo/WhereToGo';
import './content.css';

export default function Content() {
  return (
    <Switch>
      <Route exact path="/">
        <main className="content root__section">
          <MainPage />
        </main>
      </Route>

      <Route exact path="/calendar">
        <Calendar />
      </Route>

      <Route exact path="/about">
        {/* <About /> */}
      </Route>

      <Route exact path="/where-to-go">
        <main className="content root__section">
          <WhereToGo />
        </main>
      </Route>

      <Route exact path="/questions">
        {/* <Questions /> */}
      </Route>
    </Switch>
  );
}
