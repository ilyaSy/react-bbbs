import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function useMoviesGenres() {
  const [moviesData, setMoviesData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    Promise.all([Api.getMovies(), Api.getMoviesTags()])
      .then(([movies, tags]) => {
        setMoviesData(movies.results);
        tags.unshift({ name: 'Все', id: 0 });
        setGenres(tags);
        setPageCount(movies.totalPages);
      })
      .catch(console.log);
  }, []);

  return { moviesData, genres, pageCount };
}
