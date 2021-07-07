import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function useRights() {
  const [rights, setRights] = useState([]);
  const [tags, setTags] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    Promise.all([Api.getRights(), Api.getRightsTags()])
      .then(([rightsData, tagsData]) => {
        setRights(rightsData.results);
        setTags(tagsData);
        setPageCount(rightsData.count);
      })
      .catch(console.log);
  }, []);

  return { rights, tags, pageCount };
}
