import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function useMoviesGenres(perPage) {
  const [moviesData, setMoviesData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    Api.getMovies()
      .then((data) => {
        const movies = data.map((movie) => ({
          tagNames: movie.tags.map((tag) => tag.name),
          ...movie,
        }));
        setMoviesData(movies);

        const genresData = movies
          .map((movie) => movie.tagNames)
          .flat()
          .filter((item, i, arr) => arr.indexOf(item) === i);
        setGenres(['Все', ...genresData]);

        setPageCount(Math.ceil(movies.length / perPage));
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  return { moviesData, genres, pageCount };
}
