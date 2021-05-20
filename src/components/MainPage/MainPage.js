import MainPageSection from '../MainPageSection/MainPageSection';
import FacebookPlugin from '../FacebookPlugin/FacebookPlugin';
import QuestionsContainer from '../QuestionsContainer/QuestionsContainer';

export default function MainPage() {
  return (
    <div>
      <MainPageSection className="mainpage__blocks-col">
        <FacebookPlugin />
        <QuestionsContainer place="main" />
      </MainPageSection>
    </div>
  );
}
