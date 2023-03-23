import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Notiflix from 'notiflix';
import { MoviesList, MoviesItem } from './Movies.styled';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const location = useLocation();
  // const backLinkHref = location.state?.from ?? '/movies';
  useEffect(() => {
    if (query === '') return;

    async function getMoviesArrayByName() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=bac142108808b211e4312acd17e6d409&language=en-US&page=1&include_adult=false&query=${query}`
        );

        onResolve(response.data.results);
      } catch (error) {}
    }
    getMoviesArrayByName();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    if (form.elements.query.value === '') {
      Notiflix.Notify.failure('Pleace enter movie name');
      return setSearchParams({});
    }

    setSearchParams({ query: form.elements.query.value });
    form.reset();
    setMovies([]);
  };

  const onResolve = data => {
    if (data.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no movies your search query. Please try again.'
      );

      return;
    }
    const movie = data.map(({ id, title, name }) => ({
      id,
      name,
      title: title,
    }));
    setMovies(movie);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          placeholder="Enter movie name"
          autoComplete="off"
        />
        <button type="submit">Search</button>
      </form>
      <MoviesList>
        {movies.map(({ id, name, title }) => (
          <MoviesItem key={id}>
            <Link to={`${id}`} state={{ from: location }}>
              <h2 style={{ fontSize: 10 }}>{name || title}</h2>
            </Link>
          </MoviesItem>
        ))}
      </MoviesList>
    </div>
  );
};
export default Movies;
