import React, { useEffect, useState } from 'react';
import { getRankings } from '../../api/rankings';

const Posiciones = () => {
    interface Ranking {
        id_ranking: number;
        id_usuario: number;
        id_deporte: number;
        id_evento: number;
        resultado: string;
        posicion: number;
        fecha: string;
    }
    const [rankings, setRankings] = useState<Ranking[]>([]);

    useEffect(() => {
        fetchRankigns();
    }, []);
    
    const fetchRankigns = async () => {
        try {
          const data = await getRankings();
          setRankings(data);
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
                        <th scope="col" className="px-6 py-3">Fecha</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rankings.map((ranking) => (
                        <tr key={ranking.id_ranking} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{ranking.id_usuario}</th>
                            <td className="px-6 py-4">{ranking.id_deporte}</td>
                            <td className="px-6 py-4">{ranking.id_evento}</td>
                            <td className="px-6 py-4">{ranking.resultado}</td>
                            <td className="px-6 py-4">{ranking.posicion}</td>
                            <td className="px-6 py-4">{ranking.fecha}</td>
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

export default Posiciones;