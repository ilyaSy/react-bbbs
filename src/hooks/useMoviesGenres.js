import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function useMoviesGenres({ perPage }) {
  const [moviesData, setMoviesData] = useState([]);
  const [genres, setGenres] = useState([]);
  let pageCount;

  useEffect(() => {
    Api.getMovies()
      .then((data) => {
        const movies = data.map((movie) => ({
          tagNames: movie.tags.map((tag) => tag.name),
          ...movie,
        }));
        setMoviesData(movies);
        // Список уникальных жанров для кнопок фильтра-рубрикатора

        const genresData = movies
          .map((movie) => movie.tagNames)
          .flat()
          .filter((item, i, arr) => arr.indexOf(item) === i);
        setGenres(['Все', ...genresData]);
        // Подсчёт кол-ва страниц: округление частного общего кол-ва на кол-во на одной странице
        pageCount = Math.ceil(movies.length / perPage);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  return { moviesData, genres, pageCount };
}
