import React, { useState, useEffect } from 'react';

export interface User {
  id: number;
  dni: string;
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  isAdminUser: boolean;
  fecha_nacimiento: string;
  telefono: number;
  direccion: string;
  altura: string;
  peso: string;
  deporte: string;
  mejor_marca: string;
  profile_complete: boolean;
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
  setUser: () => {}
});

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ isLoggedIn, setLoggedIn, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;