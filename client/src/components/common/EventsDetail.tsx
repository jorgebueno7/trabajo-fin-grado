import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventsById } from '../../api/events';

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
    const fetchEvent = async () => {
        try {
            const data = await getEventsById(Number(id));
            setEvent(data);
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
        <div>
            <h1>{event.id_deporte}</h1>
            <p>{event.fecha_ini}</p>
            <p>{event.fecha_limite}</p>
            <p>{event.lugar}</p>
            <p>{event.hora_ini}</p>
            <p>{event.maximo_usuarios}</p>
        </div>
    );
};

export default EventDetail;