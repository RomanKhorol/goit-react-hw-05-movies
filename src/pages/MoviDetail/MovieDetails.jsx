import { Link, Outlet } from 'react-router-dom';
import { MoviDetailContainer } from './MovieDetail.styled';
export default function MovieDetails() {
  return (
    <MoviDetailContainer>
      <div>
        <img src="" alt="" />
        <h2>Move name</h2>
        <p>User scope:</p>
        <h2>Overview</h2>
        <p>text</p>
        <h2>Genres</h2>
        <p>text</p>
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
