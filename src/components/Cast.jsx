import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Cast() {
  const [movieInfo, setMovieInfo] = useState([]);

  const { movieId } = useParams();
  useEffect(() => {
    async function getCastById() {
      try {
        const response = await axios.get(
          `
https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=bac142108808b211e4312acd17e6d409&language=en-US`
        );
        onResolve(response.data.cast);
      } catch (error) {}
    }
    getCastById();
  }, [movieId]);
  const onResolve = responce => {
    const movie = responce.map(
      ({ cast_id, profile_path, character, name }) => ({
        id: cast_id,
        img: profile_path,
        character: character,
        name,
      })
    );
    setMovieInfo(movie);
  };
  return (
    <div>
      {movieInfo.map(({ id, img, character, name }) => (
        <div key={id}>
          {img ? (
            <img src={`https://image.tmdb.org/t/p/w200` + img} alt="" />
          ) : (
            <img src={`https://via.placeholder.com/200x300`} alt="" />
          )}
          <ul>
            <li>
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
