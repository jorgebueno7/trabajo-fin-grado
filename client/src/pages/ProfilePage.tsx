import { useContext, useEffect } from 'react';
import UserContext from '../context/UsersContext';

const ProfilePage = () => {   
    const { user, isProfileComplete, setProfileComplete } = useContext(UserContext);

    // Al cargar el perfil, verifica si está completo
    useEffect(() => {
        const profileComplete = localStorage.getItem('profileComplete');
        if (profileComplete == 'true') {
            setProfileComplete(true);
        }
    }, []);

    // Almacena el estado del perfil en el localStorage
    useEffect(() => {
        setProfileComplete(true);
        localStorage.setItem('profileComplete', 'true');
    }, [isProfileComplete]);

    return (
        <div className="flex items-center justify-center min-h-screen overflow-y-auto">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="p-5">
                    {!isProfileComplete ? (
                        <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700" role="alert">
                            <p className="font-bold">Perfil incompleto</p>
                            <p>Por favor, complete toda la información de su perfil para una mejor experiencia.</p>
                            <br></br>
                            <a href="/perfil-form" className="text-blue-600">Completar perfil</a>
                        </div>
                    ) : (
                        <div>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user?.nombre} {user?.apellidos}</h5>    
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{user?.email}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">{user?.fecha_nacimiento}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">{user?.telefono}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">{user?.direccion}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">{user?.altura}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">{user?.direccion}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">{user?.peso}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">{user?.deporte}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">{user?.mejor_marca}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">{user?.role}</p>
                        </div>  
                   )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;