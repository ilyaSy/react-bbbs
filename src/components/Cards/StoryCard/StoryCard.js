import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './StoryCard.css';
import Button from '../../UI/Button/Button';
import StoryImg from '../../UI/StoryImg/StoryImg';

const StoryCard = ({ storyRef, history, fullStory, isStoryPage }) => {
  const [leftImg, setLeftImg] = useState(0);
  const [centerImg, setCenterImg] = useState(1);
  const [rightImg, setRightImg] = useState(2);
  const scroll = createRef();

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

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  let rememberStart = 0;
  const handleStart = (e) => {
    rememberStart = e.touches[0].pageX;
  };

  const handleEnd = (e) => {
    setStart(rememberStart);
    setEnd(e.changedTouches[0].pageX);
  };

  React.useEffect(() => {
    if (start && end) {
      if (start < end) handleForwardClick();
      if (start > end) handleBackClick();
    }
  }, [start, end]);

  return (
    <>
      {isStoryPage ? (
        <article ref={storyRef} className="storypage__story">
          <img className="storypage__img" src={fullStory.imageUrl} alt="изображение отсутствует" />
          <h2 className="storypage__heading">{fullStory.heading}</h2>
          <p className="storypage__together">{fullStory.together}</p>
          <p className="storypage__text">{fullStory.text}</p>
          <div className="storypage__paragraph-flex">
            <p className="storypage__paragraph">{fullStory.p[0]}</p>
          </div>
          <blockquote className="storypage__cite">
            <p className="storypage__citetext">{fullStory.bold}</p>
          </blockquote>
          <div className="storypage__slider">
            <StoryImg src={fullStory.images[leftImg]} />
            <Button
              className="storypage__button storypage__button_back"
              onClick={handleBackClick}
            />
            <StoryImg
              src={fullStory.images[centerImg]}
              ref={scroll}
              onTouchStart={handleStart}
              onTouchEnd={handleEnd}
            />
            <Button
              className="storypage__button storypage__button_forward"
              onClick={handleForwardClick}
            />
            <StoryImg src={fullStory.images[rightImg]} />
          </div>
          <div className="storypage__paragraph-flex">
            <p className="storypage__paragraph">{fullStory.p[1]}</p>
            <p className="storypage__paragraph">{fullStory.p[2]}</p>
            <p className="storypage__paragraph">{fullStory.p[3]}</p>
          </div>
          <a className="storypage__link" href={fullStory.link}>
            {fullStory.writeTo}
          </a>
        </article>
      ) : (
        <div className="story" style={{ backgroundImage: `url(${history.imageUrl})` }}>
          <div className="story__overlay">
            <Link className="mainlink" to="/stories" rel="noopener noreferrer" />
            <h3 className="story__title">{history.title}</h3>
          </div>
        </div>
      )}
    </>
  );
};

StoryCard.propTypes = {
  history: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  isStoryPage: PropTypes.bool,
  fullStory: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.any])),
  storyRef: PropTypes.func,
};

StoryCard.defaultProps = {
  history: {
    imageUrl: '../../assets/img/story-back.png',
    title: 'История',
  },
  isStoryPage: false,
  fullStory: {},
  storyRef: () => {},
};

export default StoryCard;
