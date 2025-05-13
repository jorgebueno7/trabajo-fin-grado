import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/events';

export const getEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getEventsAvailableByUserLoggedIn = async () => {
  const response = await axios.get(API_URL + "-available-user", { withCredentials: true });
  return response.data;
};

export const getEventsById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

// Sin imagenes
// export const postEvent = async (event: any) => {
//   const response = await axios.post(API_URL, event, { withCredentials: true });
//   return response.data;
// }

export const postEvent = async (event: FormData) => {
  const response = await axios.post(API_URL, event, { withCredentials: true });
  return response.data;
}

export const putEvent = async (id: number, event: any) => {
  const response = await axios.put(`${API_URL}/${id}`, event);
  return response.data;
}

export const putEventStatus = async (id: number, estado: string) => {
  const response = await axios.put(`${API_URL}/update-status/${id}`, { estado });
  return response.data;
}

export const deleteEvent = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}