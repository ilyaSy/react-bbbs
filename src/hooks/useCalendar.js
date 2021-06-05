import { useState, useEffect } from 'react';
import formatDate from '../utils/formatDate';

export default function useArticles({ events = [] }) {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const resetMonths = (dates) => {
      const dmonths = dates
        .map((date) => {
          const monthName = formatDate(new Date(date.startAt), 'LLLL');
          return monthName[0].toUpperCase() + monthName.slice(1);
        })
        .filter((el, i, array) => array.indexOf(el) === i);
      return dmonths;
    };

    setMonths(resetMonths(events));
  }, []);

  return { months };
}
