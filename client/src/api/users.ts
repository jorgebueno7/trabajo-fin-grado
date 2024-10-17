import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async () => {
  const response = await axios.get(API_URL + '/users');
  return response.data;
};

export const addUser = async (user: { dni: string; nombre: string; apellidos: string; email: string; password: string; isAdminUser: boolean; }) => {
  const response = await axios.post(API_URL + '/registro', user);
  return response.data;
};

export const completeProfile = async (id: string, profileData: { fecha_nacimiento: string; telefono: string; direccion: string; altura: number; peso: number; deporte: string; mejor_marca: string; }) => {
  const response = await axios.put(API_URL + '/complete-profile/' + id, profileData);
  return response.data;
};