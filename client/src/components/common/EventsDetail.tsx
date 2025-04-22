import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UsersContext';
import { useParams } from 'react-router-dom';
import { getEventsById } from '../../api/events';
import { getUserEventsByEventId, postUserEvent } from '../../api/userEvent';
import { getSports } from '../../api/sports';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const EventDetail = () => {
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
        estado: string;
        id_usuario_espera: number;
    }
    interface Sport {
        id_deporte: number;
        nombre: string;
    }

    const [sports, setSports] = useState<Sport[]>([]);
    const [event, setEvent] = useState<Event | null>(null);
    const [users, setUsers] = useState<number[]>([]);
    const { isLoggedIn, user } = useContext(UserContext);
    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    // Redirigir a login si el usuario no está logueado
    const navigateToLogin = () => {
        navigate('/login');
    };

    const handleViewRatings = () => {
        if (event) {
            navigate(`/ratings/event/${event.id_evento}`);
        }
    };

    // Obtener deportes
    useEffect(() => {
        const fetchSports = async () => {
            try {
                const sportsData = await getSports();
                setSports(sportsData);
            } catch (error) {
                console.error('Error fetching sports:', error);
            }
        };
        fetchSports();
    }, []);

    // Obtener datos del evento y usuarios inscritos
    const fetchEvent = async () => {
        try {
            const data = await getEventsById(Number(id));
            data.fecha_ini = dayjs.utc(data.fecha_ini).format('DD-MM-YYYY');
            data.fecha_fin = dayjs.utc(data.fecha_fin).format('HH:mm:ss');
            data.fecha_limite = dayjs.utc(data.fecha_limite).format('DD-MM-YYYY');
            setEvent(data);

            const userData = await getUserEventsByEventId(Number(id));
            setUsers(userData.map((userEvent: any) => userEvent.id_usuario));
        } catch (error) {
            console.error('Error fetching event:', error);
        }
    };

    useEffect(() => {
        fetchEvent();
    }, [id]);

    // Unirse al evento
    const handleJoinEvent = async () => {
        if (!isLoggedIn) {
            alert('Debes iniciar sesión para unirte a este evento');
            navigateToLogin();
            return;
        }
        try {
            if (user && event) {
                await postUserEvent(event.id_evento);
                alert('Te has unido al evento exitosamente');
                fetchEvent(); // Refresca los datos del evento después de unirse
            }
        } catch (error) {
            console.error('Error al unirse al evento:', error);
        }
    };

    // Obtener color de la barra de progreso según porcentaje
    const getProgressBarColor = (percentage: number) => {
        if (percentage < 50) {
            return 'bg-blue-600 text-white';
        } else if (percentage < 75) {
            return 'bg-yellow-400 text-gray-900';
        } else {
            return 'bg-red-600 text-white';
        }
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    // Calcular porcentaje de usuarios inscritos
    const percentage = (users.length / event.maximo_usuarios) * 100;
    const progressBarColor = getProgressBarColor(percentage);
    const eventSport = sports.find((sport) => sport.id_deporte === event.id_deporte);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.nombre}</h5>
                </a>
                <hr />
                <br />
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 hover:underline">
                    Deporte: <a className="font-normal text-blue-700 dark:text-blue-400 hover:underline" href={`/sports/${event.id_deporte}`}>{eventSport && <strong>{eventSport.nombre}</strong>}</a>
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Fecha inicio del evento: <strong>{event.fecha_ini}</strong></p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Estado del evento: 
                    <span 
                        className={`ml-1 font-bold
                            ${event.estado === 'sin_comenzar' ? 'text-blue-500' : ''}
                            ${event.estado === 'en_curso' ? 'text-green-500' : ''}
                            ${event.estado === 'finalizado' ? 'text-red-500' : ''}`}
                    >
                        {event.estado === 'sin_comenzar' ? 'Sin comenzar' : ''}
                        {event.estado === 'en_curso' ? 'En curso' : ''}
                        {event.estado === 'finalizado' ? 'Finalizado' : ''}
                    </span>
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Hora de inicio del evento: <strong>{event.hora_ini}</strong></p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Hora final del evento: <strong>{event.fecha_fin}</strong></p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Lugar del evento: <strong>{event.lugar}</strong></p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Máximo de usuarios: <strong>{event.maximo_usuarios}</strong></p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Fecha límite de inscripción: <strong>{event.fecha_limite}</strong></p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Cantidad de usuarios inscritos: <strong>{users.length}</strong></p>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div className={`${progressBarColor} text-xs font-medium text-center p-0.5 leading-none rounded-full`} style={{ width: `${percentage}%` }}>
                        {percentage}%
                    </div>
                </div>
                <button
                    onClick={handleJoinEvent}
                    disabled={!isLoggedIn || (user && users.includes(user.id)) || (event.estado === 'en_curso' || event.estado === 'finalizado')}
                    className={`inline-flex items-center px-3 py-2 mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 
                        ${(!isLoggedIn || (user && users.includes(user.id)) || (event.estado === 'en_curso' || event.estado === 'finalizado')) ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    {user && users.includes(user.id) ? 'Unirse al evento' : 'Unirse al evento'}
                </button>
                <button
                    onClick={handleViewRatings}
                    className="inline-flex items-center px-3 py-2 mt-6 ml-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600"
                >
                    Ver valoraciones
                </button>
            </div>
        </div>
    );
};

export default EventDetail;
