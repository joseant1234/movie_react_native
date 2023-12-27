import { useEffect, useState } from "react";
import movieDB from "../api/movieDB";
import { MovieFull } from "../interfaces/movie";
import { Cast, CreditsResponse } from "../interfaces/credits";

interface MovieDetails {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {

    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: [],
    });

    const getMovieDetails = async() => {
        const movieDetailsPromise = movieDB.get<MovieFull>(`/${movieId}`);
        const castsPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);

        const [movieDetailsResp, castResp] = await Promise.all([
            movieDetailsPromise,
            castsPromise,
        ]);

        setState({
            isLoading: false,
            movieFull: movieDetailsResp.data,
            cast: castResp.data.cast,
        })
    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    return {
        ...state,
    }
}

