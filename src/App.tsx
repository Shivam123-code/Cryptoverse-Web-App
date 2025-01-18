import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Exchanges from './pages/Exchanges';
import ExchangeDetail from './pages/ExchangeDetail';
import Coins from './pages/Coins';
import CoinDetail from './pages/CoinDetail';
import Search from './pages/Search';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="exchanges" element={<Exchanges />} />
          <Route path="exchanges/:id" element={<ExchangeDetail />} />
          <Route path="coins" element={<Coins />} />
          <Route path="coins/:id" element={<CoinDetail />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;