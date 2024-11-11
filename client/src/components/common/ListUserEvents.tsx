import { useEffect, useState } from 'react';
import { getUserEvents } from '../../api/userEvent'; // Asumiendo que tienes esta función ya implementada
import dayjs from 'dayjs';

const ListUserEvents = () => {
    interface Event {
        id_evento: number;
        id_usuario: number;
        Event: {
            nombre: string;
            fecha_ini: string;
            hora_ini: string;
            lugar: string;
        };
    }
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchUserEvents = async () => {
        try {
            const userEvents = await getUserEvents(); // Llama a la API para obtener los eventos
            setEvents(userEvents);
        } catch (error) {
            console.error('Error obteniendo eventos:', error);
            alert('Hubo un error al obtener los eventos.');
        }
        };

        fetchUserEvents();
    }, []);
  
    return (
        <div className="p-5">
        <h1 className="text-2xl font-bold mb-4 ml-2">Mis eventos</h1>
            {events.length > 0 ? 
                (events.map((event) => 
                    <div key={event.id_evento} className="border p-4 mb-4 ml-2 rounded-lg bg-white shadow-md">
                        <h3 className="text-xl font-bold mb-1">{event.Event.nombre}</h3>
                        <hr className='mb-2' />
                        <p><strong>Fecha:</strong> {dayjs(event.Event.fecha_ini).format('DD-MM-YYYY')}</p>
                        <p><strong>Hora:</strong> {event.Event.hora_ini}</p>
                        <p><strong>Lugar:</strong> {event.Event.lugar}</p>
                    </div>
                )) 
                : 
                (<p>No estás inscrito en ningún evento.</p>)
            }
        </div>
    );
};

export default ListUserEvents;
