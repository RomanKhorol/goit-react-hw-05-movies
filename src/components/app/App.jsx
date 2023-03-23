import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Navigation, LinkNav, Container } from './app.styled';

const Home = lazy(() => import('../../pages/Home/Home'));
const Movies = lazy(() => import('../../pages/Movies/Movies'));
const NotFound = lazy(() => import('pages/NotFound'));
const MovieDetails = lazy(() => import('../../pages/MoviDetail/MovieDetails'));
const Cast = lazy(() => import('../Cast'));
const Reviews = lazy(() => import('../Reviews'));

export const App = () => {
  return (
    <Container>
      <header>
        <Navigation>
          <LinkNav to="/">Home</LinkNav>
          <LinkNav to="/movies">Movies</LinkNav>
        </Navigation>
      </header>
      <div
        style={{
          marginTop: '20px',

          color: '#010101',
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Container>
  );
};
