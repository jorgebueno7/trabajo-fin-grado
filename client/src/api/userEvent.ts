import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/user-events';

// export const getUserEvents = async () => {
//   const response = await axios.get(API_URL);
//   return response.data;
// };

export const getUserEventsByUserId = async (userId: number) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
}

export const getUserEventsByEventId = async (eventId: number) => {
  const response = await axios.get(`${API_URL}/event/${eventId}`);
  return response.data;
}

export const postUserEvent = async (eventId: number) => {
  const response = await axios.post(API_URL, { id_evento: eventId }, { withCredentials: true });
  return response.data;
}

export const getUserEvents = async () => {
  const response = await axios.get(`${API_URL}`, { withCredentials: true });
  return response.data;
};

export const getUserEventsLoggedIn = async () => {
  const response = await axios.get(`${API_URL}/events-logged-in`, { withCredentials: true });
  return response.data;
};

export const getEventsByOrganizer = async () => {
  const response = await axios.get(`${API_URL}/organizer`, { withCredentials: true });
  return response.data;
};

export const deleteUserEvent = async (eventId: number) => {
  const response = await axios.delete(`${API_URL}/event/${eventId}`, { withCredentials: true });
  return response.data;
};

export const addEventStats = async (eventId: number, userId: number, statsData: any) => {
  const response = await axios.put(`${API_URL}/${eventId}/stats/${userId}`, statsData);
  return response.data;
}

export const getNotifications = async () => {
  const response = await axios.get(`${API_URL}/notifications`, { withCredentials: true });
  return response.data;
}

export const markNotificationAsRead = async (id_evento: number) => {
  const response = await axios.put(`${API_URL}/notifications/${id_evento}`, {}, { withCredentials: true });
  return response.data;
}