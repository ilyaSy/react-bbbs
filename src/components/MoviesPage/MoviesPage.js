import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Api from '../../utils/api';
import Button from '../Button/Button';
import Movie from '../Movie/Movie';
import './MoviesPage.css';

const MoviesPage = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState('Все');
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 16;
  const offset = currentPage * perPage;
  let pageCount;

  useEffect(() => {
    Api.getMovies()
      .then((data) => {
        setMoviesData(data);
        // Список уникальных жанров для кнопок фильтра-рубрикатора
        const genresData = data
          .map((movie) => movie.tags)
          .flat()
          .map((tag) => tag.name)
          .filter((item, i, arr) => arr.indexOf(item) === i);
        setGenres(['Все', ...genresData]);
        // Подсчёт кол-ва страниц: округление частного общего кол-ва на кол-во на одной странице
        pageCount = Math.ceil(data.length / perPage);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  const currentPageData = moviesData
    .slice(offset, offset + perPage)
    .filter((movie) => {
      const tagTexts = movie.tags.map((tag) => tag.name);
      return activeGenre === 'Все' || tagTexts.includes(activeGenre);
    })
    .map(({ tags, title, info, imageUrl, link, id }) => (
      <Movie
        type="movie"
        tags={tags}
        title={title}
        info={info}
        imageUrl={imageUrl}
        link={link}
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
    <section className="filmpage content main__section">
      <h1 className="heading">Фильмы</h1>
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
      <ul className="filmpage__list">{currentPageData}</ul>
      <ReactPaginate
        previousLabel=""
        nextLabel=""
        pageCount={pageCount}
        marginPagesDisplayed={1}
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

export default MoviesPage;
