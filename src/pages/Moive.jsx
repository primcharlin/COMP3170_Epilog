import React from 'react';
import { useParams } from 'react-router-dom';
import MovieDetails from '../components/MoiveDetails';

const Movie = () => {
    const { id } = useParams();
    return (
        <div className="page">
            <MovieDetails movieId={parseInt(id) || 0} />
        </div>
    );
};

export default Movie;