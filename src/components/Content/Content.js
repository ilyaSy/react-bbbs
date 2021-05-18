import MainPage from '../MainPage/MainPage';
import {Switch, Route} from 'react-router-dom';

export default function Content () {
  return (
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>

      <Route exact path="/calendar">
        {/* <Calendar /> */}
      </Route>

      <Route exact path="/about">
        {/* <About /> */}
      </Route>

      <Route exact path="/where-to-go">
        {/* <WhereToGo /> */}
      </Route>

      <Route exact path="/questions">
        {/* <Questions /> */}
      </Route>
    </Switch>
  )
}