import PropTypes from 'prop-types';

const CalendarCardLi = ({ classTag, value }) => (
  <li className="calendar__contacts-item">
    <p className={`calendar__${classTag}`}>{value}</p>
  </li>
);

CalendarCardLi.propTypes = {
  classTag: PropTypes.string,
  value: PropTypes.string,
};

CalendarCardLi.defaultProps = {
  classTag: '',
  value: '',
};
export default CalendarCardLi;
