import { useEffect, useState, useContext } from 'react';
import { useParams /*, useNavigate*/ } from 'react-router-dom';
import UserContext from '../context/UsersContext';
import { getEventsBySport, getSportsById } from '../api/sports';
// import { postUserEvent, getUserEvents } from '../api/userEvent';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import Footer from '../components/Footer';


const EventsBySportList = () => { 
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

    interface Sport {
        id_deporte: number;
        nombre: string;
    }

    const { id_deporte } = useParams<{ id_deporte: string }>(); // Obtenemos el id_deporte desde la URL
    const [events, setEvents] = useState<Event[]>([]);
    const [sport, setSport] = useState<Sport | null>(null);
    // const [userEvents, setUserEvents] = useState<number[]>([]); 
    const { isLoggedIn, user } = useContext(UserContext);
    // const navigate = useNavigate();

    // const navigateToLogin = () => {
    //     navigate('/login');
    // };

    // const navigateToMyEvents = () => {
    //     navigate('/my-events');
    // }

    const fetchEvents = async () => {
        if (id_deporte) {
            try {
                const data = await getEventsBySport(Number(id_deporte)); // Llamada a la API para obtener los eventos
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        }
    };

    const fetchSport = async () => {
        if (id_deporte) {
            try {
                const data = await getSportsById(Number(id_deporte)); // Llamada a la API para obtener el deporte
                setSport(data);
            } catch (error) {
                console.error('Error fetching sport:', error);
            }
        }
    };

    // const fetchUserEvents = async () => {
    //     if (isLoggedIn && user) {
    //         try {
    //             const data = await getUserEvents(); // Obtener la lista de eventos del usuario logueado
    //             const eventIds = data.map((event: Event) => event.id_evento); // Extraer los IDs de los eventos
    //             setUserEvents(eventIds);
    //         } catch (error) {
    //             console.error('Error fetching user events:', error);
    //         }
    //     }
    // };

    useEffect(() => {
        fetchEvents();
        fetchSport();
        // fetchUserEvents();
    }, [id_deporte, isLoggedIn, user]);

    // Handles para unirse al evento
    // const handleJoinEvent = async (id_evento: number) => {
    //     if (!isLoggedIn) {
    //         alert('Debes iniciar sesión para unirte a este evento');
    //         navigateToLogin();
    //         return;
    //     }
    //     try {
    //         if (user && events) {
    //             for (const event of events) {
    //                 await postUserEvent(event.id_evento);
    //             }
    //             alert('Te has unido al evento exitosamente');
    //             setUserEvents([...userEvents, id_evento]); // Actualiza la lista de eventos inscritos
    //         }
    //     } catch (error) {
    //         console.error('Error al unirse al evento:', error);
    //     }
    // };
    
    return (
        <>
            <div className="p-6 ml-3">
                <h1 className="text-2xl mb-4 ml-2">Eventos asociados al deporte: {sport ? <strong>{sport.nombre}</strong> : ''}</h1>
                <div className="grid grid-cols-2 gap-x-6">
                    {events.length > 0 ? (
                        (events.map((event) =>
                            <div key={event.id_evento} className="border p-4 mb-4 ml-2 rounded-lg bg-white shadow-md">
                                {/* <h1 className="text-xl font-bold mb-1">{event.nombre}</h1> */}
                                <p className="mb-3 mt-2 font-normal text-gray-700 dark:text-gray-400 hover:underline">
                                    <a className="font-xl text-xl text-blue-700 dark:text-blue-400 hover:underline" href={`/events/${event.id_evento}`}>{<strong>{event.nombre}</strong>}</a>
                                </p>
                                <hr className="mb-2 mt-2" />
                                <h4 className="mt-2"><strong>Fecha de inicio:</strong> {dayjs(event.fecha_ini).format('DD/MM/YYYY hh:mm:ss')}</h4>
                                <h4 className="mt-2"><strong>Fecha de fin:</strong> {dayjs(event.fecha_fin).format('DD/MM/YYYY hh:mm:ss')}</h4>
                                <h4 className="mt-2"><strong>Fecha límite de inscripción:</strong> {dayjs(event.fecha_limite).format('DD/MM/YYYY hh:mm:ss')}</h4>
                                <h4 className="mt-2"><strong>Lugar:</strong> {event.lugar}</h4>
                                <h4 className="mt-2"><strong>Hora de inicio:</strong> {event.hora_ini}</h4>
                                <h4 className="mt-2"><strong>Plazas disponibles:</strong> {event.maximo_usuarios}</h4>
                                {/* <button
                                    onClick={() => handleJoinEvent(event.id_evento)}
                                    className={`inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 
                                        ${
                                            userEvents.includes(event.id_evento) ? 'opacity-60 cursor-not-allowed' : ''
                                        }`}
                                    disabled={userEvents.includes(event.id_evento)}
                                >
                                    {userEvents.includes(event.id_evento) ? 'Unirse al evento' : 'Unirse al evento'}
                                </button>
                                { isLoggedIn ? (
                                    <button 
                                        onClick={() => navigateToMyEvents()}
                                        className="ml-3 inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700"
                                    >
                                        Consultar mis eventos
                                    </button>) : (<></>)
                                } */}
                            </div>
                            
                        ))
                    ) 
                    : 
                    (
                        <p>No hay eventos asociados a este deporte.</p>
                    )}
                </div>
            </div>  
            <Footer />
        </>
        
    );
};

export default EventsBySportList