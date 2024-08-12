import React, { useEffect, useState } from 'react';
import { getEvents } from '../../api/events';

const Eventos = () => {
    interface Event {
        id_evento: number;
        id_deporte: number;
        fecha_ini: string;
        fecha_limite: string;
        lugar: string;
        hora_ini: string;
        maximo_usuarios: number;
        id_usuario_espera: number;
    }
      
    const [events, setEvents] = useState<Event[]>([]);

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

    return (
        <div>
            <h1>Eventos</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Deporte</th>
                        <th scope="col" className="px-6 py-3">Fecha inicio</th>
                        <th scope="col" className="px-6 py-3">Fecha límite inscripción</th>
                        <th scope="col" className="px-6 py-3">Lugar</th>
                        <th scope="col" className="px-6 py-3">Hora de inicio</th>
                        <th scope="col" className="px-6 py-3">Máximo de usuarios</th>
                        <th scope="col" className="px-6 py-3">Usuario en espera</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id_evento} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{event.id_deporte}</th>
                            <td className="px-6 py-4">{event.fecha_ini}</td>
                            <td className="px-6 py-4">{event.fecha_limite}</td>
                            <td className="px-6 py-4">{event.lugar}</td>
                            <td className="px-6 py-4">{event.hora_ini}</td>
                            <td className="px-6 py-4">{event.maximo_usuarios}</td>
                            <td className="px-6 py-4">{event.id_usuario_espera}</td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Eventos;