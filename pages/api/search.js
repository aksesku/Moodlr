export default async function handler(req, res) {
  const query = req.query.q || '';
  const response = await fetch(`https://www.omdbapi.com/?apikey=fc2b9e5b&s=${query}`);
  const data = await response.json();
  res.status(200).json({ results: data.Search || [] });
}
