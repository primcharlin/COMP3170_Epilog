import { useNavigate } from 'react-router-dom';

function BasicMovieCard({ image, title, addToWatchlist, movieId }) {
    const navigate = useNavigate();

    const handleImageClick = () => {
        if (movieId !== undefined) {
            navigate(`/movie/${movieId}`);
        }
    };

    return (
      <div className="basic-movie-card">
        <img 
          src={image} 
          alt={title} 
          className="movie-img" 
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        />
        <p className="movie-title">{title}</p>
        <button className="add-btn" onClick={addToWatchlist}>Add to Watchlist</button>
      </div>
    );
  }
  
  export default BasicMovieCard;