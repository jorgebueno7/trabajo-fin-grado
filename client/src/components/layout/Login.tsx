// import { GoogleLogin } from '@react-oauth/google';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import UserContext from '../../context/UsersContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const { setLoggedIn, setUser, setIsAdmin } = useContext(UserContext);
    // const { setUser } = useContext(UserContext);

    const navigate = useNavigate();
    const navigateProfile = () => {
        navigate('/perfil');
    };
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/login', { email, password }, { withCredentials: true });
            if (response.status === 200) {
                console.log("Usuario en el response.data: " + response.data);
                setUser(response.data.user); // Establecer el usuario en el contexto
                if (response.data.user.isAdminUser) {
                    console.log("El usuario es administrador");
                    setIsAdmin(true); 
                }
                setLoggedIn(true); // Marcar como logueado
                navigate('/perfil'); // Redirigir a la página de perfil
            }

            navigateProfile();
        } catch (error) {
            console.error(error);
            setLoginError(true);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen overflow-y-auto">
            <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6 max-w-sm mx-auto" onSubmit={handleSubmit}>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Iniciar sesión</h5>
                    {loginError && <p className="text-red-500">Usuario o contraseña incorrectos</p>}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="example@sportly.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Iniciar sesión</button>
                        {/* <GoogleLogin 
                            onSuccess={credentialResponse => { console.log(credentialResponse); }}
                            onError={() => { console.log('Login Failed'); }}
                        /> */}
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        ¿No estás registrado? <a href="/register" className="text-blue-700 hover:underline dark:text-blue-500">Crear una cuenta</a>
                    </div>
                </form>
            </div>
        </div>
    );
} 

export default Login;