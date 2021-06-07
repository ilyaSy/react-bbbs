/*eslint-disable*/
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const StoryImg = forwardRef(({ src, onTouchStart, onTouchEnd }, ref) => (
  <img
    className="storypage__img storypage__img_place_slider"
    src={src}
    alt="изображение отсутствует"
    ref={ref}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
  />
));

StoryImg.propTypes = {
  src: PropTypes.string,
};

StoryImg.defaultProps = {
  src: '',
};

export default StoryImg;
