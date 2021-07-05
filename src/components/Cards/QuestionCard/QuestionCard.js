import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../App/App.css';
import Tag from '../../UI/Tag/Tag';
import Button from '../../UI/Button/Button';
import './QuestionCard.css';

const QuestionCard = ({ anchor, title, tags, answerText, place }) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const handleToggleAnswer = () => setIsAnswerVisible(!isAnswerVisible);

  return (
    <>
      {place === 'main' && (
        <li className="question">
          <Link to={`/questions/#${anchor}`} className="mainlink" />
          <h3 className="question__title">{title}</h3>
          <div className="question__tags">
            {tags.map((tag) => (
              <Tag key={tag.id} modifier="tag_theme_white" tagText={tag.name} />
            ))}
          </div>
        </li>
      )}
      {place === 'questions' && (
        <li className="question__flex" name={anchor}>
          <div className="question">
            <h3 className="question__title" onClick={handleToggleAnswer} aria-hidden="true">
              {title}
            </h3>
            <div className="question__tags">
              {tags.map((tag) => (
                <Tag key={tag.id} modifier="tag_theme_white" tagText={tag.name} />
              ))}
            </div>
            {isAnswerVisible && <p className="question__answer">{answerText}</p>}
          </div>
          <Button
            className={`question__btn ${isAnswerVisible ? 'question__btn_rotated' : ''}`}
            onClick={handleToggleAnswer}
          />
        </li>
      )}
    </>
  );
};

QuestionCard.propTypes = {
  anchor: PropTypes.string,
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.any),
  answerText: PropTypes.string,
  place: PropTypes.string.isRequired,
};

QuestionCard.defaultProps = {
  anchor: '',
  answerText: '',
  tags: [],
};

export default QuestionCard;
