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
import { mainGet as mainPageData } from '../../utils/serverApiTestConfig';

export default function MainPage({ mainData }) {
  const currentUser = useContext(CurrentUserContext);
  if (false) {
    console.log(currentUser);
  }

  return (
    <MainPageSection className="mainpage">
      <MainPageSection className="mainpage__intro">
        <Intro />
        <Story history={mainPageData.history} />
      </MainPageSection>
      <MainPageSection className="mainpage__block">
        <MoviesContainer movies={mainData?.movies} />
      </MainPageSection>
      <MainPageSection className="mainpage__blocks">
        <MainVideo video={mainPageData.video} />
      </MainPageSection>
      <MainPageSection className="mainpage__blocks-col">
        <FacebookPlugin />
        <QuestionsContainer questions={mainData?.questions} place="main" />
      </MainPageSection>
    </MainPageSection>
  );
}

MainPage.propTypes = {
  mainData: PropTypes.objectOf(PropTypes.any).isRequired,
};

MainPage.defaultProps = {};
