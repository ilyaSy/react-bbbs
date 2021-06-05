import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import BookCard from '../../Cards/BookCard/BookCard';
import Heading from '../../UI/Heading/Heading';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
import useBooksGenres from '../../../hooks/useBooksGenres';
import './BooksPage.css';

const BooksPage = () => {
  const [activeGenre, setActiveGenre] = useState('Все');
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 16;
  const offset = currentPage * perPage;
  const { booksData, genres, pageCount } = useBooksGenres(perPage);

  const currentPageData = booksData
    .slice(offset, offset + perPage)
    .filter((book) => activeGenre === 'Все' || activeGenre === book.genre)
    .map(({ title, author, year, description, genre, id }) => (
      <BookCard
        title={title}
        author={author}
        year={year}
        description={description}
        genre={genre}
        key={id}
      />
    ));

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleGenreFilter = (genre) => {
    if (activeGenre && activeGenre === genre) {
      setActiveGenre('Все');
    } else {
      setActiveGenre(genre);
    }
  };

  return (
    <section className="bookpage content main__section">
      <Heading>Книги</Heading>
      <div className="scroll-container">
        <ScrollContainer list={genres} activeItem={activeGenre} onClick={handleGenreFilter} />
      </div>
      <ul className="bookpage__list">{currentPageData}</ul>
      <ReactPaginate
        previousLabel=""
        nextLabel=""
        pageCount={pageCount}
        marginPagesDisplayed={0}
        pageRangeDisplayed={5}
        containerClassName="pagination"
        breakClassName="pagination__link"
        breakLabel="..."
        activeClassName="pagination__link_active"
        nextClassName="pagination__forward"
        pageLinkClassName="pagination__link"
        onPageChange={handlePageClick}
      />
    </section>
  );
};

export default BooksPage;
