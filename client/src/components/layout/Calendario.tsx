import { useEffect, useState, useContext } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { getUserEventsByUserId, getUserEventsByEventId } from '../../api/userEvent';
import { getEventsById } from '../../api/events';
import UserContext from '../../context/UsersContext';

import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css' 
import dayjs from 'dayjs'


interface UserEvent {
    id_evento: number;
    id_usuario: number;
}
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
    const { user } = useContext(UserContext);

    const localizer = dayjsLocalizer(dayjs)

    const getCurrentUser = () => {
        if (!user) {
          const storedUser = localStorage.getItem('user');
          return storedUser ? JSON.parse(storedUser) : null;
        }  
        return user;
    };
    useEffect(() => {
        fetchEventUser();
    }, []);

    const transformEvents = (events: Event[]) => {
        return events.map(({ fecha_ini, fecha_fin, ...event }) => ({
            ...event, // Include all properties from the original event
            start: dayjs(fecha_ini).toDate(),
            end: dayjs(fecha_fin).toDate(),
            title: event.nombre,
        }));
    };

    const fetchEventUser = async () => {
        try {
            const user = getCurrentUser();
            const userEvents = await getUserEventsByUserId(user.id);
            const eventPromises = userEvents.map((userEvent: UserEvent) => getEventsById(userEvent.id_evento));
            const events = await Promise.all(eventPromises);
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
            />
        </div>
        
    );
};

export default Calendario;