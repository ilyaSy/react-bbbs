import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function useQuestions() {
  const [tagList, setTagList] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    Promise.all([Api.getQuestions(), Api.getQuestionsTags()])
      .then(([questionResp, tagsResp]) => {
        setQuestions(questionResp);
        tagsResp.unshift({ name: 'Все', id: 0 });
        setTagList(tagsResp);
      })
      .catch(console.log);
  }, []);

  return { questions, tagList };
}
