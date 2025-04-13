import { useState } from 'react';
import Head from 'next/head';

export default function Movie({ movieData }) {
  const [isLoading, setIsLoading] = useState(false);

  if (!movieData || movieData.Response === 'False') {
    return <p>Movie not found!</p>;
  }

  const handleDownload = () => {
    setIsLoading(true);
    window.location.href = `/api/download?movieId=${movieData.imdbID}`;
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Head>
        <title>{movieData.Title} - IMDb Scraper</title>
        <meta name="description" content={movieData.Plot} />
        <meta property="og:image" content={movieData.Poster} />
        <meta property="og:title" content={movieData.Title} />
        <meta property="og:description" content={movieData.Plot} />
      </Head>

      <h1 className="text-4xl font-bold text-center mb-6">{movieData.Title}</h1>
      <div className="flex justify-center mb-6">
        <img src={movieData.Poster} alt={movieData.Title} className="w-64 h-96 object-cover" />
      </div>

      <p><strong>Year:</strong> {movieData.Year}</p>
      <p><strong>Genre:</strong> {movieData.Genre}</p>
      <p><strong>Plot:</strong> {movieData.Plot}</p>

      <button
        onClick={handleDownload}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Redirecting...' : 'Download Movie'}
      </button>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=fc2b9e5b&i=${params.id}`);
  const movieData = await res.json();

  return { props: { movieData } };
}
