import PropTypes from 'prop-types';
import Button from '../Button/Button';

export default function ScrollContainer({
  list,
  activeItem,
  onClick,
  sectionClass,
  sectionSubClass,
}) {
  return (
    <div className={`${sectionClass} ${sectionSubClass}`}>
      {list.map((item) => (
        <Button
          className={`button button_color_black button_place_scroll ${
            item === activeItem && 'button_color_black_active'
          }`}
          type="button"
          key={item}
          onClick={() => onClick(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}

ScrollContainer.propTypes = {
  onClick: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
  list: PropTypes.oneOfType(PropTypes.any),
  sectionClass: PropTypes.string,
  sectionSubClass: PropTypes.string,
};

ScrollContainer.defaultProps = {
  list: [],
  activeItem: '',
  sectionClass: 'buttons-scroll',
  sectionSubClass: '',
};
