import { useEffect, useState, useContext } from 'react';
import { getRankings, deleteRanking } from '../api/rankings';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import UserContext from '../context/UsersContext';


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
    const [selectedEvent, setSelectedEvent] = useState<string>('');
    const eventos = [...new Set(rankings.map(e => e.Event.nombre))];
    const [sortField, setSortField] = useState<'clasificacion' | 'puntos' | 'tiempo' | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const { isLoggedIn, user } = useContext(UserContext);
    const navigate = useNavigate();

    const navigateToUpdateRanking = (id_ranking: number) => {
        navigate(`/update-ranking/${id_ranking}`)
    }
    useEffect(() => {
        fetchRankigns();
    }, [selectedEvent]);
    
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

    const filteredEvents = [...rankings].filter((event) => {
        return selectedEvent === '' || event.Event?.nombre === selectedEvent;
    }).sort((a, b) => {
        if (!sortField) return 0;
        const aValue = a[sortField];
        const bValue = b[sortField];

        return sortOrder === 'asc'
            ? aValue - bValue
            : bValue - aValue;
    });

    const handleSort = (field: 'clasificacion' | 'puntos' | 'tiempo') => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const getSortIcon = (field: 'clasificacion' | 'puntos' | 'tiempo') => {
        if (sortField !== field) return null;
        return sortOrder === 'asc' ? '⬆' : '⬇';
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este registro?')) {
            try {
                await deleteRanking(id.toString());
                setRankings(rankings.filter(ranking => ranking.id_ranking !== id));
            } catch (error) {
                console.error('Error deleting ranking:', error);
            }
        }
    };

    return (
        <>
            <div className="overflow-x-auto">
                <div className="flex items-end mx-12 mt-6">
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Filtrar estadísticas según evento:</label>
                        <select
                            value={selectedEvent}
                                onChange={(e) => setSelectedEvent(e.target.value)}
                                className="mt-1 w-full py-2 px-3 border border-gray-300 bg-white dark:bg-gray-700 dark:text-white rounded-md shadow-sm"
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
                <table className="w-full mt-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    { selectedEvent !== '' && (
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Usuario</th>
                                <th scope="col" className="px-6 py-3">Evento</th>
                                <th scope="col" className="px-6 py-3">Deporte</th>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('clasificacion')}>Clasificación {getSortIcon('clasificacion')}</th>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('puntos')}>Puntos {getSortIcon('puntos')}</th>
                                <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('tiempo')}>Tiempo empleado (min) {getSortIcon('tiempo')}</th>
                                <th scope="col" className="px-6 py-3">Resultado</th>
                                <th scope="col" className="px-6 py-3">Observaciones</th>
                                <th scope="col" className="px-6 py-3">Estadísticas extra</th>
                                {isLoggedIn && user?.role === 'administrador' && (
                                    <th scope="col" className="px-6 py-3 text-center">Acciones</th>
                                )}
                            </tr>
                        </thead>
                    )}
                    <tbody>
                    {selectedEvent === '' ? (
                        <tr>
                            <td colSpan={9} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                Selecciona un evento para ver los resultados.
                            </td>
                        </tr>
                    ) : (
                        filteredEvents.map((ranking) => (
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
                            {isLoggedIn && user?.role === 'administrador' && (
                                <td className="px-6 py-3 text-center">
                                    <div className="flex justify-center space-x-4">
                                        <button 
                                            onClick={() => navigateToUpdateRanking(ranking.id_ranking)}
                                            className="w-50 text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                                                rounded-lg text-sm px-1 py-0.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
                                            Editar registro
                                        </button>
                                        <button
                                            onClick={() => handleDelete(ranking.id_ranking)} 
                                            className="w-50 text-white bg-red-800 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium 
                                                rounded-lg text-sm px-1 py-0.5 text-center dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800">
                                            Eliminar registo
                                        </button>
                                    </div>
                              </td>
                            )}               
                        </tr>
                        ))
                    )}
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
            <Footer />
        </>
        
    );
};

export default Posiciones;