// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom'
// import UserContext from '../../context/UsersContext';
// import axios from 'axios';

// const Register = () => {
//     const [fecha_nacimiento, setFechaNacimiento] = useState('');
//     const [telefono, setTelefono] = useState('');
//     const [direccion, setDireccion] = useState('');
//     const [altura, setAltura] = useState('');
//     const [peso, setPeso] = useState('');
//     const [deporte, setDeporte] = useState('');
//     const [mejor_marca, setMejorMarca] = useState('');
//     const { user, setUser, setProfileComplete } = useContext(UserContext);

//     const navigate = useNavigate();
//     const navigateProfile = () => {
//         navigate('/perfil');
//     };

//     // const getCurrentUser = () => {
//     //     if (!user) {
//     //       const storedUser = localStorage.getItem('user');
//     //       return storedUser ? JSON.parse(storedUser) : null;
//     //     }  
//     //     return user;
//     // };

//     // const fetchUsers = async () => {
//     //     const user = getCurrentUser()
//     //     setUser(user);
//     // };

//     // useEffect(() => {     
//     //     fetchUsers();
//     // }, []);

//     // const handleSubmit = async (event: React.FormEvent) => {
//     //     event.preventDefault();
//     //     try {
//     //         const user = getCurrentUser();
//     //         const userId = user.id;
//     //         const response = await axios.put(`${import.meta.env.VITE_API_URL}/complete-profile/${userId}`, { fecha_nacimiento, telefono, direccion, altura, peso, deporte, mejor_marca, profile_complete: true}, { withCredentials: true });                        
//     //         console.log(response.data);
//     //         navigateProfile();
//     //     } catch (error) {
//     //         console.error(error);
//     //     }
//     // };

//     const fetchCurrentUser = async () => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_API_URL}/user-from-session`, { withCredentials: true });
//             setUser(response.data);
//             console.log(response.data);
//             // setProfileComplete(true);
//             // const userId = response.data;
//             // const userDetails = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}`);
//             // setUser(userDetails.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };
    
//     useEffect(() => {     
//         fetchCurrentUser();
//     }, []);
    
//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         try {
//             const userId = user?.id;
//             if (!userId) {
//                 console.error("User ID is not available");
//                 return;
//             }
//             const response = await axios.put(`${import.meta.env.VITE_API_URL}/complete-profile/${userId}`, 
//             { fecha_nacimiento, telefono, direccion, altura, peso, deporte, mejor_marca}, { withCredentials: true });                        
//             console.log(response.data);
//             setUser(response.data);
//             setProfileComplete(true);
//             await fetchCurrentUser();
//             navigateProfile();
//         } catch (error) {
//             console.error(error);
//         }
//     };
    
//     return (
//         <div className="flex items-center justify-center min-h-screen overflow-y-auto">
//             <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
//                 <form className="space-y-6 max-w-sm mx-auto" onSubmit={handleSubmit}>
//                 <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Completa tu perfil</h5>
//                     <div className="relative max-w-sm">
//                         <label htmlFor="fecha_nac" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de nacimiento</label>
//                         <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
//                             <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                                 <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
//                             </svg>
//                         </div>
//                         <input id="default-datepicker" type="date" onChange={e => setFechaNacimiento(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
//                     </div>
//                     <div className="mb-5">
//                         <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
//                         <input type="text" id="telefono" onChange={e => setTelefono(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="600000000" required />
//                     </div>
//                     <div className="mb-5">
//                         <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección</label>
//                         <input type="text" id="direccion" onChange={e => setDireccion(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Calle deportista nº, piso, puerta..." required />
//                     </div>
//                     <div className="mb-5">
//                         <label htmlFor="altura" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Altura (cm)</label>
//                         <input type="text" id="altura" onChange={e => setAltura(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="170" required />
//                     </div>
//                     <div className="mb-5">
//                         <label htmlFor="peso" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Peso (kg)</label>
//                         <input type="text" id="peso" onChange={e => setPeso(e.target.value)} placeholder="78.0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
//                     </div>
//                     <div className="mb-5">
//                         <label htmlFor="deporte" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deporte</label>
//                         <input type="text" id="deporte" onChange={e => setDeporte(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Deporte favorito" required />
//                     </div>
//                     <div className="mb-5">
//                         <label htmlFor="mejor_marca" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mejor marca</label>
//                         <input type="text" id="mejor_marca" onChange={e => setMejorMarca(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Mejor marca" required />
//                     </div>
//                     <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Completar perfil</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Register;

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UsersContext';
import { updateProfile } from '../../api/users';
// import axios from 'axios';

