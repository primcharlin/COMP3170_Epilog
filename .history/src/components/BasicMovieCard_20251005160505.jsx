function BasicMovieCard({ image, title, addToWatchlist, trailer }) {
    return (
      <div className="basic-movie-card">
        <img src={image} alt={title} className="movie-img" />
        <p className="movie-title">{title}</p>
        <button className="add-btn" onClick={addToWatchlist}>Add</button>
        <a href={trailer} className="trailer-btn" target="_blank">
          Trailer
        </a>
      </div>
    );
  }
  
  export default BasicMovieCard;