import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Api from '../../utils/api';
import Book from '../Book/Book';
import Button from '../Button/Button';
import './BooksPage.css';

const BooksPage = () => {
  const [booksData, setBooksData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState('Все');
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 16;
  const offset = currentPage * perPage;
  let pageCount;

  useEffect(() => {
    Api.getBooks()
      .then((data) => {
        const scienceBooks = data.filter((book) => book.genre === 'Научные');
        const fictionBooks = data.filter((book) => book.genre === 'Художественные');
        // по фильтру "Все" книги выходят в порядке научная - художественная - науч - худ и т.д.
        const orderedBookList = scienceBooks
          .map((sb, i) => [sb, fictionBooks[i]])
          .flat()
          .filter((book) => book);
        setBooksData(orderedBookList);
        // список уникальных жанров для кнопок фильтра-рубрикатора
        const genresData = data
          .map((item) => item.genre)
          .filter((item, i, arr) => arr.indexOf(item) === i);
        setGenres(['Все', ...genresData]);
        // подсчёт кол-ва страниц: округляем частное общего кол-ва книг на кол-во книг на одной странице
        pageCount = Math.ceil(data.length / perPage);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  const currentPageData = booksData
    .slice(offset, offset + perPage)
    .filter((book) => activeGenre === 'Все' || activeGenre === book.genre)
    .map(({ title, author, year, description, genre, id }) => (
      <Book
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
      <h1 className="heading">Книги</h1>
      <div className="buttons-scroll buttons-scroll_centered">
        {genres.map((genre) => (
          <Button
            className={`button button_color_black button_place_scroll ${
              genre === activeGenre ? 'button_color_black_active' : ''
            }`}
            type="button"
            key={genre}
            onClick={() => handleGenreFilter(genre)}
          >
            {genre}
          </Button>
        ))}
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
