import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/user-events';

export const getUserEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getUserEventsByUserId = async (userId: number) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
}

export const getUserEventsByEventId = async (eventId: number) => {
  const response = await axios.get(`${API_URL}/event/${eventId}`);
  return response.data;
}

export const postUserEvent = async (eventId: number, userId: number) => {
  const response = await axios.post(API_URL, { id_evento: eventId, id_usuario: userId });
  return response.data;
}