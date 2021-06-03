import { useRef } from 'react';
import './StoryPage.css';
import Button from '../../UI/Button/Button';
import Story from '../../Cards/Story/Story';
import fullStories from '../../../utils/stories';

const StoryPage = () => {
  // stotyRefs свяжет id кнопок с именами, с article соответствующих историй
  const storyRefs = useRef([]);
  function handleScrollToStory(event) {
    storyRefs.current[event.target.id].scrollIntoView();
  }

  return (
    <section className="storypage content main__section">
      <h1 className="heading">Истории дружбы</h1>
      <p className="storypage__caption">
        Результат нашей работы сложно показать цифрами. Как измерить и&nbsp;взвесить дружбу? Как
        оценить успехи абсолютно разных детей? У&nbsp;каждой пары&nbsp;&mdash; свой результат
        и&nbsp;свои достижения. Именно об&nbsp;этом мы&nbsp;рассказываем в&nbsp;историях.
      </p>
      <div className="scroll-container">
        <div className="buttons-scroll">
          {fullStories.map((fullStory) => (
            <Button
              id={fullStory.id}
              key={fullStory.id}
              className="button button_color_black button_place_scroll"
              type="button"
              onClick={handleScrollToStory}
            >
              {fullStory.heading}
            </Button>
          ))}
        </div>
      </div>
      {fullStories.map((fullStory) => (
        <Story
          storyRef={(el) => {
            storyRefs.current[fullStory.id] = el;
          }}
          key={fullStory.id}
          fullStory={fullStory}
          isStoryPage
        />
      ))}
    </section>
  );
};

export default StoryPage;
