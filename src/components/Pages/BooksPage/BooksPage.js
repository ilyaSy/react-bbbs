import { useState } from 'react';
import { Helmet } from 'react-helmet';
import BookCard from '../../Cards/BookCard/BookCard';
import Heading from '../../UI/Heading/Heading';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
import Pagination from '../../UI/Pagination/Pagination';
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

  const handleGenreFilter = (genre) => {
    if (activeGenre && activeGenre === genre) {
      setActiveGenre('Все');
    } else {
      setActiveGenre(genre);
    }
  };

  return (
    <section className="bookpage content main__section">
      <Helmet>
        <title>Книги</title>
        <meta name="description" content="books" />
      </Helmet>
      <Heading>Книги</Heading>
      <div className="scroll-container">
        <ScrollContainer list={genres} activeItem={activeGenre} onClick={handleGenreFilter} />
      </div>
      <ul className="bookpage__list">{currentPageData}</ul>
      <Pagination pageCount={pageCount} setCurrentPage={setCurrentPage} />
    </section>
  );
};

export default BooksPage;
