import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventsBySport } from '../../api/sports';

const EventsBySportList = () => { 
    interface Event {
        id_evento: number;
        nombre: string;
        fecha: string;
        lugar: string;
    }

    const { id_deporte } = useParams<{ id_deporte: string }>(); // Obtenemos el id_deporte desde la URL
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
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

        fetchEvents();
    }, [id_deporte]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Eventos del deporte</h1>
            {events.length > 0 ? (
                <ul>
                    {events.map((event) => (
                        <li key={event.id_evento} className="mb-2">
                            <strong>{event.nombre}</strong> - {event.fecha} en {event.lugar}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay eventos asociados a este deporte.</p>
            )}
        </div>
    );
};

export default EventsBySportList