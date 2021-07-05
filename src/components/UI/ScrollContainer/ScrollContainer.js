import PropTypes from 'prop-types';
import Button from '../Button/Button';

export default function ScrollContainer({
  list,
  activeItem,
  activeItems,
  onClick,
  sectionClass,
  sectionSubClass,
}) {
  const setActiveClass = (item) => {
    if (Array.isArray(activeItems) && activeItems.length && activeItems.includes(item)) {
      return 'button_color_black_active';
    }
    if (activeItem && item === activeItem) {
      return 'button_color_black_active';
    }

    return '';
  };
  console.log(list);
  return (
    <div className={`${sectionClass} ${sectionSubClass}`}>
      {list.map((item) => (
        <Button
          className={`button button_color_black button_place_scroll ${setActiveClass(item)}`}
          type="button"
          key={item.id}
          onClick={() => onClick(item)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
}

ScrollContainer.propTypes = {
  onClick: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
  activeItems: PropTypes.oneOfType(PropTypes.string),
  list: PropTypes.oneOfType(PropTypes.any),
  sectionClass: PropTypes.string,
  sectionSubClass: PropTypes.string,
};

ScrollContainer.defaultProps = {
  list: [],
  activeItem: '',
  activeItems: [],
  sectionClass: 'buttons-scroll',
  sectionSubClass: '',
};
