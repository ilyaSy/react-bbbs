import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import './calendarCardProfile.css';
import formatDate from '../../../utils/formatDate';

const CalendarCardProfile = ({ event, handleCalendarCardClick }) => {
  const { title, startAt } = event;
  const startAtDate = new Date(startAt);

  const day = formatDate(startAtDate, 'dd');
  const monthName = formatDate(startAtDate, 'LLLL');

  const handleCardClick = () => {
    handleCalendarCardClick({
      ...event,
      isOpen: true,
    });
  };

  return (
    <Button
      className="personal-account__event-wrapper calendarCardProfile__button"
      onClick={handleCardClick}
    >
      <div className="personal-account__event-text">
        <h3 className="personal-account__subtitle-date">{day}</h3>
        <p className="personal-account__subtitle-month">{monthName}</p>
      </div>
      <p className="personal-account__subtitle-event">{title}</p>
    </Button>
  );
};
CalendarCardProfile.propTypes = {
  event: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.any),
    ])
  ).isRequired,
  handleCalendarCardClick: PropTypes.func,
};
CalendarCardProfile.defaultProps = {
  handleCalendarCardClick: () => {},
};
export default CalendarCardProfile;
