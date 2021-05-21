import { useContext } from 'react';
import PropTypes from 'prop-types';
import MainPageSection from '../MainPageSection/MainPageSection';
import FacebookPlugin from '../FacebookPlugin/FacebookPlugin';
import QuestionsContainer from '../QuestionsContainer/QuestionsContainer';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function MainPage({ mainData }) {
  const currentUser = useContext(CurrentUserContext);
  if (false) {
    console.log(currentUser);
  }

  return (
    <div>
      <MainPageSection className="mainpage__block">
        <MoviesContainer movies={mainData?.movies} />
      </MainPageSection>
      <MainPageSection className="mainpage__blocks-col">
        <FacebookPlugin />
        <QuestionsContainer questions={mainData?.questions} place="main" />
      </MainPageSection>
    </div>
  );
}

MainPage.propTypes = {
  mainData: PropTypes.objectOf(PropTypes.any).isRequired,
};

MainPage.defaultProps = {};
