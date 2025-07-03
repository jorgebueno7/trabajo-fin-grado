import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/rankings';

export const getRankings = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getRankingById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const deleteRanking = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}

export const putRanking = async (id: string, rankingData: any) => {
  const response = await axios.put(`${API_URL}/${id}`, rankingData);
  return response.data;
}