import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../App/App.css';
import Tag from '../../UI/Tag/Tag';
import Button from '../../UI/Button/Button';
import './QuestionCard.css';

const QuestionCard = ({ anchor, title, tags, answerText, place }) => {
  const tagsText = tags.map((tag) => tag.name);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const handleToggleAnswer = () => setIsAnswerVisible(!isAnswerVisible);

  return (
    <>
      {place === 'main' && (
        <li className="question">
          <Link to={`/questions/#${anchor}`} className="mainlink" />
          <h3 className="question__title">{title}</h3>
          <div className="question__tags">
            {tagsText.map((tagText) => (
              <Tag key={tagText} modifier="tag_theme_white" tagText={tagText} />
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
              {tagsText.map((tagText) => (
                <Tag key={tagText} modifier="tag_theme_white" tagText={tagText} />
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
  tags: PropTypes.arrayOf(PropTypes.any).isRequired,
  answerText: PropTypes.string,
  place: PropTypes.string.isRequired,
};

QuestionCard.defaultProps = {
  anchor: '',
  answerText: '',
};

export default QuestionCard;
