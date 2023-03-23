import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Review = () => {
  const [review, setReview] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    async function getReviewById() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=bac142108808b211e4312acd17e6d409&language=en-US&page=1`
        );
        onResolve(response.data.results);
      } catch (error) {}
    }
    getReviewById();
  }, [movieId]);

  const onResolve = responce => {
    const moviReview = responce.map(({ id, author, content }) => ({
      id,
      author,
      content,
    }));
    setReview(moviReview);
  };

  return (
    <>
      {review.length === 0 ? (
        <p>We don't have any reviews for this movies</p>
      ) : (
        <div>
          {review.map(({ id, author, content }) => (
            <div key={id}>
              <ul>
                <li>
                  <p>{author}</p>
                  <p>{content}</p>
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default Review;
