import { useEffect, useState } from 'react';
import { getUserEvents } from '../../api/userEvent';

const EventosUsuario = () => {
    interface UserEvent {
        id_evento: number;
        id_usuario: number;
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
            <h1>Eventos de Usuario</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Evento</th>
                        <th scope="col" className="px-6 py-3">Usuario</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userEvent.map((userEvent) => (
                        <tr key={userEvent.id_evento} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{userEvent.id_evento}</th>
                            <td className="px-6 py-4">{userEvent.id_usuario}</td>
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

export default EventosUsuario;