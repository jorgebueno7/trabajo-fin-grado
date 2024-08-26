import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventsById } from '../../api/events';
import { getUserEventsByEventId } from '../../api/userEvent';
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
        id_usuario_espera: number;
    }

    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [users, setUsers] = useState<number[]>([]);

    const fetchEvent = async () => {
        try {
            const data = await getEventsById(Number(id));
            data.fecha_ini = dayjs.utc(data.fecha_ini).format('DD-MM-YYYY');
            data.fecha_fin = dayjs.utc(data.fecha_fin).format('HH:mm:ss');
            data.fecha_limite = dayjs.utc(data.fecha_limite).format('DD-MM-YYYY');
            setEvent(data);

            const userData = await getUserEventsByEventId(Number(id));
            setUsers(userData);
        } catch (error) {
            console.error('Error fetching event:', error);
        }
    };

    useEffect(() => {
        fetchEvent();
    }, [id]);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href={`/sports/${event.id_deporte}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.nombre}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Fecha inicio del evento: <strong>{event.fecha_ini}</strong></p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Hora de inicio del evento: <strong>{event.hora_ini}</strong></p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Hora final del evento: <strong>{event.fecha_fin}</strong></p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Lugar del evento: <strong>{event.lugar}</strong></p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Máximo de usuarios: <strong>{event.maximo_usuarios}</strong></p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Fecha límite de inscripción: <strong>{event.fecha_limite}</strong></p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Cantidad de usuarios inscritos: <strong>{users.length}</strong></p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>
        
    );
};

export default EventDetail;