import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function useQuestionsTags() {
  const [tagList, setTagList] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    Promise.all([Api.getQuestions(), Api.getQuestionsTags()])
      .then(([questionResp, tagsResp]) => {
        const qs = questionResp.results;
        setQuestions(qs);
        setTagList(tagsResp);
      })
      .catch(console.log);
  }, []);

  return { questions, tagList };
}
