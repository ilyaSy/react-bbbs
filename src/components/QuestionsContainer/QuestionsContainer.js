import PropTypes from 'prop-types';
import './QuestionsContainer.css';
import Question from '../Question/Question';

const QuestionsContainer = ({ questions, place }) => (
  <ul
    className={`questions ${
      place === 'main' ? 'questions_place_mainpage' : 'questions__page-list'
    }`}
  >
    {questions.map(({ title, tags }) => (
      <Question title={title} tags={tags} place={place} />
    ))}
  </ul>
);

QuestionsContainer.propTypes = {
  place: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.any),
};

QuestionsContainer.defaultProps = {
  questions: [],
};

export default QuestionsContainer;
