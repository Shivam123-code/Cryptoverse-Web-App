import axios from 'axios';
import { Exchange, Coin } from '../types';

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

export const getExchanges = async (): Promise<Exchange[]> => {
  const { data } = await api.get('/exchanges');
  return data;
};

export const getCoins = async (page = 1): Promise<Coin[]> => {
  const { data } = await api.get(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=true`
  );
  return data;
};

export const getCoin = async (id: string): Promise<any> => {
  const { data } = await api.get(`/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`);
  return data;
};

export const getExchangeCoins = async (exchangeId: string): Promise<any> => {
  const { data } = await api.get(`/exchanges/${exchangeId}/tickers`);
  return data;
};

export const searchCoins = async (query: string): Promise<any> => {
  const { data } = await api.get(`/search?query=${encodeURIComponent(query)}`);
  return data;
};