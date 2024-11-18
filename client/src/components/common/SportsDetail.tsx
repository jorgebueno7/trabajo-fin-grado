import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSportsById } from '../../api/sports';
import { getEventsBySport } from '../../api/sports';

const SportDetail = () => {
    interface Sport {
        id_deporte: number;
        nombre: string;
        descripcion: string;
        informacion: string;
        categoria: string;
        equipamiento: string;
    }

    interface Event {
        id_evento: number;
        nombre: string;
        fecha: string;
        lugar: string;
    }

    const { id } = useParams<{ id: string }>();
    const [sport, setSport] = useState<Sport | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [showEvents, setShowEvents] = useState(false);

    const navigate = useNavigate();
    const navigateToEventsFromSport = () => {
        navigate(`/events-by-sport/${id}`);
    } 


    useEffect(() => {
        const fetchSport = async () => {
            try {
                const data = await getSportsById(Number(id));
                setSport(data);
            } catch (error) {
                console.error('Error fetching sport:', error);
            }
        };

        fetchSport();
    }, [id]);

    const fetchEvents = async () => {
        try {
            const data = await getEventsBySport(Number(id));
            setEvents(data);
            setShowEvents(true);
            navigateToEventsFromSport();
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    if (!sport) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href={`/sports/${sport.id_deporte}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{sport.nombre}</h5>
                </a>
                <hr />
                <p className="text-gray-700 dark:text-gray-400">Descripción: <strong>{sport.descripcion}</strong></p>
                <p className="text-gray-700 dark:text-gray-400">Información: <strong>{sport.informacion}</strong></p>
                <p className="text-gray-700 dark:text-gray-400">Categoría: <strong>{sport.categoria}</strong></p>
                <p className="text-gray-700 dark:text-gray-400">Equipamiento: <strong>{sport.equipamiento}</strong></p>

                <button
                    onClick={fetchEvents}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Ver eventos asociados
                </button>

                {showEvents && events.length > 0 && (
                    <div className="mt-4">
                        <h4 className="text-xl font-semibold mb-2">Eventos asociados:</h4>
                        <ul>
                            {events.map((event) => (
                                <li key={event.id_evento} className="mb-2">
                                    <strong>{event.nombre}</strong> - {event.fecha} en {event.lugar}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {showEvents && events.length === 0 && (
                    <div className="mt-4 text-gray-700 dark:text-gray-400">
                        No hay eventos asociados a este deporte.
                    </div>
                )}
            </div>
        </div>
    );
};

export default SportDetail;
