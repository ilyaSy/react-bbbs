import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Question.css';
import '../App/App.css';
import Tag from '../Tag/Tag';
import Button from '../Button/Button';

const Question = ({ path, title, tags, place }) => {
  const tagsText = tags.map((tag) => tag.name);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const handleToggleAnswer = () => {
    setIsAnswerVisible(!isAnswerVisible);
  };

  return (
    <>
      {place === 'main' && (
        <li className="question">
          <Link to={`/questions${path}`} className="mainlink" />
          <h3 className="question__title">{title}</h3>
          <div className="question__tags">
            {tagsText.map((tagText) => (
              <Tag key={tagText} modifier="tag_theme_white" tagText={tagText} />
            ))}
          </div>
        </li>
      )}
      {place === 'questions' && (
        <li className="question__flex">
          <div className="question">
            <h3 className="question__title" onClick={handleToggleAnswer} aria-hidden="true">
              {title}
            </h3>
            <div className="question__tags">
              {tagsText.map((tagText) => (
                <Tag key={tagText} modifier="tag_theme_white" tagText={tagText} />
              ))}
            </div>
            {isAnswerVisible && <p>Здесь будет появляться ответ на вопрос</p>}
          </div>
          <Button className="question__btn" onClick={handleToggleAnswer} />
        </li>
      )}
    </>
  );
};

// TO DO:
// * вставить разметку ответа (не готова)
// * добавить ответ в данные

Question.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.any).isRequired,
  place: PropTypes.string.isRequired,
};

Question.defaultProps = {
  path: '',
};

export default Question;
