import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MoviesListHome } from './Home.slyled';
import { MoviesItemHome } from './Home.slyled';
export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMoviesArray() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=bac142108808b211e4312acd17e6d409`
        );

        setMovies(response.data.results);
      } catch (error) {}
    }
    getMoviesArray();
  }, []);

  return (
    <MoviesListHome>
      {movies.map(movie => (
        <MoviesItemHome key={movie.id}>
          <Link to={`movies/${movie.id}`}>
            <h2 style={{ fontSize: 10 }}>{movie.name || movie.title}</h2>
          </Link>
        </MoviesItemHome>
      ))}
    </MoviesListHome>
  );
}
