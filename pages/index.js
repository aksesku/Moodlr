import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchMovies = async () => {
    const res = await fetch('/api/search?q=' + query);
    const data = await res.json();
    setResults(data.results || []);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">IMDb Movie Scraper</h1>
      <input
        className="border p-2 rounded w-full mb-2"
        type="text"
        placeholder="Search IMDb..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={searchMovies}>
        Search
      </button>

      <ul className="mt-6 space-y-2">
        {results.map(movie => (
          <li key={movie.imdbID}>
            <Link href={`/movie/${movie.imdbID}`}>
              <a className="text-blue-600 hover:underline">{movie.Title} ({movie.Year})</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
