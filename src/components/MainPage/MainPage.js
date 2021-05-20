import MainPageSection from '../MainPageSection/MainPageSection';
import FacebookPlugin from '../FacebookPlugin/FacebookPlugin';
import QuestionsContainer from '../QuestionsContainer/QuestionsContainer';
import Movie from '../Movie/Movie';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import videoDataDummy from '../../utils/videoDataDummy';

export default function MainPage() {
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
        <QuestionsContainer place="main" />
      </MainPageSection>
    </div>
  );
}
