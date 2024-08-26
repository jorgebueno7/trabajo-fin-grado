import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getEvents } from '../../api/events';
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css' 
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

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

interface TransformedEvent {
    id_evento: number;
    nombre: string;
    id_deporte: number;
    fecha_limite: string;
    lugar: string;
    hora_ini: string;
    maximo_usuarios: number;
    id_usuario_espera: number;
    start: Date;
    end: Date;
    title: string;
}

const Calendario = () => {
    const [events, setEvents] = useState<TransformedEvent[]>([]);
    const localizer = dayjsLocalizer(dayjs)

    useEffect(() => {
        fetchEventUser();
    }, []);
    const navigate = useNavigate();
    const navigateDetail = (event: TransformedEvent) => {
        navigate(`/events/${event.id_evento}`);
    };
    const transformEvents = (events: Event[]) => {
        return events.map(({ fecha_ini, fecha_fin, ...event }) => ({
            ...event,
            start: dayjs.utc(fecha_ini).toDate(),
            end: dayjs.utc(fecha_fin).toDate(),
            title: event.nombre,
        }));
    };

    const fetchEventUser = async () => {
        try {
            const events = await getEvents();
            const transformedEvents = transformEvents(events);
            setEvents(transformedEvents);
        } catch (error) {
            console.error(error);
        }
    };

    const eventos = events;

    return (
        <div className="mt-4" style={{height: "90vh", width: "100%"}}>
            <Calendar
                localizer={localizer}
                events={eventos}
                onSelectEvent={navigateDetail}
            />
        </div>
        
    );
};

export default Calendario;