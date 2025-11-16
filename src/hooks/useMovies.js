import { useState, useEffect } from 'react';
import { getMultipleMovieDetails, searchMovies, transformMovieData } from '../services/watchmodeApi';

// Use API search terms to discover movies - these are generic search terms that will return movies from the API
const API_SEARCH_TERMS = [
  'comedy',
  'action',
  'drama',
  'thriller',
  'romance',
  'adventure',
  'sci-fi',
  'horror',
  'fantasy',
  'animation',
];

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Search for movies using API search terms
        const searchPromises = API_SEARCH_TERMS.map(term => 
          searchMovies(term).catch(() => [])
        );
        
        const searchResults = await Promise.all(searchPromises);
        
        // Extract unique title IDs from search results
        const titleIds = new Set();
        searchResults.forEach((results) => {
          if (Array.isArray(results) && results.length > 0) {
            // Take top 3 results from each search to get variety
            results.slice(0, 3).forEach(result => {
              // WatchMode API returns different field names, try multiple possibilities
              if (result) {
                const id = result.id || result.tmdb_id || result.imdb_id || result.watchmode_id;
                if (id) {
                  titleIds.add(id.toString());
                }
              }
            });
          }
        });
        
        console.log(`Found ${titleIds.size} unique movies from API search`);
        
        // If we have title IDs, fetch their details
        let movieDetails = [];
        if (titleIds.size > 0) {
          const titleIdArray = Array.from(titleIds).slice(0, 30); // Limit to 30 movies
          console.log(`Fetching details for ${titleIdArray.length} movies from API...`);
          movieDetails = await getMultipleMovieDetails(titleIdArray);
        } else {
          // Fallback: use the provided titleId if search fails
          console.log('No movies found from API search, using fallback titleId');
          movieDetails = await getMultipleMovieDetails(['345534']);
        }
        
        const transformedMovies = movieDetails.map(transformMovieData);
        
        // Add a "No Movie Found" placeholder at the beginning
        const moviesWithPlaceholder = [
          {
            title: "No Movie Found",
            image: "images/NoMovie.avif",
            trailer: "",
            description: ""
          },
          ...transformedMovies
        ];
        
        setMovies(moviesWithPlaceholder);
      } catch (err) {
        console.error('Error fetching movies from API:', err);
        setError(err.message);
        // Fallback to empty array with placeholder
        setMovies([{
          title: "No Movie Found",
          image: "images/NoMovie.avif",
          trailer: "",
          description: ""
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};

export default useMovies;

