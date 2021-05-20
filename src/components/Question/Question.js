import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Question.css';
import '../App/App.css';
import Tag from '../Tag/Tag';
import Button from '../Button/Button';

const Question = ({ path, title, tags, place }) => {
  const tagsText = tags.map((tag) => tag.name);
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
            <Link to={`/questions${path}`} className="mainlink" />
            <h3 className="question__title">{title}</h3>
            <div className="question__tags">
              {tags.map((tagText) => (
                <Tag key={tagText} modifier="tag_theme_white" tagText={tagText} />
              ))}
            </div>
          </div>
          <Button className="question__btn" />
        </li>
      )}
    </>
  );
};

// TO DO:
// * логика на кнопке добавления статьи / вопроса авторизованным юзером
// * пути к статьям / вопросам

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
