import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UsersContext';
import axios from 'axios';

const Register = () => {
    const [fecha_nacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [deporte, setDeporte] = useState('');
    const [mejor_marca, setMejorMarca] = useState('');
    const { user, setUser, setProfileComplete } = useContext(UserContext);

    const navigate = useNavigate();
    const navigateProfile = () => {
        navigate('/perfil');
    };

    const getCurrentUser = () => {
        if (!user) {
          const storedUser = localStorage.getItem('user');
          return storedUser ? JSON.parse(storedUser) : null;
        }  
        return user;
    };

    const fetchUsers = async () => {
        const user = getCurrentUser()
        setUser(user);
    };

    useEffect(() => {     
        fetchUsers();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const user = getCurrentUser();
            const userId = user.id;
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/complete-profile/${userId}`, { fecha_nacimiento, telefono, direccion, altura, peso, deporte, mejor_marca });
                        
            console.log(response.data);
            setProfileComplete(true);
            localStorage.setItem('isProfileComplete', 'true');
            navigateProfile();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen overflow-y-auto">
            <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6 max-w-sm mx-auto" onSubmit={handleSubmit}>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Completa tu perfil</h5>
                    <div className="relative max-w-sm">
                        <label htmlFor="fecha_nac" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de nacimiento</label>
                        <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                            </svg>
                        </div>
                        <input id="default-datepicker" type="date" onChange={e => setFechaNacimiento(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                        <input type="text" id="telefono" onChange={e => setTelefono(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="600000000" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección</label>
                        <input type="text" id="direccion" onChange={e => setDireccion(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Calle deportista nº, piso, puerta..." required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="altura" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Altura (cm)</label>
                        <input type="text" id="altura" onChange={e => setAltura(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="170" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="peso" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Peso (kg)</label>
                        <input type="text" id="peso" onChange={e => setPeso(e.target.value)} placeholder="78.0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="deporte" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deporte</label>
                        <input type="text" id="deporte" onChange={e => setDeporte(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Deporte favorito" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="mejor_marca" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mejor marca</label>
                        <input type="text" id="mejor_marca" onChange={e => setMejorMarca(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Mejor marca" required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Completar perfil</button>
                </form>
            </div>
        </div>
    );
}

export default Register;