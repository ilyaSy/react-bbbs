import PropTypes from 'prop-types';
import MainPageSection from '../MainPageSection/MainPageSection';
import FacebookPlugin from '../FacebookPlugin/FacebookPlugin';
import QuestionsContainer from '../QuestionsContainer/QuestionsContainer';
import Movie from '../Movie/Movie';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import videoDataDummy from '../../utils/videoDataDummy';

export default function MainPage({ mainData }) {
  return (
    <div>
      <MainPageSection className="mainpage__block">
        <MoviesContainer>
          {videoDataDummy.map(({ tags, title, caption, poster, link }) => (
            <Movie tags={tags} title={title} caption={caption} poster={poster} link={link} />
          ))}
        </MoviesContainer>
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
