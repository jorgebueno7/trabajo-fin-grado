import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UsersContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { deleteProfile } from '../api/users';
import { getUserEvents, getEventsByOrganizer } from '../api/userEvent';
import { putEventStatus } from '../api/events';

const ProfilePage = () => {  
    interface Event {
        id_evento: number;
        id_usuario: number;
        createdBy: string;
        Event: {
            nombre: string;
            fecha_ini: string;
            hora_ini: string;
            lugar: string;
            clasificacion: string;
            estado: string;
            Sport: {
                nombre: string;
            };
        }; 
    }

    interface EventOrganizer {
        id_evento: number;
        id_usuario: number;
        createdBy: string;
        nombre: string;
        fecha_ini: string;
        hora_ini: string;
        lugar: string;
        clasificacion: string;
        estado: string;
        maximo_usuarios: number;
        Sport: {
            nombre: string;
        };
    }

    const { user } = useContext(UserContext);
    const [events, setEvents] = useState<Event[]>([]);
    const [eventsOrganizer, setEventsOrganizer] = useState<EventOrganizer[]>([]);

    const rolUsuario = user?.role;

    const navigate = useNavigate();
    const navigateToUpdateProfile = () => {
        navigate('/update-profile');
    };

    const fetchUserEvents = async () => {
        try {
            const userEvents = await getUserEvents();
            setEvents(userEvents);
        } catch (error) {
            console.error('Error obteniendo eventos:', error);
            alert('Hubo un error al obtener los eventos. Inténtalo de nuevo más tarde.');
        }
    };

    const fetchEventsByOrganizer = async () => {
        try {
            const userEvents = await getEventsByOrganizer();
            setEventsOrganizer(userEvents);
        } catch (error) {
            console.error('Error obteniendo eventos:', error);
            alert('Hubo un error al obtener los eventos. Inténtalo de nuevo más tarde.');
        }
    };

    useEffect(() => {
        if(rolUsuario === 'participante') {
            fetchUserEvents();
        } else {
            fetchEventsByOrganizer();
        }
    }, 
    [user]);

    const getNextState = (currentState: string) => {
        if (currentState === 'sin_comenzar') return 'en_curso';
        if (currentState === 'en_curso') return 'finalizado';
        return null; // Si ya está finalizado, no cambia
    };
    
    const updateEventState = (updatedEvent: Event) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id_evento === updatedEvent.id_evento ? updatedEvent : event
            )
        );
    };

    const updateStatusFromEvent = async (id_evento: number, currentState: string) => {
        try {
            // Obtén el siguiente estado
            const newState = getNextState(currentState);
            if (!newState) {
                console.log('No hay siguiente estado disponible');
                return;
            }
    
            // Envía la solicitud para actualizar el evento con el nuevo estado
            const response = await putEventStatus(id_evento, { estado: newState });
            console.log('Estado del evento actualizado:', response.evento);

            updateEventState(response.evento);
        } catch (error) {
            console.error('Error actualizando evento:', error);
            alert('Hubo un error al actualizar el evento. Inténtalo de nuevo más tarde.');
        }
    };

    
    
    return (
        <>
            { rolUsuario === 'administrador' ? 
                (
                    <>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm 
                                    hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 grid-cols-1 ml-8">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user?.nombre} {user?.apellidos}</h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                </a>
                            </div>
                            <div>
                                <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm 
                                    hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 grid-cols-1 ml-8">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user?.nombre} {user?.apellidos}</h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                </a>
                            </div>
                            <div>
                                <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm 
                                    hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 grid-cols-1 ml-8">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user?.nombre} {user?.apellidos}</h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                </a>
                            </div>
                        </div>
                    </>
                ) 
                : 
                (<></>)
            }
            { rolUsuario === 'participante' ? 
                (
                    <>
                        {/* Grid con información del usuario */}
                        <div className="grid grid-cols-3 gap-4 mt-8 p-2">
                            <div>
                                <a className="block max-w p-4 bg-white border border-gray-200 rounded-lg shadow-sm 
                                    hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user?.nombre} {user?.apellidos}</h3>
                                    <hr></hr>
                                    <div className='mt-4'>
                                        <p><strong>Email: </strong>{user?.email}</p>
                                        <p><strong>Fecha de nacimiento: </strong>{dayjs.utc(user?.fecha_nacimiento).format('DD-MM-YYYY')}</p>
                                        <p><strong>Teléfono: </strong>{user?.telefono}</p>
                                        <p><strong>Dirección: </strong>{user?.direccion}</p>
                                        <p><strong>Altura: </strong>{user?.altura} cm</p>
                                        <p><strong>Peso: </strong>{user?.peso} kg</p>
                                        <p><strong>Deporte favorito: </strong>{user?.deporte}</p>
                                        <p><strong>Mejor marca: </strong>{user?.mejor_marca}</p>
                                        <button 
                                            onClick={navigateToUpdateProfile}
                                            className="w-30 mt-3 text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium 
                                                rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" 
                                        >
                                            Actualizar perfil
                                        </button>
                                    </div>
                                </a>
                            </div>
                            <div>
                                <a className="block max-w p-6 bg-white border border-gray-200 rounded-lg shadow-sm 
                                    hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Proximos eventos</h3>
                                    <hr></hr>
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-3">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">Evento</th>
                                                <th scope="col" className="px-6 py-3">Fecha de evento</th>
                                                <th scope="col" className="px-6 py-3">Lugar del evento</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {events.filter(event => event.Event.estado === 'sin_comenzar').map((userEvent) => (
                                                <tr key={userEvent.id_usuario} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="px-6 py-4">{userEvent.Event.nombre}</td>
                                                    <td className="px-6 py-4">{dayjs(userEvent.Event.fecha_ini).format('DD-MM-YYYY')}</td>
                                                    <td className="px-6 py-4">{userEvent.Event.lugar}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </a>
                            </div>
                            <div>
                                <a className="block max-w p-6 bg-white border border-gray-200 rounded-lg shadow-sm 
                                    hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Estadísticas</h5>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="block">
                                            <strong><h1>Deportes favoritos</h1></strong>
                                            <div className="mt-2">
                                                {events.map((userEvent) => (
                                                    <p key={userEvent.id_usuario}>{userEvent.Event.Sport.nombre}</p>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="block">
                                            <h1>Grid de eventos</h1>
                                        </div>
                                    </div>
                                    <button 
                                        // onClick={}
                                        className="w-30 mt-3 text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium 
                                            rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" 
                                    >
                                        Actualizar perfil
                                    </button>
                                </a>
                            </div>
                        </div>
                        {/* Listado de eventos que ha finalizado el usuario */}
                        <div>
                            <h1 className="mt-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-8">Eventos finalizados</h1>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ml-4 mt-3">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Evento</th>
                                        <th scope="col" className="px-6 py-3">Deporte</th>
                                        <th scope="col" className="px-6 py-3">Fecha de evento</th>
                                        <th scope="col" className="px-6 py-3">Lugar del evento</th>
                                        <th scope="col" className="px-6 py-3">Clasificación</th>

                                        <th scope="col" className="px-6 py-3">Mejor resultado obtenido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.filter(event => event.Event.estado === 'finalizado').map((userEvent) => (
                                        <tr key={userEvent.id_usuario} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{userEvent.Event.nombre}</th>
                                            <td className="px-6 py-4">{userEvent.Event.Sport.nombre}</td>
                                            <td className="px-6 py-4">{dayjs(userEvent.Event.fecha_ini).format('DD-MM-YYYY')}</td>
                                            <td className="px-6 py-4">{userEvent.Event.lugar}</td>
                                            <td className="px-6 py-4">{userEvent.Event.clasificacion}</td>
                                            {/* <td className="px-6 py-4">{userEvent.mejor_resultado}</td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) 
                : 
                (<></>)
            }
            { rolUsuario === 'organizador' ? 
                (
                    <>
                        <div className="grid grid-cols-3 gap-4 mt-8 p-2">
                            <div>
                                <a className="block max-w p-4 bg-white border border-gray-200 rounded-lg shadow-sm 
                                    hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user?.nombre} {user?.apellidos}</h3>
                                    <hr></hr>
                                    <div className='mt-4'>
                                        <p><strong>Email: </strong>{user?.email}</p>
                                        <p><strong>Fecha de nacimiento: </strong>{dayjs.utc(user?.fecha_nacimiento).format('DD-MM-YYYY')}</p>
                                        <p><strong>Teléfono: </strong>{user?.telefono}</p>
                                        <p><strong>Dirección: </strong>{user?.direccion}</p>
                                        <p><strong>Altura: </strong>{user?.altura} cm</p>
                                        <p><strong>Peso: </strong>{user?.peso} kg</p>
                                        <p><strong>Deporte favorito: </strong>{user?.deporte}</p>
                                        <p><strong>Mejor marca: </strong>{user?.mejor_marca}</p>
                                        <button 
                                            onClick={navigateToUpdateProfile}
                                            className="w-30 mt-3 text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium 
                                                rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" 
                                        >
                                            Actualizar perfil
                                        </button>
                                    </div>
                                </a>
                            </div>
                            <div className="col-span-2">
                                <a className="block max-w p-6 bg-white border border-gray-200 rounded-lg shadow-sm 
                                    hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Eventos finalizados</h3>
                                    <hr></hr>
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-3">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">Evento</th>
                                                <th scope="col" className="px-6 py-3">Fecha de evento</th>
                                                <th scope="col" className="px-6 py-3">Lugar del evento</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                            eventsOrganizer.filter(event => event.createdBy === user?.email && event.estado === 'finalizado')
                                                .map((userEvent) => (
                                                <tr key={userEvent.id_usuario} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="px-6 py-4">{userEvent.nombre}</td>
                                                    <td className="px-6 py-4">{dayjs(userEvent.fecha_ini).format('DD-MM-YYYY')}</td>
                                                    <td className="px-6 py-4">{userEvent.lugar}</td>
                                                    <td className="px-6 py-4">
                                                        <button 
                                                            className="text-blue-600 dark:text-blue-400 hover:underline">
                                                            Añadir estadísticas
                                                        </button>
                                                    </td>                                                
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </a>
                            </div>
                        </div>
                        {/* Listado de eventos que ha finalizado el usuario */}
                        <div>
                            <h1 className="mt-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-8">Eventos creados</h1>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ml-4 mt-3">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Evento</th>
                                        <th scope="col" className="px-6 py-3">Deporte</th>
                                        <th scope="col" className="px-6 py-3">Fecha de evento</th>
                                        <th scope="col" className="px-6 py-3">Lugar del evento</th>
                                        <th scope="col" className="px-6 py-3">Máximo de usuarios</th>
                                        <th scope="col" className="px-6 py-3">Estado del evento</th>
                                        <th scope="col" className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventsOrganizer.filter(event => event.createdBy === user?.email).map((userEvent) => (
                                        <tr key={userEvent.id_usuario} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{userEvent.nombre}</th>
                                            <td className="px-6 py-4">{userEvent.Sport.nombre}</td>
                                            <td className="px-6 py-4">{dayjs(userEvent.fecha_ini).format('DD-MM-YYYY')}</td>
                                            <td className="px-6 py-4">{userEvent.lugar}</td>
                                            <td className="px-6 py-4">{userEvent.maximo_usuarios}</td>
                                            <td className="px-6 py-4">
                                                <span 
                                                    className={`px-3 py-1 rounded-lg text-white font-semibold
                                                        ${userEvent.estado === 'sin_comenzar' ? 'bg-blue-500' : ''}
                                                        ${userEvent.estado === 'en_curso' ? 'bg-green-500' : ''}
                                                        ${userEvent.estado === 'finalizado' ? 'bg-red-500' : ''}`}
                                                    >
                                                    {userEvent.estado === 'sin_comenzar' ? 'Sin comenzar' : ''}
                                                    {userEvent.estado === 'en_curso' ? 'En curso' : ''}
                                                    {userEvent.estado === 'finalizado' ? 'Finalizado' : ''}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {userEvent.estado !== 'finalizado' && (
                                                    <button 
                                                        onClick={() => updateStatusFromEvent(userEvent.id_evento, userEvent.estado)} 
                                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                                    >
                                                        Cambiar estado
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) 
                : 
                (<></>)
            }
        </>
    );
};

export default ProfilePage;