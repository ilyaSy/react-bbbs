import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Story.css';
import Button from '../Button/Button';

const Story = ({ storyRef, history, fullStory, isStoryPage }) => {
  const [leftImg, setLeftImg] = React.useState(0);
  const [centerImg, setCenterImg] = React.useState(1);
  const [rightImg, setRightImg] = React.useState(2);

  const handleBackClick = () => {
    const newCenterImg = rightImg;
    const newLeftImg = leftImg + 1 >= fullStory.images.length ? 0 : leftImg + 1;
    const newRightImg = rightImg + 1 >= fullStory.images.length ? 0 : rightImg + 1;

    setLeftImg(newLeftImg);
    setCenterImg(newCenterImg);
    setRightImg(newRightImg);
  };
  const handleForwardClick = () => {
    const newCenterImg = leftImg;
    const newLeftImg = leftImg - 1 < 0 ? fullStory.images.length - 1 : leftImg - 1;
    const newRightImg = rightImg - 1 < 0 ? fullStory.images.length - 1 : rightImg - 1;

    setLeftImg(newLeftImg);
    setCenterImg(newCenterImg);
    setRightImg(newRightImg);
  };

  return (
    <>
      {isStoryPage ? (
        <article ref={storyRef} className="storypage__story">
          <img className="storypage__img" src={fullStory.imageUrl} alt="изображение отсутствует" />
          <h2 className="storypage__heading">{fullStory.heading}</h2>
          <p className="storypage__together">{fullStory.together}</p>
          <p className="storypage__text">{fullStory.text}</p>
          <p className="storypage__paragraph">{fullStory.p1}</p>
          <blockquote className="storypage__cite">
            <p className="storypage__citetext">{fullStory.bold}</p>
          </blockquote>

          <div className="storypage__slider">
            <img
              className="storypage__img storypage__img_place_slider"
              src={fullStory.images[leftImg]}
              alt="изображение отсутствует"
            />
            <Button
              className="storypage__button storypage__button_back"
              onClick={handleBackClick}
            />
            <img
              className="storypage__img storypage__img_place_slider"
              src={fullStory.images[centerImg]}
              alt="изображение отсутствует"
            />
            <Button
              className="storypage__button storypage__button_forward"
              onClick={handleForwardClick}
            />
            <img
              className="storypage__img storypage__img_place_slider"
              src={fullStory.images[rightImg]}
              alt="изображение отсутствует"
            />
          </div>

          {fullStory.p.map((paragraph) => (
            <p className="storypage__paragraph">{paragraph}</p>
          ))}

          <a className="storypage__link" href={fullStory.link}>
            {fullStory.writeTo}
          </a>
        </article>
      ) : (
        <div className="story" style={{ backgroundImage: `url(${history.imageUrl})` }}>
          <Link className="mainlink" to="/stories" rel="noopener noreferrer" />
          <h3 className="story__title">{history.title}</h3>
        </div>
      )}
    </>
  );
};

Story.propTypes = {
  history: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  isStoryPage: PropTypes.bool,
  fullStory: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.any])),
  storyRef: PropTypes.func,
};

Story.defaultProps = {
  history: {
    imageUrl: '../../assets/img/story-back.png',
    title: 'История',
  },
  isStoryPage: false,
  fullStory: {},
  storyRef: () => {},
};

export default Story;
