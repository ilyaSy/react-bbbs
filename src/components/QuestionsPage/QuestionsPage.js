import { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Api from '../../utils/api';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Button from '../Button/Button';
import Question from '../Question/Question';
import './QuestionsPage.css';

const QuestionsPage = () => {
  const currentUser = useContext(CurrentUserContext);
  const [activeTag, setActiveTag] = useState('Все');
  const [questions, setQuestions] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [didAsk, setDidAsk] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (questionData) => {
    console.log(questionData);
    setDidAsk(true);
    reset();
  };

  useEffect(() => {
    Api.getQuestions()
      .then((data) => {
        const tagsData = data
          .map((q) => q.tags)
          .flat()
          .filter((item, i, arr) => arr.indexOf(item) === i);
        setQuestions(data);
        setTagList([{ id: 'tag1', name: 'Все' }, ...tagsData]);
      })
      .catch(console.log);
  }, []);

  const handleTagFilter = (tag) => {
    if (activeTag === tag) {
      setActiveTag('Все');
    } else {
      setActiveTag(tag);
    }
  };

  return (
    <>
      <section className="content main__section">
        <h1 className="heading">Ответы на вопросы</h1>
        <div className="scroll-container">
          <div className="buttons-scroll">
            {tagList.map((tag) => (
              <Button
                className={`button button_color_black button_place_scroll ${
                  tag.name === activeTag ? 'button_color_black_active' : ''
                }`}
                onClick={() => handleTagFilter(tag.name)}
                type="button"
                key={tag.id}
              >
                {tag.name}
              </Button>
            ))}
          </div>
        </div>
        <ul className="questions questions__page-list">
          {questions
            .filter((q) => {
              const tagTexts = q.tags.map((tag) => tag.name);
              return activeTag === 'Все' || tagTexts.includes(activeTag);
            })
            .map(({ title, answerText, tags, id }) => (
              <Question
                path={id}
                title={title}
                tags={tags}
                answerText={answerText}
                place="questions"
                key={id}
              />
            ))}
        </ul>
        {currentUser && (
          <>
            <form
              className={`questions__form ${didAsk ? 'questions__form_hidden' : ''}`}
              name="ask"
              action="/"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h3 className="questions__form-heading">
                Если вы не нашли ответ на свой вопрос — напишите нам, и мы включим его в&nbsp;список
              </h3>
              <div className="questions__ask">
                <input
                  className={`questions__input ${
                    errors.questionText ? 'questions__input_error' : ''
                  }`}
                  type="text"
                  {...register('questionText', {
                    required: 'Задайте свой вопрос',
                    minLength: {
                      value: 2,
                      message: 'Текст вопроса должен быть не менее 2 символов',
                    },
                  })}
                  id="askme"
                  placeholder={errors.questionText ? errors.questionText.message : 'Введите вопрос'}
                />
                <button type="submit" className="button">
                  Отправить
                </button>
              </div>
            </form>

            <p className={`questions__result ${!didAsk ? 'questions__form_hidden' : ''}`}>
              Спасибо! Мы приняли ваш вопрос.
            </p>
          </>
        )}
      </section>
    </>
  );
};

export default QuestionsPage;
