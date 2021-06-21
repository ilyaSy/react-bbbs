import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function useQuestionsTags() {
  const [tagList, setTagList] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    Api.getQuestions()
      .then((response) => {
        const data = response.results;
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

  return { questions, tagList };
}
