import { useEffect, useState } from 'react';
import { getRatings } from '../../api/ratings';

const Valoraciones = () => {
    interface Rating {
        id_rating: number;
        id_usuario: number;
        id_deporte: number;
        id_evento: number;
        valoracion: number;
        comentario: string;
    }
      
    const [ratings, setRatings] = useState<Rating[]>([]);

    useEffect(() => {
        fetchRatings();
    }, []);
    
    const fetchRatings = async () => {
        try {
          const data = await getRatings();
          setRatings(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
    };

    return (
        <div>
            <h1>Valoraciones</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Usuario</th>
                        <th scope="col" className="px-6 py-3">Deporte</th>
                        <th scope="col" className="px-6 py-3">Evento</th>
                        <th scope="col" className="px-6 py-3">Valoración</th>
                        <th scope="col" className="px-6 py-3">Comentario</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ratings.map((rating) => (
                        <tr key={rating.id_rating} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{rating.id_usuario}</th>
                            <td className="px-6 py-4">{rating.id_deporte}</td>
                            <td className="px-6 py-4">{rating.id_evento}</td>
                            <td className="px-6 py-4">{rating.valoracion}</td>
                            <td className="px-6 py-4">{rating.comentario}</td>
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

export default Valoraciones;