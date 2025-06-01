// import { useEffect, useState } from 'react';
// import { getRankings } from '../../api/rankings';

// const Posiciones = () => {
//     interface Ranking {
//         id_ranking: number,
//         id_usuario: number;
//         id_deporte: number;
//         id_evento: number;
//         clasificacion: number,
//         puntos: number,
//         tiempo: number,
//         resultado: string,
//         observaciones: string,
//         estadisticas_extra: JSON,
//         user: {
//             id_usuario: number,
//             nombre: string,
//             apellidos: string,
//             fecha_nacimiento: string,
//             email: string,
//             telefono: string,
//             role: string,
//             deporte: string,
//             mejor_marca: string
//         },
//         Event: {
//             id_evento: number,
//             nombre: string,
//             fecha_limite: string
//             lugar: string
//             maximo_usuarios: number,
//             estado: string,
//             fecha_ini: string,
//         },
//         Sport: {
//             id_deporte: number,
//             nombre: string,
//             descripcion: string
//             informacion: string
//             categoria: string,
//             equipamiento: string,
//         }
//     }
//     const [rankings, setRankings] = useState<Ranking[]>([]);
//     const [modalData, setModalData] = useState<JSON | null>(null);

//     useEffect(() => {
//         fetchRankigns();
//     }, []);
    
//     const fetchRankigns = async () => {
//         try {
//           const data = await getRankings();
//           setRankings(data);
//         } catch (error) {
//           console.error('Error fetching users:', error);
//         }
//     };
    
//     const openModal = (data: JSON) => setModalData(data);
//     const closeModal = () => setModalData(null);

//     return (
//         <div className="overflow-x-auto">
//             <table className="w-full mt-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                     <tr>
//                         <th scope="col" className="px-6 py-3">Usuario</th>
//                         <th scope="col" className="px-6 py-3">Evento</th>
//                         <th scope="col" className="px-6 py-3">Deporte</th>
//                         <th scope="col" className="px-6 py-3">Clasificación</th>
//                         <th scope="col" className="px-6 py-3">Puntos</th>
//                         <th scope="col" className="px-6 py-3">Tiempo empleado (min)</th>
//                         <th scope="col" className="px-6 py-3">Resultado</th>
//                         <th scope="col" className="px-6 py-3">Observaciones</th>
//                         <th scope="col" className="px-6 py-3">Estadísticas extra</th>

//                     </tr>
//                 </thead>
//                 <tbody>
//                     {rankings.map((ranking) => (
//                         <tr key={ranking.id_ranking} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
//                             <td className="px-6 py-4">{ranking.user.nombre} {ranking.user.apellidos}</td>
//                             <td className="px-6 py-4">{ranking.Event.nombre}</td>
//                             <td className="px-6 py-4">{ranking.Sport.nombre}</td>
//                             <td className="px-6 py-4">{ranking.clasificacion}</td>
//                             <td className="px-6 py-4">{ranking.puntos}</td>
//                             <td className="px-6 py-4">{ranking.tiempo}</td>
//                             <td className="px-6 py-4">{ranking.resultado}</td>
//                             <td className="px-6 py-4">{ranking.observaciones}</td> 
//                             <td className="px-6 py-4">
//                                 <button
//                                     onClick={() => openModal(ranking.estadisticas_extra)}
//                                     className="text-blue-600 hover:underline"
//                                 >
//                                     Ver
//                                 </button>
//                             </td>                  
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             {modalData && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-lg w-full shadow-lg relative">
//                         <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Estadísticas extra</h2>

//                         <div className="space-y-3">
//                             <ul className="space-y-1">
//                                 {Object.entries(modalData).map(([key, value], idx) => (
//                                     <li key={idx} className="flex justify-between border-b py-1">
//                                         <span className="font-medium text-black-700 dark:text-gray-300">{key}</span>
//                                         <span className="text-black-600 dark:text-gray-400">{value.toString()}</span>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                         <button onClick={closeModal} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//                             Cerrar
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Posiciones;

import { useEffect, useState } from 'react';
import { getRankings } from '../../api/rankings';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const Posiciones = () => {
    interface Ranking {
        id_ranking: number;
        id_usuario: number;
        id_deporte: number;
        id_evento: number;
        clasificacion: number;
        puntos: number;
        tiempo: number;
        resultado: string;
        observaciones: string;
        estadisticas_extra: JSON;
        user: {
            id_usuario: number;
            nombre: string;
            apellidos: string;
        };
        Event: {
            id_evento: number;
            nombre: string;
        };
        Sport: {
            id_deporte: number;
            nombre: string;
        };
    }
    const [selectedEvent, setSelectedEvent] = useState<string>('');
    const [rankings, setRankings] = useState<Ranking[]>([]);
    const eventos = [...new Set(rankings.map(e => e.Event.nombre))];

    useEffect(() => {
        fetchRankings();
    }, [selectedEvent]);

    const filteredEvents = rankings.filter(event => {
        const matchesEvent = selectedEvent === '' || event.Event?.nombre === selectedEvent;
        return matchesEvent;
    });
    const fetchRankings = async () => {
        try {
            const data = await getRankings();
            setRankings(data);
        } catch (error) {
            console.error('Error fetching rankings:', error);
        }
    };

    const chartData = filteredEvents.map((r) => ({
        name: `${r.user.nombre} ${r.user.apellidos}`,
        clasificacion: r.clasificacion,
        puntos: r.puntos,
        tiempo: r.tiempo,
    }));

    return (
        <>
            <div className="flex items-end gap-6 mx-20 mt-6">
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Filtrar estadísticas según evento:</label>
                    <select
                        value={selectedEvent}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            className="mt-1 w-48 py-2 px-3 border border-gray-300 bg-white dark:bg-gray-700 dark:text-white rounded-md shadow-sm"
                        >
                        <option value=""></option>
                        {eventos.map((nombre) => (
                            <option key={nombre} value={nombre}>
                                {nombre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            { selectedEvent && (
                <div className="p-6">
                    <div className="h-[500px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid /> <XAxis dataKey="name"/> <YAxis /> <Tooltip /> <Legend />
                            <Bar dataKey="clasificacion" fill="#247380" name="Clasificación" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="puntos" fill="#2ad9b9" name="Puntos" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="tiempo" fill="#53c48f" name="Tiempo (min)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
            {!selectedEvent && (
                <div className="text-center text-gray-500 mt-10">
                    Por favor, selecciona un evento para ver las estadísticas.
                </div>
            )}
        </>
    );
};

export default Posiciones;

