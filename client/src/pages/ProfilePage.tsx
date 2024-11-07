import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UsersContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const ProfilePage = () => {  
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const navigateToUpdateProfile = () => {
        navigate('/update-profile');
    }

    return (
        <div className="flex items-center justify-center min-h-screen overflow-y-auto">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="p-5">
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
                        </div>  
                        <button 
                            onClick={navigateToUpdateProfile}
                            type="submit" 
                            className="w-full mt-3 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" 
                        >
                            Actualizar perfil
                        </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;







// import { useContext } from 'react';
// import UserContext from '../context/UsersContext';
// import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
// dayjs.extend(utc);

// const ProfilePage = () => {   
//     const { user, loading, error } = useContext(UserContext); // Incluye error y loading

//     if (loading) {
//         return <p className='ml-8'>Cargando...</p>; // Muestra cargando
//     }

//     if (error) {
//         return <p className='ml-8'>{error}</p>; // Muestra error
//     }

//     if (!user) {
//         return <p className='ml-8'>No se encontró información del usuario.</p>; // Mensaje si no hay usuario
//     }

//     return (
//         <div className="flex items-center justify-center min-h-screen overflow-y-auto">
//             <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//                 <div className="p-5">
//                     <div>
//                         <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//                             {user.nombre} {user.apellidos}
//                         </h5>    
//                         <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Email:</strong> {user.email}</p>
//                         <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Fecha de nacimiento:</strong> {dayjs.utc(user.fecha_nacimiento).format('DD-MM-YYYY')}</p>
//                         <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Teléfono:</strong> {user.telefono}</p>
//                         <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Dirección:</strong> {user.direccion}</p>
//                         <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Altura:</strong> {user.altura} cm</p>
//                         <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Peso:</strong> {user.peso} kg</p>
//                         <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Deporte:</strong> {user.deporte}</p>
//                         <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Mejor marca:</strong> {user.mejor_marca}</p>
//                     </div>  
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;
