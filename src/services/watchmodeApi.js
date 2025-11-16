const apiKey = 'F42ijU6iFSl4YAIFlUnC5riPvC9ipjSSmGQve3Jj';

/**
 * Get movie details by title ID
 * @param {string} titleId - The WatchMode title ID
 * @returns {Promise<Object>} Movie details
 */
export const getMovieDetails = async (titleId) => {
  try {
    const url = `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=${apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

/**
 * Search for movies by title
 * @param {string} searchTerm - The search term
 * @returns {Promise<Array>} Array of movie results
 */
export const searchMovies = async (searchTerm) => {
  try {
    const url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${apiKey}&search_value=${encodeURIComponent(searchTerm)}&search_type=2`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const json = await response.json();
    return json.results || [];
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

/**
 * Get multiple movie details by title IDs
 * @param {Array<string>} titleIds - Array of WatchMode title IDs
 * @returns {Promise<Array>} Array of movie details
 */
export const getMultipleMovieDetails = async (titleIds) => {
  try {
    const promises = titleIds.map(id => getMovieDetails(id));
    const results = await Promise.allSettled(promises);
    
    return results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);
  } catch (error) {
    console.error('Error fetching multiple movie details:', error);
    throw error;
  }
};

/**
 * Transform WatchMode API response to match app's movie format
 * @param {Object} apiData - WatchMode API response
 * @returns {Object} Transformed movie object
 */
export const transformMovieData = (apiData) => {
  // Handle genre data - could be array of objects or array of strings
  let genres = [];
  if (apiData.genres && Array.isArray(apiData.genres)) {
    genres = apiData.genres.map(genre => 
      typeof genre === 'string' ? genre : (genre.name || genre)
    );
  }

  return {
    title: apiData.title || apiData.name || 'Unknown Title',
    image: apiData.poster || apiData.poster_url || apiData.backdrop || apiData.backdrop_url || '/images/NoMovie.avif',
    trailer: apiData.trailer || apiData.trailer_url || '',
    description: apiData.plot_overview || apiData.description || apiData.overview || '',
    year: apiData.year || apiData.release_date?.substring(0, 4) || '',
    imdb_rating: apiData.imdb_rating || apiData.ratings?.imdb || '',
    tmdb_rating: apiData.tmdb_rating || apiData.ratings?.tmdb || apiData.user_rating || '',
    genres: genres,
    runtime_minutes: apiData.runtime_minutes || apiData.runtime || '',
    watchmode_id: apiData.id || apiData.tmdb_id || apiData.imdb_id || ''
  };
};

