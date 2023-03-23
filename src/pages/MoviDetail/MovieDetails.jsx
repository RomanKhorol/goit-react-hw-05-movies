import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import React, { useEffect, useState, Suspense } from 'react';
import { useRef } from 'react';
import BackLink from '../../components/Backlink/BackLink';
import axios from 'axios';

import {
  MoviDetailContainer,
  MoviScopeWrapper,
  MoviDetaiWrapper,
} from './MovieDetail.styled';
const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');
  const { movieId } = useParams();

  useEffect(() => {
    async function getMoviesById() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=bac142108808b211e4312acd17e6d409&language=en-US`
        );
        onResolve(response.data);
      } catch (error) {}
    }
    getMoviesById();
  }, [movieId]);

  const onResolve = responce => {
    const dataMovie = {
      img: responce.poster_path,
      title: responce.original_title,

      overview: responce.overview,
      genres: responce.genres
        .map(item => item.name + ', ')
        .join(' ')
        .slice(0, -2),
      voteAverage: (responce.vote_average * 10).toFixed(0),
    };
    setMovie(dataMovie);
  };

  return (
    <MoviDetailContainer>
      <BackLink to={backLinkLocationRef.current}>Back to products</BackLink>
      <MoviDetaiWrapper>
        <div>
          {movie.img && (
            <img
              src={`https://image.tmdb.org/t/p/w200` + movie.img}
              alt="Pictures"
            />
          )}
        </div>
        <div>
          <h2 style={{ marginTop: '0px' }}>{movie.title}</h2>
          {movie.voteAverage && (
            <MoviScopeWrapper>
              <p>User scope: </p>
              <p>{movie.voteAverage}%</p>
            </MoviScopeWrapper>
          )}
          <h2>Overview</h2>
          <p>{movie.overview || `There's no overveiw`}</p>
          <h2>Genres</h2>
          {movie.genres ? (
            <p>{movie.genres}</p>
          ) : (
            `There not information about genres`
          )}
        </div>
      </MoviDetaiWrapper>
      <h3>Additional information</h3>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Review</Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </MoviDetailContainer>
  );
};
export default MovieDetails;
