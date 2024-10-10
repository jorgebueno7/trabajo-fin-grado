import React, { useState, useEffect, useContext } from 'react';
import { getUsers } from '../../api/users';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import UserContext from '../../context/UsersContext';

const Register = () => {
    interface User {
        role: string;
    }

    const [dni, setDni] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [lengthRequirement, setLengthRequirement] = useState(false);
    const [numberRequirement, setNumberRequirement] = useState(false);
    const [lowercaseRequirement, setLowercaseRequirement] = useState(false);
    const [uppercaseRequirement, setUppercaseRequirement] = useState(false);
    const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);

    const [role, setRole] = useState('');
    const [isAdminExists, setIsAdminExists] = useState(false);


    const navigate = useNavigate();
    const navigateConfirmLogin = () => {
        navigate('/confirm_login');
    };

    const fetchUsers = async () => {
        const users = await getUsers();
        const isAdminExists = users.some((user: User) => user.role === 'Administrador');
        setIsAdminExists(isAdminExists);
    };

    const comparePasswords = (password: string, repeatPassword: string) => {
        if (password !== repeatPassword) {
            setPasswordError('Las contraseñas no coinciden');
        }else {
            setPasswordError('');
        }
    };

    useEffect(() => {
        setLengthRequirement(password.length >= 8);
        setNumberRequirement(/\d/.test(password));
        setLowercaseRequirement(/[a-z]/.test(password));
        setUppercaseRequirement(/[A-Z]/.test(password));
        comparePasswords(password, repeatPassword);     
        fetchUsers();
    }, [password, repeatPassword]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            console.log({ dni, nombre, apellidos, email, password, role });
            const response = await axios.post(import.meta.env.VITE_API_URL + '/registro', { dni, nombre, apellidos, email, password, role });
            console.log(response.data);

            navigateConfirmLogin();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen overflow-y-auto">
            <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6 max-w-sm mx-auto" onSubmit={handleSubmit}>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Registrate</h5>
                <div className="mb-5">
                        <label htmlFor="dni" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DNI</label>
                        <input type="text" id="dni" onChange={e => setDni(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="DNI" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                        <input type="text" id="nombre" onChange={e => setNombre(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Nombre" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="apellidos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos</label>
                        <input type="text" id="apellidos" onChange={e => setApellidos(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Apellidos" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" id="email" onChange={e => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="example@sportly.com" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} 
                            onFocus={() => setIsPasswordInputFocused(true)}
                            onBlur={() => setIsPasswordInputFocused(false)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="••••••••" required />
                            {isPasswordInputFocused && (
                                <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                                    <li className={`flex items-center ${lengthRequirement ? 'text-green-500' : 'text-gray-500'}`}>
                                        <svg className={`w-3.5 h-3.5 me-2 flex-shrink-0 ${lengthRequirement ? 'text-green-500 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                        </svg>
                                        8 caracteres como mínimo
                                    </li>
                                    <li className={`flex items-center ${numberRequirement ? 'text-green-500' : 'text-gray-500'}`}>
                                        <svg className={`w-3.5 h-3.5 me-2 flex-shrink-0 ${numberRequirement ? 'text-green-500 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                        </svg>
                                        Al menos un número
                                    </li>
                                    <li className={`flex items-center ${lowercaseRequirement ? 'text-green-500' : 'text-gray-500'}`}>
                                        <svg className={`w-3.5 h-3.5 me-2 flex-shrink-0 ${lowercaseRequirement ? 'text-green-500 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                        </svg>
                                        Al menos una letra minúscula
                                    </li>
                                    <li className={`flex items-center ${uppercaseRequirement ? 'text-green-500' : 'text-gray-500'}`}>
                                        <svg className={`w-3.5 h-3.5 me-2 flex-shrink-0 ${uppercaseRequirement ? 'text-green-500 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                        </svg>
                                        Al menos una letra mayúscula
                                    </li>
                                    {/* <li className={`flex items-center ${specialCharRequirement ? 'text-green-500' : 'text-gray-500'}`}>
                                        <svg className={`w-3.5 h-3.5 me-2 flex-shrink-0 ${specialCharRequirement ? 'text-green-500 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                        </svg>
                                        Al menos un carácter especial (!@#$%^&*_.)
                                    </li> */}
                                </ul>)
                            }                   
                    </div>
                    <div className="mb-5">
                        <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                        <input type="password" id="repeat-password" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="••••••••" required />
                        {passwordError && (
                            <p className="text-red-600 text-sm mt-2">{passwordError}</p>
                        )}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            required
                        >
                            <option value="Participante">Participante</option>
                            <option value="Organizador">Organizador</option>
                        </select>
                    </div>
                    <div className="mb-5">
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="Administrador" className="sr-only peer" 
                                checked={role === "Administrador"} 
                                disabled={isAdminExists} 
                                onChange={e => setRole(e.target.checked ? "Administrador" : "Participante")} />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Administrador</span>
                        </label>
                    </div>
                    <br />
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear nueva cuenta</button>
                </form>
            </div>
        </div>
    );
}

export default Register;