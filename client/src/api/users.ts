import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async () => {
  const response = await axios.get(API_URL + '/users');
  return response.data;
};

export const addUser = async (user: { dni: string; nombre: string; apellidos: string; email: string; password: string; }) => {
  const response = await axios.post(API_URL + '/registro', user);
  return response.data;
};
