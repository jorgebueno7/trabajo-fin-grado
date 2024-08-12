import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/events';

export const getEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

