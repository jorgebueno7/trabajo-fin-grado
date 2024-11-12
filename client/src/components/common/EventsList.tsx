import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getEvents } from '../../api/events';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const Eventos = () => {
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
      
    const [events, setEvents] = useState<Event[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents(); 
    }, []);
    
    const fetchEvents = async () => {
        try {
            const data = await getEvents();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    const handleCreateEventClick = () => {
        navigate('/create-event');
    };

    return (
        <>
            <div className="flex justify-end m-5">
                <button 
                    onClick={handleCreateEventClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Crear evento
                </button>
            </div>
            <div className="grid grid-cols-3 gap-x-6 mx-20">
                {events.map((event, index) => (
                    <Link key={event.id_evento} to={`/events/${event.id_evento}`}>
                        <figure className="mt-4 relative hover:filter hover:grayscale">
                            <figcaption className="absolute inset-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <strong><h1 className="text-gray-900">{event.nombre}</h1></strong>      
                                <strong><p className="text-gray-900">{dayjs.utc(event.fecha_ini).format('DD-MM-YYYY - HH:mm:ss')}</p></strong>      
                                <strong><p className="text-gray-900">{dayjs.utc(event.fecha_fin).format('DD-MM-YYYY - HH:mm:ss')}</p></strong>                      
                                <br></br>
                                <strong><p className="block text-center">{event.lugar}</p></strong>
                            </figcaption>
                                <img className="h-auto w-[630px] rounded-lg transition-all duration-300 cursor-pointer" 
                                    src={`https://flowbite.s3.amazonaws.com/docs/gallery/square/image-${index % 3 + 1}.jpg`} alt=""></img>
                        </figure>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Eventos;