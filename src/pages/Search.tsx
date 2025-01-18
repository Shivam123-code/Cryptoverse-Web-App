import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchCoins } from '../services/api';
import { TrendingUp, TrendingDown } from 'lucide-react';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = await searchCoins(query);
        setResults(data.coins || []);
      } catch (error) {
        console.error('Error searching coins:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>
      {results.length === 0 ? (
        <p className="text-gray-400">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((coin) => (
            <Link
              key={coin.id}
              to={`/coins/${coin.id}`}
              className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors border border-gray-800"
            >
              <div className="flex items-center space-x-4">
                <img src={coin.thumb} alt={coin.name} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{coin.name}</h3>
                  <p className="text-gray-400 uppercase">{coin.symbol}</p>
                </div>
                {coin.price_change_percentage_24h > 0 ? (
                  <TrendingUp className="w-5 h-5 text-green-500" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-400">Market Cap Rank</p>
                <p className="text-lg font-semibold">#{coin.market_cap_rank || 'N/A'}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;