// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// // Definición de la interfaz de User
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
//   user: User | null;
//   isLoggedIn: boolean;
//   profileComplete: boolean;
//   isAdmin: boolean;
//   setUser: (user: User | null) => void;
//   setLoggedIn: (isLoggedIn: boolean) => void;
//   setProfileComplete: (profileComplete: boolean) => void;
//   setIsAdmin: (isAdmin: boolean) => void;

// }

// // Creación del contexto
// const UserContext = React.createContext<UserContextProps>({
//   user: null,
//   isLoggedIn: false,
//   profileComplete: false,
//   isAdmin: false,
//   setUser: () => {},
//   setLoggedIn: () => {},
//   setProfileComplete: () => {},
//   setIsAdmin: () => {},
// });

// export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoggedIn, setLoggedIn] = useState(false);
//   const [profileComplete, setProfileComplete] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const response = await axios.get(import.meta.env.VITE_API_URL + '/user-from-session', {
//           withCredentials: true,
//         });
//         if (response.status === 200 && response.data.user) {
//           setUser(response.data.user);
//           setLoggedIn(true);
//           setIsAdmin(response.data.user.isAdminUser); // Actualiza el estado de isAdmin aquí
//           setProfileComplete(response.data.user.profile_complete); // Si tienes esta información, también podrías establecerla
//         }
//       } catch (error) {
//         console.log('No active session found:', error);
//       }
//     };

//     checkSession();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, isLoggedIn, setUser, setLoggedIn, profileComplete, setProfileComplete, isAdmin, setIsAdmin }}>
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
  profileComplete: boolean;
  isAdmin: boolean;
  setUser: (user: User | null) => void;
  setLoggedIn: (isLoggedIn: boolean) => void;
  setProfileComplete: (profileComplete: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  loading: boolean; // Añadido para manejar el estado de carga
  error: string | null; // Añadido para manejar errores
}

// Creación del contexto
const UserContext = React.createContext<UserContextProps>({
  user: null,
  isLoggedIn: false,
  profileComplete: false,
  isAdmin: false,
  setUser: () => {},
  setLoggedIn: () => {},
  setProfileComplete: () => {},
  setIsAdmin: () => {},
  loading: false,
  error: null,
});

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true); // Comienza el estado de carga
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/user-from-session', {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.user) {
          setUser(response.data.user);
          setLoggedIn(true);
          setIsAdmin(response.data.user.isAdminUser); // Actualiza el estado de isAdmin aquí
          setProfileComplete(response.data.user.profile_complete); // Actualiza el estado de profileComplete
        } else {
          setError('No se encontró usuario.');
        }
      } catch (error) {
        console.log('No active session found:', error);
        setError('Error al obtener la sesión.'); // Manejo de error
      } finally {
        setLoading(false); // Termina el estado de carga
      }
    };

    checkSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, setUser, setLoggedIn, profileComplete, setProfileComplete, isAdmin, setIsAdmin, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;


// Contexto de Usuario
// import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

// interface User {
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
//   user: User | null;
//   setUser: Dispatch<SetStateAction<User | null>>;
// }

// const UserContext = createContext<UserContextProps | null>(null);

// export const UserProvider: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
//   const [user, setUser] = useState<User | null>(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserContext;
