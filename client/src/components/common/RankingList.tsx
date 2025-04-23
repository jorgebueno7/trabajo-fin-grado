import { useEffect, useState } from 'react';
import { getRankings } from '../../api/rankings';

const Posiciones = () => {
    interface Ranking {
        id_ranking: number,
        id_usuario: number;
        id_deporte: number;
        id_evento: number;
        clasificacion: number,
        puntos: number,
        tiempo: number,
        resultado: string,
        observaciones: string,
        estadisticas_extra: JSON,
        user: {
            id_usuario: number,
            nombre: string,
            apellidos: string,
            fecha_nacimiento: string,
            email: string,
            telefono: string,
            role: string,
            deporte: string,
            mejor_marca: string
        },
        Event: {
            id_evento: number,
            nombre: string,
            fecha_limite: string
            lugar: string
            maximo_usuarios: number,
            estado: string,
            fecha_ini: string,
        },
        Sport: {
            id_deporte: number,
            nombre: string,
            descripcion: string
            informacion: string
            categoria: string,
            equipamiento: string,
        }
    }
    const [rankings, setRankings] = useState<Ranking[]>([]);
    const [modalData, setModalData] = useState<JSON | null>(null);

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
    
    const openModal = (data: JSON) => setModalData(data);
    const closeModal = () => setModalData(null);

    return (
        <div className="overflow-x-auto">
            <table className="w-full mt-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Usuario</th>
                        <th scope="col" className="px-6 py-3">Evento</th>
                        <th scope="col" className="px-6 py-3">Deporte</th>
                        <th scope="col" className="px-6 py-3">Clasificación</th>
                        <th scope="col" className="px-6 py-3">Puntos</th>
                        <th scope="col" className="px-6 py-3">Tiempo empleado (min)</th>
                        <th scope="col" className="px-6 py-3">Resultado</th>
                        <th scope="col" className="px-6 py-3">Observaciones</th>
                        <th scope="col" className="px-6 py-3">Estadísticas extra</th>

                    </tr>
                </thead>
                <tbody>
                    {rankings.map((ranking) => (
                        <tr key={ranking.id_ranking} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-6 py-4">{ranking.user.nombre} {ranking.user.apellidos}</td>
                            <td className="px-6 py-4">{ranking.Event.nombre}</td>
                            <td className="px-6 py-4">{ranking.Sport.nombre}</td>
                            <td className="px-6 py-4">{ranking.clasificacion}</td>
                            <td className="px-6 py-4">{ranking.puntos}</td>
                            <td className="px-6 py-4">{ranking.tiempo}</td>
                            <td className="px-6 py-4">{ranking.resultado}</td>
                            <td className="px-6 py-4">{ranking.observaciones}</td> 
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => openModal(ranking.estadisticas_extra)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Ver
                                </button>
                            </td>                  
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-lg w-full shadow-lg relative">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Estadísticas extra</h2>

                        <div className="space-y-3">
                            <ul className="space-y-1">
                                {Object.entries(modalData).map(([key, value], idx) => (
                                    <li key={idx} className="flex justify-between border-b py-1">
                                        <span className="font-medium text-black-700 dark:text-gray-300">{key}</span>
                                        <span className="text-black-600 dark:text-gray-400">{value.toString()}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={closeModal} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Posiciones;