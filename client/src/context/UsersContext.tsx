// import React, { useState, useEffect } from 'react';

// export interface User {
//   id: number;
//   dni: string;
//   nombre: string;
//   apellidos: string;
//   email: string;
//   password: string;
//   isAdminUser: boolean;
//   fecha_nacimiento: string;
//   telefono: number;
//   direccion: string;
//   altura: string;
//   peso: string;
//   deporte: string;
//   mejor_marca: string;
//   profile_complete: boolean;
// }

// interface UserContextProps {
//   // isLoggedIn: boolean;
//   // setLoggedIn: (value: boolean) => void;
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// const UserContext = React.createContext<UserContextProps>({
//   // isLoggedIn: false,
//   // setLoggedIn: () => {},
//   user: null,
//   setUser: () => {}
// });

// export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
//   // const [isLoggedIn, setLoggedIn] = useState(false);
//   const [user, setUser] = useState<User | null>(null);

//   return (
//     // <UserContext.Provider value={{ isLoggedIn, setLoggedIn, user, setUser }}>
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserContext;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Definición de la interfaz de User
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
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  setLoggedIn: (isLoggedIn: boolean) => void;
}

// Creación del contexto
const UserContext = React.createContext<UserContextProps>({
  user: null,
  isLoggedIn: false,
  setUser: () => {},
  setLoggedIn: () => {},
});

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si existe una sesión activa
    const checkSession = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/perfil', {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.user) {
          setUser(response.data.user);
          setLoggedIn(true);
        }
      } catch (error) {
        console.log('No active session found:', error);
      }
    };

    checkSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, setUser, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
