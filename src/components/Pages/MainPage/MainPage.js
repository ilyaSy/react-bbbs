import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MainPageSection from '../../Containers/MainPageSection/MainPageSection';
import QuestionsContainer from '../../Containers/QuestionsContainer/QuestionsContainer';
import MoviesContainer from '../../Containers/MoviesContainer/MoviesContainer';
import MainVideo from '../../Containers/MainVideo/MainVideo';
import CalendarCard from '../../Cards/CalendarCard/CalendarCard';
import Intro from '../../Cards/Intro/Intro';
import Story from '../../Cards/Story/Story';
import Article from '../../Cards/Article/Article';
import Card from '../../Cards/Card/Card';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import FacebookPlugin from '../../UI/FacebookPlugin/FacebookPlugin';

export default function MainPage({
  mainData,
  handleCalendarCardClick,
  handleDeleteEvent,
  handleRegisterSubmit,
  events,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [userEvent, setUserEvent] = useState(null);

  useEffect(() => {
    if (mainData && events) {
      setUserEvent(events.sort((a, b) => new Date(b.startAt) - new Date(a.startAt))[0]);
    }
  }, [mainData, events]);

  return (
    <MainPageSection className="mainpage content main__section">
      <MainPageSection className="mainpage__intro">
        {currentUser && userEvent ? (
          <CalendarCard
            event={userEvent}
            handleCalendarCardClick={handleCalendarCardClick}
            handleRegisterSubmit={handleRegisterSubmit}
            handleDeleteEvent={handleDeleteEvent}
          />
        ) : (
          <Intro />
        )}
        <Story history={mainData?.history} isStoryPage={false} />
      </MainPageSection>
      <MainPageSection className="mainpage__blocks">
        <Card type="place" data={mainData?.place} size="big" color="yellow" />
      </MainPageSection>
      <MainPageSection className="mainpage__block">
        <Article article={mainData?.articles[0]} />
      </MainPageSection>
      <MainPageSection className="mainpage__block">
        <MoviesContainer movies={mainData?.movies} />
      </MainPageSection>
      <MainPageSection className="mainpage__blocks">
        <MainVideo video={mainData?.video} />
      </MainPageSection>
      <MainPageSection className="mainpage__blocks-col">
        <FacebookPlugin />
        <QuestionsContainer questions={mainData?.questions} place="main" />
      </MainPageSection>
      <MainPageSection className="mainpage__block">
        <Article article={mainData?.articles[1]} />
      </MainPageSection>
    </MainPageSection>
  );
}

MainPage.propTypes = {
  mainData: PropTypes.objectOf(PropTypes.any),
  handleCalendarCardClick: PropTypes.func.isRequired,
  handleDeleteEvent: PropTypes.func.isRequired,
  handleRegisterSubmit: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.any),
};

MainPage.defaultProps = {
  mainData: {},
  events: [],
};
