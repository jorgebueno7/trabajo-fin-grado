import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async () => {
  const response = await axios.get(API_URL + '/users');
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await axios.get(API_URL + '/users/' + id);
  return response.data;
};

export const addUser = async (user: { dni: string; nombre: string; apellidos: string; email: string; password: string; role: string; 
  fecha_nacimiento: string; telefono: string; direccion: string; altura: string; peso: string; deporte: string; mejor_marca: string; }) => {
  const response = await axios.post(API_URL + '/registro', user);
  return response.data;
};

// export const addUser = async (user: { dni: string; nombre: string; apellidos: string; email: string; password: string; isAdminUser: boolean; 
//   fecha_nacimiento: string; telefono: string; direccion: string; altura: string; peso: string; deporte: string; mejor_marca: string; }) => {
//   const response = await axios.post(API_URL + '/registro', user);
//   return response.data;
// };

export const completeProfile = async (id: string, profileData: { fecha_nacimiento: string; telefono: string; direccion: string; 
    altura: number; peso: number; deporte: string; mejor_marca: string; }) => {
  const response = await axios.put(API_URL + '/complete-profile/' + id, profileData);
  return response.data;
};

export const updateProfile = async (user: any) => {
  const response = await axios.put(API_URL + '/update-profile', user, { withCredentials: true });
  return response.data;
}

export const deleteProfile = async () => {
  const response = await axios.delete(API_URL + '/delete-profile', { withCredentials: true });
  return response.data;
}

export const deleteUserById = async (id: number) => {
  const response = await axios.delete(API_URL + '/users/' + id);
  return response.data;
}

export const updateUserById = async (id: number, user: any) => {
  const response = await axios.put(API_URL + '/users/' + id, user);
  return response.data;
}

export const checkAdminExists = async () => {
  try {
      await axios.get(`${API_URL}/user-admin-exists`);
      return true;
  } catch (error) {
      return false;
  }
};

export const getAllOrganizerUsers = async () => {
  const response = await axios.get(API_URL + '/users/organizer');
  return response.data;
}