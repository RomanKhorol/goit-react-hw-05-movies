import { Link, Outlet, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MoviDetailContainer } from './MovieDetail.styled';
export default function MovieDetails() {
  const [movie, setMovie] = useState('');
  const [genres, setGenres] = useState('');

  const { movieId } = useParams();

  useEffect(() => {
    async function getMoviesById() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=bac142108808b211e4312acd17e6d409&language=en-US`
        );
        setMovie(response.data);

        const genreses = movie.genres;
        console.log(genreses);
        const allGenres = genreses.map(genre => genre.name).join();
        setGenres(allGenres);
      } catch (error) {}
    }
    getMoviesById();
  }, [movieId]);

  const scope = Math.round(movie.popularity);

  const url = movie.poster_path;
  return (
    <MoviDetailContainer>
      <div>
        <img src={`https://image.tmdb.org/t/p/w200${url}`} alt="Pictures" />
        <h2>{movie.original_title}</h2>
        <p>User scope:{scope}%</p>
        <h2>Overview</h2>
        <p>{movie.overview || `There's no overveiw`}</p>
        <h2>Genres</h2>
        <p>{genres}</p>
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
