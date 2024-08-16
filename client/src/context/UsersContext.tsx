import React from 'react';

export interface User {
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
}

const UserContext = React.createContext<UserContextProps>({
  isLoggedIn: false,
  setLoggedIn: () => {},
  user: null,
  setUser: () => {},
});

export default UserContext;