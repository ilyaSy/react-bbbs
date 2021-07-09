import PropTypes from 'prop-types';
import Button from '../Button/Button';

export default function ScrollContainer({
  list,
  activeItems,
  onClick,
  sectionClass,
  sectionSubClass,
}) {
  const setActiveClass = (item) =>
    activeItems.some((activeItem) => activeItem.slug === item.slug)
      ? 'button_color_black_active'
      : '';
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
  activeItems: PropTypes.oneOfType(PropTypes.string),
  list: PropTypes.oneOfType(PropTypes.any),
  sectionClass: PropTypes.string,
  sectionSubClass: PropTypes.string,
};

ScrollContainer.defaultProps = {
  list: [],
  activeItems: [],
  sectionClass: 'buttons-scroll',
  sectionSubClass: '',
};
