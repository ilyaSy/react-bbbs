import './StoryPage.css';
import Button from '../Button/Button';
import Story from '../Story/Story';
import fullStories from '../../utils/stories';

const stories = [
  'Алина и Марина',
  'Кирилл и Никита',
  'Алик и Артем',
  'Нина и Виталик',
  'Юля и Вова',
  'Катя и Петя',
  'Вероника и Виталик',
];

const StoryPage = () => (
  <section className="storypage content root__section">
    <h1 className="heading">Истории дружбы</h1>
    <p className="storypage__caption">
      Результат нашей работы сложно показать цифрами. Как измерить и&nbsp;взвесить дружбу? Как
      оценить успехи абсолютно разных детей? У&nbsp;каждой пары&nbsp;&mdash; свой результат
      и&nbsp;свои достижения. Именно об&nbsp;этом мы&nbsp;рассказываем в&nbsp;историях.
    </p>
    <div className="buttons-scroll">
      {stories.map((story) => (
        <Button key={story} className="button button_color_black" type="button">
          {story}
        </Button>
      ))}
    </div>
    <article className="storypage__story">
      <Story fullStory={fullStories[0]} isStoryPage />
    </article>
  </section>
);

export default StoryPage;
