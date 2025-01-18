import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Search, Coins, BarChart3, Home } from 'lucide-react';

const Layout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <nav className="fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <Coins className="w-8 h-8 text-blue-500" />
                <span className="text-xl font-bold">CryptoVerse</span>
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link to="/" className="flex items-center space-x-1 hover:text-blue-500">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
                <Link to="/exchanges" className="flex items-center space-x-1 hover:text-blue-500">
                  <BarChart3 className="w-4 h-4" />
                  <span>Exchanges</span>
                </Link>
                <Link to="/coins" className="flex items-center space-x-1 hover:text-blue-500">
                  <Coins className="w-4 h-4" />
                  <span>Coins</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search coins..."
                  className="bg-gray-800 text-gray-100 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            </div>
          </div>
        </div>
      </nav>
      <main className="pt-16 min-h-screen">
        <Outlet />
      </main>
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-gray-400">
            <p>© 2024 CryptoVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;