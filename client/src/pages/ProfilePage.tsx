import { useContext } from 'react';
import UserContext from '../context/UsersContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const ProfilePage = () => {   
    const { user } = useContext(UserContext);
    const isProfileComplete = user && user.profile_complete;
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
                            <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Email:</strong> {user?.email}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Fecha de nacimiento:</strong> {dayjs.utc(user?.fecha_nacimiento).format('DD-MM-YYYY')}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Teléfono:</strong> {user?.telefono}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Dirección:</strong> {user?.direccion}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Altura:</strong> {user?.altura} cm</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Peso:</strong> {user?.peso} kg</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Deporte:</strong> {user?.deporte}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Mejor marca:</strong> {user?.mejor_marca}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Role:</strong> {user?.role}</p>
                        </div>  
                   )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;