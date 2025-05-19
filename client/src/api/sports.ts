import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/sports';

export const getSports = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getSportsById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateSport = async (id: number, sport: FormData) => {
  const response = await axios.put(`${API_URL}/update-sports/${id}`, sport);
  return response.data;
};

export const postSport = async (sport: any) => {
  const response = await axios.post(API_URL + '/create-sports', sport);
  return response.data;
}

export const addUser = async (user: { dni: string; nombre: string; apellidos: string; email: string; password: string; role: string; }) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

export const getEventsBySport = async (id_deporte: number) => {
  const response = await axios.get(`${API_URL}/events-from-sport/${id_deporte}`);
  return response.data;
};

export const deleteSport = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}