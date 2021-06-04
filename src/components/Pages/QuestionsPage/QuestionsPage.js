import { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Api from '../../../utils/api';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import QuestionCard from '../../Cards/QuestionCard/QuestionCard';
import QuestionsContainer from '../../Containers/QuestionsContainer/QuestionsContainer';
import Heading from '../../UI/Heading/Heading';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
import {
  setActiveFilters,
  filterItemByFiltersList,
  getMultipleTagsIndex,
} from '../../../utils/filters';
import './QuestionsPage.css';

const QuestionsPage = () => {
  const currentUser = useContext(CurrentUserContext);
  const [activeTags, setActiveTags] = useState(['Все']);
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
        const qs = data.map((q) => ({
          tagNames: q.tags.map((tag) => tag.name),
          ...q,
        }));
        setQuestions(qs);

        const tagsData = qs
          .map((q) => q.tagNames)
          .flat()
          .filter((item, i, arr) => arr.indexOf(item) === i);

        setTagList(['Все', ...tagsData]);
      })
      .catch(console.log);
  }, []);

  const handleTagFilter = (tag) => {
    setActiveTags(setActiveFilters(activeTags, tag));
  };

  return (
    <>
      <section className="content main__section">
        <Heading>Ответы на вопросы</Heading>
        <div className="scroll-container">
          <ScrollContainer list={tagList} activeItems={activeTags} onClick={handleTagFilter} />
        </div>
        <QuestionsContainer place="questions">
          {questions
            .filter((q) => filterItemByFiltersList(activeTags, q.tagNames))
            .sort(
              (a, b) =>
                getMultipleTagsIndex(activeTags, a.tagNames) >
                getMultipleTagsIndex(activeTags, b.tagNames)
            )
            .map(({ title, answerText, tags, id }) => (
              <QuestionCard
                path={id}
                title={title}
                tags={tags}
                answerText={answerText}
                place="questions"
                key={id}
              />
            ))}
        </QuestionsContainer>
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
