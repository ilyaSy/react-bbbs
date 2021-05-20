import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Story.css';

const Story = ({ history }) => (
  <div className="story" style={{ backgroundImage: `url(${history.imageUrl})` }}>
    <Link className="mainlink" to="/" target="_blank" rel="noopener noreferrer" />
    <h3 className="story__title">{history.title}</h3>
  </div>
);

Story.propTypes = {
  history: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
};

export default Story;
