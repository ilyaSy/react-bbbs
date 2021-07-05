import { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import Api from '../../../utils/api';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import QuestionCard from '../../Cards/QuestionCard/QuestionCard';
import QuestionsContainer from '../../Containers/QuestionsContainer/QuestionsContainer';
import QuestionsForm from '../../Cards/QuestionsForm/QuestionsForm';
import Heading from '../../UI/Heading/Heading';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
// import {
//   setActiveFilters,
//   filterItemByFiltersList,
//   getMultipleTagsIndex,
// } from '../../../utils/filters';
import useQuestionsTags from '../../../hooks/useQuestionsTags';
import './QuestionsPage.css';

const QuestionsPage = () => {
  const currentUser = useContext(CurrentUserContext);
  const { questions, tagList } = useQuestionsTags();
  const [activeTags, setActiveTags] = useState(tagList[0]);
  const [didAsk, setDidAsk] = useState(false);
  const { reset } = useForm();
  console.log(activeTags);

  const onSubmit = (questionData) => {
    Api.postQuestion(questionData).catch((e) => console.log(e));
    setDidAsk(true);
    reset();
  };

  const handleTagFilter = (tag) => {
    // setActiveTags(setActiveFilters(activeTags, tag));
    setActiveTags(tag);
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
          {questions
            // .filter((q) => filterItemByFiltersList(activeTags, q.tagNames))
            // .sort(
            //   (a, b) =>
            //     getMultipleTagsIndex(activeTags, a.tagNames) >
            //     getMultipleTagsIndex(activeTags, b.tagNames)
            // )
            .map(({ question, answer, tag, id }) => (
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
