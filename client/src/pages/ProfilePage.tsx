import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UsersContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { deleteProfile } from '../api/users';
import { getUserEvents } from '../api/userEvent';

const ProfilePage = () => {  
    interface Event {
        id_evento: number;
        id_usuario: number;
        Event: {
            nombre: string;
            fecha_ini: string;
            hora_ini: string;
            lugar: string;
        };
    }
    const { user, setUser } = useContext(UserContext);
    const [events, setEvents] = useState<Event[]>([]);
    const [showEvents, setShowEvents] = useState(false); // Estado para controlar la visibilidad de los eventos
    const navigate = useNavigate();

    const navigateToUpdateProfile = () => {
        navigate('/update-profile');
    };

    useEffect(() => {
        const fetchUserEvents = async () => {
            try {
                const userEvents = await getUserEvents();
                setEvents(userEvents);
            } catch (error) {
                console.error('Error obteniendo eventos:', error);
                alert('Hubo un error al obtener los eventos. Inténtalo de nuevo más tarde.');
            }
        };

        fetchUserEvents();
    }, []);

    const handleDeleteProfile = async () => {
        const confirmed = window.confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.");
        if (!confirmed) return;

        try {
            await deleteProfile();
            setUser(null); 
            navigate('/login'); 
        } catch (error) {
            console.error('Error eliminando perfil:', error);
            alert('Hubo un error al eliminar el perfil. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen overflow-y-auto p-5">
            <div className={`w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 grid ${showEvents ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
                <div>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">{user?.nombre} {user?.apellidos}</h5>
                    <hr className="mb-4" />
                    <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Email:</strong> {user?.email}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Fecha de nacimiento:</strong> {dayjs.utc(user?.fecha_nacimiento).format('DD-MM-YYYY')}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Teléfono:</strong> {user?.telefono}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Dirección:</strong> {user?.direccion}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Altura:</strong> {user?.altura} cm</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Peso:</strong> {user?.peso} kg</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Deporte:</strong> {user?.deporte}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Mejor marca:</strong> {user?.mejor_marca}</p>
                    <button 
                        onClick={() => setShowEvents(!showEvents)} // Botón para mostrar/ocultar el div de eventos
                        className="w-full mt-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                    >
                        {showEvents ? 'Ocultar mis eventos' : 'Consultar mis eventos'}
                    </button>
                    <button 
                        onClick={navigateToUpdateProfile}
                        className="w-full mt-3 text-white bg-green-700 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" 
                    >
                        Actualizar perfil
                    </button>
                    <button 
                        onClick={handleDeleteProfile}
                        className="w-full mt-3 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" 
                    >
                        Eliminar perfil
                    </button>
                    
                </div>
                {showEvents && (
                    <div className="transition-opacity duration-500 opacity-100">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Eventos Inscritos</h5>
                        {events.length > 0 ? (
                            events.map((userEvent) => (
                                <div key={userEvent.id_evento} className="mt-3">
                                    <hr className="mb-4" />
                                    <p><strong>Nombre:</strong> {userEvent.Event.nombre}</p>
                                    <p><strong>Fecha:</strong> {dayjs(userEvent.Event.fecha_ini).format('DD-MM-YYYY')}</p>
                                    <p><strong>Hora:</strong> {userEvent.Event.hora_ini}</p>
                                    <p><strong>Lugar:</strong> {userEvent.Event.lugar}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">No estás inscrito a ningún evento.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;