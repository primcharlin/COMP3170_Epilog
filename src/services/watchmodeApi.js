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
      const errorText = await response.text();
      console.error(`API Error for titleId ${titleId} (${response.status}):`, errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`Error fetching movie details for titleId ${titleId}:`, error);
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
    console.log(`Searching movies with term: ${searchTerm}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}):`, errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const json = await response.json();
    console.log(`Search response for "${searchTerm}":`, json);
    
    // Handle different response structures
    if (Array.isArray(json)) {
      return json;
    } else if (json.results && Array.isArray(json.results)) {
      return json.results;
    } else if (json.data && Array.isArray(json.data)) {
      return json.data;
    } else {
      console.warn('Unexpected response structure:', json);
      return [];
    }
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

/**
 * Get genres list from WatchMode API
 * @returns {Promise<Object>} Object mapping genre IDs to genre names
 */
export const getGenres = async () => {
  try {
    const url = `https://api.watchmode.com/v1/genres/?apiKey=${apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error for genres (${response.status}):`, errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const json = await response.json();
    console.log('Genres response:', json);
    
    // Create a map of genre ID to genre name
    const genresMap = {};
    if (Array.isArray(json)) {
      json.forEach(genre => {
        if (genre.id && genre.name) {
          genresMap[genre.id] = genre.name;
        }
      });
    } else if (json.genres && Array.isArray(json.genres)) {
      json.genres.forEach(genre => {
        if (genre.id && genre.name) {
          genresMap[genre.id] = genre.name;
        }
      });
    }
    console.log(`Created genres map with ${Object.keys(genresMap).length} genres`);
    return genresMap;
  } catch (error) {
    console.error('Error fetching genres:', error);
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
 * @param {Object} genresMap - Map of genre IDs to genre names
 * @returns {Object} Transformed movie object
 */
export const transformMovieData = (apiData, genresMap = {}) => {
  // Handle genre data - convert genre IDs to genre names
  let genres = [];
  if (apiData.genres && Array.isArray(apiData.genres)) {
    genres = apiData.genres.map(genre => {
      // If genre is a number (ID), look it up in the genres map
      if (typeof genre === 'number') {
        return genresMap[genre] || `Genre ${genre}`;
      }
      // If genre is an object with id, look it up
      if (typeof genre === 'object' && genre.id) {
        return genresMap[genre.id] || genre.name || `Genre ${genre.id}`;
      }
      // If genre is already a string, return it
      if (typeof genre === 'string') {
        return genre;
      }
      // Fallback
      return genre.name || genre;
    }).filter(Boolean); // Remove any undefined/null values
  }

  // Get image URL - WatchMode API may provide low-resolution images
  // Priority: poster > poster_url > backdrop > backdrop_url > fallback
  let imageUrl = apiData.poster || apiData.poster_url || apiData.backdrop || apiData.backdrop_url || '/images/NoMovie.avif';
  
  // Ensure proper URL format
  if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/images/') && !imageUrl.startsWith('/')) {
    imageUrl = `/${imageUrl}`;
  }

  return {
    title: apiData.title || apiData.name || 'Unknown Title',
    image: imageUrl,
    trailer: apiData.trailer || apiData.trailer_url || '',
    description: apiData.plot_overview || apiData.description || apiData.overview || '',
    year: apiData.year || apiData.release_date?.substring(0, 4) || '',
    imdb_rating: apiData.imdb_rating || apiData.ratings?.imdb || '',
    tmdb_rating: apiData.tmdb_rating || apiData.ratings?.tmdb || apiData.user_rating || '',
    genres: genres,
    runtime_minutes: apiData.runtime_minutes || apiData.runtime || '',
    watchmode_id: apiData.id || apiData.tmdb_id || apiData.imdb_id || '',
    tmdb_id: apiData.tmdb_id || apiData.tmdbId // Store TMDB ID for potential future use
  };
};

