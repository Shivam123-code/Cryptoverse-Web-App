import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getExchangeCoins } from '../services/api';
import { ExternalLink, Globe, Twitter } from 'lucide-react';

const ExchangeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [exchange, setExchange] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExchange = async () => {
      try {
        if (id) {
          const data = await getExchangeCoins(id);
          setExchange(data);
        }
      } catch (error) {
        console.error('Error fetching exchange:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExchange();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!exchange) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-400">Exchange not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center space-x-4 mb-6">
          <img src={exchange.image} alt={exchange.name} className="w-16 h-16" />
          <div>
            <h1 className="text-3xl font-bold">{exchange.name}</h1>
            <p className="text-gray-400">{exchange.country}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <p className="text-sm text-gray-400">Trust Score</p>
            <p className="text-lg font-semibold">{exchange.trust_score}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">24h Volume (BTC)</p>
            <p className="text-lg font-semibold">{exchange.trade_volume_24h_btc?.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Year Established</p>
            <p className="text-lg font-semibold">{exchange.year_established || 'N/A'}</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-gray-400" />
            <a
              href={exchange.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-400"
            >
              Website
            </a>
          </div>
          {exchange.twitter_handle && (
            <div className="flex items-center space-x-2">
              <Twitter className="w-5 h-5 text-gray-400" />
              <a
                href={`https://twitter.com/${exchange.twitter_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400"
              >
                Twitter
              </a>
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold mb-4">Listed Coins</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-800">
                <th className="pb-4">Coin</th>
                <th className="pb-4">Pair</th>
                <th className="pb-4">Price</th>
                <th className="pb-4">Volume (24h)</th>
              </tr>
            </thead>
            <tbody>
              {exchange.tickers?.slice(0, 50).map((ticker: any) => (
                <tr key={ticker.base + ticker.target} className="border-b border-gray-800">
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <span>{ticker.base}</span>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  </td>
                  <td className="py-4">{ticker.target}</td>
                  <td className="py-4">${ticker.last?.toFixed(2) || 'N/A'}</td>
                  <td className="py-4">${ticker.volume?.toFixed(2) || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExchangeDetail;