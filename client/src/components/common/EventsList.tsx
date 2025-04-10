import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from "../../context/UsersContext";
import { getEvents } from '../../api/events';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const Eventos = () => {
    interface Event {
        id_evento: number;
        nombre: string;
        id_deporte: number;
        fecha_ini: string;
        fecha_fin: string;
        fecha_limite: string;
        lugar: string;
        hora_ini: string;
        maximo_usuarios: number;
        id_usuario_espera: number;
    }

    const [events, setEvents] = useState<Event[]>([]);
    const { user, isLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const data = await getEvents();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleCreateEventClick = () => {
        navigate('/create-event');
    };

    // const handleMyEventsClick = () => {
    //     navigate('/my-events'); 
    // };

    const rolUsuario = user?.role;
    return (
        <>
            <div className="flex mx-20 mt-6">
                {isLoggedIn && rolUsuario !== 'participante' && (
                    <button
                        onClick={handleCreateEventClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                        >
                        Crear evento
                    </button>
                )}
                {/* <div className="flex flex-col items-center">
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                            <li className="me-2">
                                <button
                                    onClick={() => navigate('/events')}  // Redirige a la página principal de eventos
                                    className="inline-flex items-center justify-center p-4 text-gray-600 border-b-2 border-gray-600 rounded-t-lg active dark:text-gray-500 dark:border-gray-500 group"
                                    aria-current="page"
                                >
                                    <svg className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />

                                    </svg>
                                    Eventos
                                </button>
                            </li>
                            {isLoggedIn && (
                                <li className="me-2">
                                    <button
                                        onClick={handleMyEventsClick}  // Redirige a la página de eventos del usuario
                                        className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                                    >
                                        <svg className="w-4 h-4 me-2 text-gray-600 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                        </svg>
                                        Mis eventos
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                            */}
            </div>

            {/* Aquí se muestra la lista de eventos generales */}
            <div className="grid grid-cols-3 gap-x-6 mx-20">
                {events.map((event, index) => (
                    <Link key={event.id_evento} to={`/events/${event.id_evento}`}>
                        <figure className="mt-4 relative hover:filter hover:grayscale">
                            <figcaption className="absolute inset-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <strong>
                                    <h1 className="text-gray-900">{event.nombre}</h1>
                                </strong>
                                <strong>
                                    <p className="text-gray-900">{dayjs.utc(event.fecha_ini).format('DD-MM-YYYY - HH:mm:ss')}</p>
                                </strong>
                                <strong>
                                    <p className="text-gray-900">{dayjs.utc(event.fecha_fin).format('DD-MM-YYYY - HH:mm:ss')}</p>
                                </strong>
                                <br />
                                <strong>
                                    <p className="block text-center">{event.lugar}</p>
                                </strong>
                            </figcaption>
                            <img
                                className="h-auto w-[630px] rounded-lg transition-all duration-300 cursor-pointer"
                                src={`https://flowbite.s3.amazonaws.com/docs/gallery/square/image-${index % 3 + 1}.jpg`}
                                alt=""
                            />
                        </figure>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Eventos;
