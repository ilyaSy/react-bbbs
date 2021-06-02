import PropTypes from 'prop-types';

const StoryImg = ({ src }) => (
  <img
    className="storypage__img storypage__img_place_slider"
    src={src}
    alt="изображение отсутствует"
  />
);

StoryImg.propTypes = {
  src: PropTypes.string,
};

StoryImg.defaultProps = {
  src: '',
};

export default StoryImg;
