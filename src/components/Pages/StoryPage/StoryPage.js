import { useRef } from 'react';
import { Helmet } from 'react-helmet';
import './StoryPage.css';
import Button from '../../UI/Button/Button';
import StoryCard from '../../Cards/StoryCard/StoryCard';
import fullStories from '../../../utils/stories';
import Heading from '../../UI/Heading/Heading';

const StoryPage = () => {
  // stotyRefs свяжет id кнопок с именами, с article соответствующих историй
  const storyRefs = useRef([]);
  function handleScrollToStory(event) {
    storyRefs.current[event.target.id].scrollIntoView();
  }

  return (
    <section className="storypage content main__section">
      <Helmet>
        <title>Истории дружбы</title>
        <meta name="description" content="stories" />
      </Helmet>
      <Heading>Истории дружбы</Heading>
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
        <StoryCard
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