const PerfilForm = () => {
    const { user, setUser, setProfileComplete } = useContext(UserContext);
    const [nombre, setNombre] = useState(user?.nombre || '');
    const [apellidos, setApellidos] = useState(user?.apellidos || '');
    const [email, setEmail] = useState(user?.email || '');
    const [telefono, setTelefono] = useState(user?.telefono || '');
    const [direccion, setDireccion] = useState(user?.direccion || '');
    const [altura, setAltura] = useState(user?.altura || '');
    const [peso, setPeso] = useState(user?.peso || '');
    const [deporte, setDeporte] = useState(user?.deporte || '');
    const [mejor_marca, setMejorMarca] = useState(user?.mejor_marca || '');

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setNombre(user.nombre || '');
            setApellidos(user.apellidos || '');
            setEmail(user.email || '');
            setTelefono(user.telefono || '');
            setDireccion(user.direccion || '');
            setAltura(user.altura || '');
            setPeso(user.peso || '');
            setDeporte(user.deporte || '');
            setMejorMarca(user.mejor_marca || '');
        }
    }, [user]);

    // const handleSubmit = async (event: React.FormEvent) => {
    //     event.preventDefault();
    //     try {
    //         console.log("ENTRA");
    //         const updatedUser = {
    //             nombre: user?.nombre || '',
    //             apellidos: user?.apellidos || '',
    //             email: user?.email || '',
    //             telefono: String(user?.telefono || ''),
    //             direccion: user?.direccion || '',
    //             altura: Number(altura) || 0,
    //             peso: Number(peso) || 0,
    //             deporte: user?.deporte || '',
    //             mejor_marca: user?.mejor_marca || '',
    //         };
    //         console.log('Información a actualizar AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA: ', updatedUser);
    //         const response = await updateProfile(updatedUser);
    //         // const response = await axios.put(import.meta.env.VITE_API_URL + '/update-profile', updatedUser, { withCredentials: true });

    //         console.log('Profile updated:', response);
    //         setUser(response);
    //         setProfileComplete(true);
    //         navigate('/perfil');
    //         // if (response.status === 200) {
    //         //     console.log('Perfil actualizado correctamente:', response.data);
    //         //     setUser(response.data);  // Establecer el usuario actualizado en el contexto
    //         //     setProfileComplete(true); // Marcar como perfil completo
    //         //     navigate('/perfil'); // Redirigir a la página de perfil
    //         // }
    //     } catch (error) {
    //         console.error('Error updating profile:', error);
    //     }
    // };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // Crear un objeto con solo los campos modificados
            interface UpdatedUser {
                nombre?: string;
                apellidos?: string;
                email?: string;
                telefono?: string;
                direccion?: string;
                altura?: number;
                peso?: number;
                deporte?: string;
                mejor_marca?: string;
            }

            const updatedUser: UpdatedUser = {};
            if (nombre !== user?.nombre) updatedUser.nombre = nombre;
            if (apellidos !== user?.apellidos) updatedUser.apellidos = apellidos;
            if (email !== user?.email) updatedUser.email = email;
            if (telefono !== String(user?.telefono)) updatedUser.telefono = String(telefono);
            if (direccion !== user?.direccion) updatedUser.direccion = direccion;
            if (Number(altura) !== Number(user?.altura)) updatedUser.altura = Number(altura);
            if (Number(peso) !== Number(user?.peso)) updatedUser.peso = Number(peso);
            if (deporte !== user?.deporte) updatedUser.deporte = deporte;
            if (mejor_marca !== user?.mejor_marca) updatedUser.mejor_marca = mejor_marca;

            if (Object.keys(updatedUser).length === 0) {
                console.log('No hay cambios para actualizar');
                return;
            }
    
            console.log('Información a actualizar:', updatedUser);
    
            // Llamar a la función de API para actualizar el perfil
            const response = await updateProfile(updatedUser);
    
            console.log('Perfil actualizado:', response);
    
            // Actualizar el contexto de usuario y estado de perfil completo si es necesario
            if (response && response.user) {
                setUser(response.user);
                navigate('/perfil');
            } else {
                console.error('Respuesta inesperada al actualizar el perfil:', response);
            }
    
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen overflow-y-auto">
            <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6 max-w-sm mx-auto" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                        Actualizar Perfil
                    </h5>
                    <div className="relative max-w-sm">
                        <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nombre
                        </label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="apellidos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Apellidos
                        </label>
                        <input
                            type="text"
                            value={apellidos}
                            onChange={e => setApellidos(e.target.value)}
                            className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            value={telefono}
                            onChange={e => setTelefono(e.target.value)}
                            className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Dirección
                        </label>
                        <input
                            type="text"
                            value={direccion}
                            onChange={e => setDireccion(e.target.value)}
                            className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="altura" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Altura (cm)
                        </label>
                        <input
                            type="text"
                            value={altura}
                            onChange={e => setAltura(e.target.value)}
                            className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="peso" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Peso (kg)
                        </label>
                        <input
                            type="text"
                            value={peso}
                            onChange={e => setPeso(e.target.value)}
                            className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="deporte" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Deporte
                        </label>
                        <input
                            type="text"
                            value={deporte}
                            onChange={e => setDeporte(e.target.value)}
                            className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="mejor_marca" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Mejor marca
                        </label>
                        <input
                            type="text"
                            value={mejor_marca}
                            onChange={e => setMejorMarca(e.target.value)}
                            className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                        />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600">
                        Guardar cambios
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PerfilForm;
