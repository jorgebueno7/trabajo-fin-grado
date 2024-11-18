import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserEvents, deleteUserEvent } from '../../api/userEvent'; // Asumiendo que tienes esta función ya implementada
import UserContext from '../../context/UsersContext';
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
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const navigateToEventDetail = (id_evento: number) => {
        navigate(`/events/${id_evento}`);
    };

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


    const handleLeaveEvent = async (id_evento: number) => {
        if (user) {
            try {
                await deleteUserEvent(id_evento); // Llama a la API para eliminar el usuario del evento
                setEvents(events.filter(event => event.id_evento !== id_evento)); // Elimina el evento de la lista local
                alert('Te has dado de baja del evento.');
            } catch (error) {
                console.error('Error al eliminar el evento:', error);
                alert('Hubo un error al intentar darte de baja.');
            }
        }
    };

    const navigateCreateRatingEvent = (id_evento: number) => {
        navigate(`/create-rating/${id_evento}`);
    };

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
                        <button
                            onClick={() => handleLeaveEvent(event.id_evento)}
                            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Darse de baja
                        </button>
                        <button
                            onClick={() => navigateToEventDetail(event.id_evento)}
                            className="mt-3 ml-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            + Información del evento
                        </button>
                        <button
                            onClick={() => navigateCreateRatingEvent(event.id_evento)}
                            className="mt-3 ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Valorar evento
                        </button>
                    </div>
                    
                )) 
                : 
                (<p>No estás inscrito en ningún evento.</p>)
            }
        </div>
    );
};

export default ListUserEvents;
