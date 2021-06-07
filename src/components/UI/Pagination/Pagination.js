import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = ({ pageCount, setCurrentPage }) => {
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      containerClassName="pagination"
      nextClassName="pagination__forward"
      nextLinkClassName="pagination__link_forward"
      breakClassName="pagination__link"
      pageLinkClassName="pagination__link"
      activeClassName="pagination__link_active"
      disabledClassName="pagination_disabled"
      onPageChange={handlePageClick}
    />
  );
};

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
