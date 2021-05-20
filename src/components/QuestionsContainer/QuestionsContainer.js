import PropTypes from 'prop-types';
import './QuestionsContainer.css';
import Question from '../Question/Question';
import questionDataDummy from '../../utils/questionDataDummy';

const QuestionsContainer = ({ place }) => (
  <ul
    className={`questions ${
      place === 'main' ? 'questions_place_mainpage' : 'questions__page-list'
    }`}
  >
    {questionDataDummy.map(({ title, tags }) => (
      <Question title={title} tags={tags} place={place} />
    ))}
  </ul>
);

QuestionsContainer.propTypes = {
  place: PropTypes.string.isRequired,
};

export default QuestionsContainer;
