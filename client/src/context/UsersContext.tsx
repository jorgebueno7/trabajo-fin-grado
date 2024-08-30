import React from 'react';

export interface User {
  id: number;
  dni: string;
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  role: string;
  fecha_nacimiento: string;
  telefono: number;
  direccion: string;
  altura: string;
  peso: string;
  deporte: string;
  mejor_marca: string;
}

interface UserContextProps {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isProfileComplete: boolean;
  setProfileComplete: (value: boolean) => void;
}

const UserContext = React.createContext<UserContextProps>({
  isLoggedIn: false,
  setLoggedIn: () => {},
  user: null,
  setUser: () => {},
  isProfileComplete: false,
  setProfileComplete: () => {}
});

export default UserContext;