import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/ratings';

export const getRatings = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getRatingsByEvent = async (id_evento: number) => {
  const response = await axios.get(API_URL + '/event/' + id_evento);
  return response.data;
}