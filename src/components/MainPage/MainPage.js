import { useContext } from 'react';
import PropTypes from 'prop-types';
import MainPageSection from '../MainPageSection/MainPageSection';
import FacebookPlugin from '../FacebookPlugin/FacebookPlugin';
import QuestionsContainer from '../QuestionsContainer/QuestionsContainer';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Intro from '../Intro/Intro';
import Story from '../Story/Story';
import MainVideo from '../MainVideo/MainVideo';
import Article from '../Article/Article';
import Place from '../Place/Place';

export default function MainPage({ mainData }) {
  const currentUser = useContext(CurrentUserContext);
  if (currentUser === '1000') {
    return false;
  }
  return (
    <MainPageSection className="mainpage">
      <MainPageSection className="mainpage__intro">
        <Intro />
        <Story history={mainData?.history} isStoryPage={false} />
      </MainPageSection>
      <MainPageSection className="mainpage__blocks">
        <Place place={mainData?.place} size="big" />
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
};

MainPage.defaultProps = {
  mainData: {},
};
