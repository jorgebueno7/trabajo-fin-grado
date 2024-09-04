import React, { useState, useEffect } from 'react';

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

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isProfileComplete, setProfileComplete] = useState<boolean>(false);

  useEffect(() => {
    const storedProfileComplete = localStorage.getItem('isProfileComplete');
    if (storedProfileComplete) {
      setProfileComplete(JSON.parse(storedProfileComplete));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isProfileComplete', JSON.stringify(isProfileComplete));
  }, [isProfileComplete]);

  return (
    <UserContext.Provider value={{ isLoggedIn, setLoggedIn, user, setUser, isProfileComplete, setProfileComplete }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;