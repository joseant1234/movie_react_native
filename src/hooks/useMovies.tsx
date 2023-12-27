import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';
import { Movie, MovieDBMoviesResponse } from '../interfaces/movie';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const useMovies = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [movieState, setMovieState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });

  const getMovies = async() => {
    const resps = await Promise.all([
      movieDB.get<MovieDBMoviesResponse>('/now_playing'),
      movieDB.get<MovieDBMoviesResponse>('/popular'),
      movieDB.get<MovieDBMoviesResponse>('/top_rated'),
      movieDB.get<MovieDBMoviesResponse>('/upcoming'),
    ]);

    setMovieState({
      nowPlaying: resps[0].data.results,
      popular: resps[1].data.results,
      topRated: resps[2].data.results,
      upcoming: resps[3].data.results,
    });

    setIsLoading(false);
  }

  useEffect(() => {
    // now_playing
    getMovies();
  }, []);



  return {
    ...movieState,
    isLoading,
  };
};

