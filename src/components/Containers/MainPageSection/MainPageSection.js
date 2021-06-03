import PropTypes from 'prop-types';
import './MainPageSection.css';

const MainPageSection = ({ className, children }) => (
  <section className={className}>{children}</section>
);

MainPageSection.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default MainPageSection;
