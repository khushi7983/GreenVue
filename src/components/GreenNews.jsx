import React, { useState, useEffect } from 'react';

const GreenNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchNews = async () => {
    try {
      console.log('Attempting to fetch news...'); // Debug log
      const response = await fetch(buildApiUrl(`${API_ENDPOINTS.NEWS}${searchTerm ? `?topic=${searchTerm}` : ''}`));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received news data:', data); // Debug log
      setNews(data.success ? data.data : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching news:', err); // Debug log
      setError(`Failed to fetch news: ${err.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [searchTerm]); // Added searchTerm dependency

  // Add search input section
  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews();
  };

  if (loading) return <div className="text-center">Loading news...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent leading-tight">
          🌍 Green Investment News
        </h1>
        <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search topics..."
            className="flex-1 sm:w-48 bg-gray-800 text-white px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                     touch-manipulation"
          />
          <button 
            type="submit"
            className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-3 sm:px-4 py-2 text-sm rounded-lg transition-colors
                     touch-manipulation shrink-0"
          >
            Search
          </button>
        </form>
      </div>

      {news.map((article, index) => (
        <div key={index} className="bg-gray-800/80 p-3 sm:p-4 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-colors
                                   touch-manipulation">
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-white leading-tight line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-300 mb-3 text-xs sm:text-sm leading-relaxed line-clamp-3">
            {article.description}
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs text-gray-400">
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            <a 
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400 active:text-green-300 font-medium self-start sm:self-auto
                       touch-manipulation"
            >
              Read More →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GreenNews; 