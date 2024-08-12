import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/sports';

export const getSports = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addUser = async (user: { dni: string; nombre: string; apellidos: string; email: string; password: string; role: string; }) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};