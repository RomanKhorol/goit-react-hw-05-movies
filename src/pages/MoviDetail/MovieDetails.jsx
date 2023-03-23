import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { BackLink } from 'components/BackLink';
import axios from 'axios';

import { MoviDetailContainer } from './MovieDetail.styled';
export default function MovieDetails() {
  const [movie, setMovie] = useState({});
  const location = useLocation();
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
      <BackLink to={location.state.from}>Back to products</BackLink>
      <div>
        {movie.img && (
          <img
            src={`https://image.tmdb.org/t/p/w200` + movie.img}
            alt="Pictures"
          />
        )}
        <h2>{movie.title}</h2>
        {movie.voteAverage && <p>User scope:{movie.voteAverage}%</p>}
        <h2>Overview</h2>
        <p>{movie.overview || `There's no overveiw`}</p>
        <h2>Genres</h2>
        {movie.genres ? (
          <p>{movie.genres}</p>
        ) : (
          `There not information about genres`
        )}
      </div>
      <h3>Additional information</h3>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Review</Link>
        </li>
      </ul>
      <Outlet />
    </MoviDetailContainer>
  );
}
