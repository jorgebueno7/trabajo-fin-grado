import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/events';

export const getEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getEventsById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export const postEvent = async (event: any) => {
  const response = await axios.post(API_URL, event);
  return response.data;
}

export const putEvent = async (id: number) => {
  const response = await axios.put(`${API_URL}/${id}`);
  return response.data;
}

export const deleteEvent = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}