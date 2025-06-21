import { useEffect, useState } from 'react';
import { getUserEvents } from '../api/userEvent';

const EventosUsuario = () => {
    interface UserEvent {
        id_evento: number;
        id_usuario: number;
        clasificacion: number;
        user: {
            nombre: string;
            apellidos: string;
            email: string;
        }
        Event: {
            nombre: string;
            Sport: {
                nombre: string;
            }
        }
    }
      
    const [userEvent, setUserEvents] = useState<UserEvent[]>([]);

    useEffect(() => {
        fetchUserEvents(); 
    }, []);
    
    const fetchUserEvents = async () => {
        try {
          const data = await getUserEvents();
          setUserEvents(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
    };

    return (
        <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nombre</th>
                        <th scope="col" className="px-6 py-3">Apellidos</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Evento</th>
                        <th scope="col" className="px-6 py-3">Clasificacion</th>
                        <th scope="col" className="px-6 py-3">Deporte</th>
                    </tr>
                </thead>
                <tbody>
                    {userEvent.map((userEvent) => (
                        <tr key={userEvent.id_evento} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{userEvent.user.nombre}</th>
                            <td className="px-6 py-4">{userEvent.user.apellidos}</td>
                            <td className="px-6 py-4">{userEvent.user.email}</td>
                            <td className="px-6 py-4">{userEvent.Event.nombre}</td>
                            <td className="px-6 py-4">{userEvent.clasificacion}</td>
                            <td className="px-6 py-4">{userEvent.Event.Sport.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EventosUsuario;