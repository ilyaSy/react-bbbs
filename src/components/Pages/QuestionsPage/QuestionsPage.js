import { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Api from '../../../utils/api';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import QuestionCard from '../../Cards/QuestionCard/QuestionCard';
import QuestionsContainer from '../../Containers/QuestionsContainer/QuestionsContainer';
import QuestionsForm from '../../Cards/QuestionsForm/QuestionsForm';
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

  const { reset } = useForm();

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
        {currentUser && activeTags.includes('Все') && (
          <QuestionsForm didAsk={didAsk} onSubmit={onSubmit} />
        )}
      </section>
    </>
  );
};

export default QuestionsPage;
