import { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import Api from '../../../utils/api';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import QuestionCard from '../../Cards/QuestionCard/QuestionCard';
import QuestionsContainer from '../../Containers/QuestionsContainer/QuestionsContainer';
import QuestionsForm from '../../Cards/QuestionsForm/QuestionsForm';
import Heading from '../../UI/Heading/Heading';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
import tagsFilter from '../../../utils/filtering';
import './QuestionsPage.css';

const QuestionsPage = () => {
  const currentUser = useContext(CurrentUserContext);
  const [params, setParams] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [didAsk, setDidAsk] = useState(false);
  const { reset } = useForm();
  const tagAll = { name: 'Все', id: 0, slug: '' };
  const onSubmit = (questionData) => {
    Api.postQuestion(questionData).catch((e) => console.log(e));
    setDidAsk(true);
    reset();
  };

  useEffect(() => {
    Api.getQuestionsTags()
      .then((tagsResp) => {
        tagsResp.unshift(tagAll);
        setTagList(tagsResp);
        setActiveTags([tagAll]);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    Api.getQuestions(params.join())
      .then((questionResp) => {
        setQuestions(questionResp);
      })
      .catch(console.log);
  }, [params]);

  const handleTagFilter = (tag) => {
    tagsFilter(tag, activeTags, setParams, setActiveTags);
  };

  return (
    <>
      <section className="content main__section">
        <Helmet>
          <title>Вопросы</title>
          <meta name="description" content="questions" />
        </Helmet>
        <Heading>Ответы на вопросы</Heading>
        <div className="scroll-container">
          <ScrollContainer list={tagList} activeItems={activeTags} onClick={handleTagFilter} />
        </div>
        <QuestionsContainer place="questions">
          {questions.map(({ question, answer, tag, id }) => (
            <QuestionCard
              path={id}
              title={question}
              tags={tag}
              answerText={answer}
              place="questions"
              key={id}
            />
          ))}
        </QuestionsContainer>
        {currentUser && <QuestionsForm didAsk={didAsk} onSubmit={onSubmit} />}
      </section>
    </>
  );
};

export default QuestionsPage;
