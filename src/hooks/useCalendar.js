import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import formatDate from '../utils/formatDate';

const useCalendar = (events) => {
  const [months, setMonths] = useState([]);
  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    const resetMonths = (dates) => {
      const dmonths = dates
        .filter((date) => currentUser?.city === date.city)
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
};
export default useCalendar;
