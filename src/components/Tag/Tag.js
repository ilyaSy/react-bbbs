import PropTypes from 'prop-types';
import './Tag.css';

const Tag = ({ modifier, tagText }) => <p className={`tag ${modifier}`}>{tagText}</p>;

Tag.propTypes = {
  modifier: PropTypes.string,
  tagText: PropTypes.string.isRequired,
};

Tag.defaultProps = {
  modifier: '',
};

export default Tag;
