import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';
import { Movie, MovieDBNowPlaying } from '../interfaces/movie';

export const useMovies = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [moviesAtTheCinema, setMoviesAtTheCinema] = useState<Movie[]>([]);

  const getMovies = async() => {
    const resp = await movieDB.get<MovieDBNowPlaying>('/now_playing');
    setMoviesAtTheCinema(resp.data.results);
    setIsLoading(false);
  }

  useEffect(() => {
    // now_playing
    getMovies();
  }, []);

  return {
    moviesAtTheCinema,
    isLoading,
  };
};

