import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventsBySport, getSportsById } from '../../api/sports';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

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

        fetchEvents();
        fetchSport();
    }, [id_deporte]);

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">Eventos asociados al deporte: {sport ? <strong>{sport.nombre}</strong> : ''}</h1>
            {events.length > 0 ? (
                <ul>
                    {events.map((event) => (
                        <li key={event.id_evento} className="mb-2">
                            <strong>{event.nombre}</strong> - {dayjs(event.fecha_ini).format('DD/MM/YYYY')} en {event.lugar}
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