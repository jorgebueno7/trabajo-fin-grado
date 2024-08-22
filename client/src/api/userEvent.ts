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
  console.log("response.data", response.data);
  return response.data;
}