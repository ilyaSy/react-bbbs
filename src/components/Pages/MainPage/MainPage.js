import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import MainPageSection from '../../Containers/MainPageSection/MainPageSection';
import QuestionsContainer from '../../Containers/QuestionsContainer/QuestionsContainer';
import MoviesContainer from '../../Containers/MoviesContainer/MoviesContainer';
import MainVideoCard from '../../Cards/MainVideoCard/MainVideoCard';
import CalendarCard from '../../Cards/CalendarCard/CalendarCard';
import IntroCard from '../../Cards/IntroCard/IntroCard';
import StoryCard from '../../Cards/StoryCard/StoryCard';
import ArticleCard from '../../Cards/ArticleCard/ArticleCard';
import Card from '../../Cards/Card/Card';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import FacebookPlugin from '../../UI/FacebookPlugin/FacebookPlugin';
import QuestionCard from '../../Cards/QuestionCard/QuestionCard';
import './main.css';

export default function MainPage({
  mainData,
  handleCalendarCardClick,
  handleDeleteEvent,
  handleRegisterSubmit,
  events,
  handleVideoClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [userEvent, setUserEvent] = useState(null);

  useEffect(() => {
    if (mainData && events) {
      setUserEvent(events[0]);
    }
  }, [mainData, events]);
  return (
    <MainPageSection className="mainpage content main__section">
      <Helmet>
        <title>Главная</title>
        <meta name="description" content="main" />
      </Helmet>
      <MainPageSection className="mainpage__intro">
        {currentUser && userEvent ? (
          <CalendarCard
            event={userEvent}
            handleCalendarCardClick={handleCalendarCardClick}
            handleRegisterSubmit={handleRegisterSubmit}
            handleDeleteEvent={handleDeleteEvent}
          />
        ) : (
          <IntroCard />
        )}
        <StoryCard history={mainData?.history} isStoryPage={false} />
      </MainPageSection>
      <MainPageSection className="mainpage__blocks">
        <Card type="place" data={mainData?.place[0]} size="big" color="yellow" />
      </MainPageSection>
      <MainPageSection className="mainpage__blocks">
        <ArticleCard article={mainData?.rights[0]} color="#C8D1FF" />
      </MainPageSection>
      <MainPageSection className="mainpage__blocks">
        <MoviesContainer
          movies={mainData?.movies}
          handleVideoClick={handleVideoClick}
          isMovesPage={false}
        />
      </MainPageSection>
      <MainPageSection className="mainpage__blocks">
        <MainVideoCard
          video={mainData?.video[0]}
          handleVideoClick={handleVideoClick}
          isVideosPage={false}
        />
      </MainPageSection>
      <MainPageSection className="mainpage__blocks-col">
        <FacebookPlugin />
        <QuestionsContainer place="main">
          {mainData?.questions.map(({ id, question, answer, tag }) => (
            <QuestionCard
              place="main"
              path={id}
              title={question}
              tags={tag}
              answerText={answer}
              key={id}
            />
          ))}
        </QuestionsContainer>
      </MainPageSection>
      <MainPageSection className="mainpage__blocks">
        <ArticleCard article={mainData?.rights[1]} color="#8CDD94" />
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
  handleVideoClick: PropTypes.func,
};

MainPage.defaultProps = {
  mainData: {},
  events: [],
  handleVideoClick: () => {},
};
