import PropTypes from 'prop-types';
import './QuestionsContainer.css';

const QuestionsContainer = ({ place, children }) => (
  <ul
    className={`questions ${
      place === 'main' ? 'questions_place_mainpage' : 'questions__page-list'
    }`}
  >
    {children}
  </ul>
);

QuestionsContainer.propTypes = {
  place: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
};

QuestionsContainer.defaultProps = {
  children: [],
};

export default QuestionsContainer;
