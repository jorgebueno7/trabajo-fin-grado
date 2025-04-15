import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserEventsByEventId, addEventStats } from '../../api/userEvent'

const AddEventStats = () => {
    interface UserEvent {
        id_evento: number,
        id_usuario: number,
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
        }
        Event: {
            id_evento: number,
            nombre: string,
            fecha_limite: string
            lugar: string
            maximo_usuarios: number,
            estado: string,
            Sport: {
                id_deporte: number,
                nombre: string,
                descripcion: string
                informacion: string
                categoria: string,
                equipamiento: string,
            }
        }
    };
    const { id_evento } = useParams();
    const [users, setUsers] = useState<UserEvent[]>([]);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [formDataMap, setFormDataMap] = useState<{ [userId: number]: any }>({});

    const [selectedStatsUser, setSelectedStatsUser] = useState<UserEvent | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openStatsModal = (user: UserEvent) => {
      setSelectedStatsUser(user);
      setIsModalOpen(true);
    };
    
    const closeStatsModal = () => {
      setIsModalOpen(false);
      setSelectedStatsUser(null);
    };

    const toggleExpandRow = (userId: number) => {
        const selectedUser = users.find(user => user.id_usuario === userId);
    
        if (expandedRow === userId) {
            setExpandedRow(null);
        } else {
            setExpandedRow(userId);
            if (selectedUser && !formDataMap[userId]) {
                setFormDataMap(prev => ({
                    ...prev,
                    [userId]: {
                        clasificacion: selectedUser.clasificacion?.toString() || '',
                        puntos: selectedUser.puntos?.toString() || '',
                        resultado: selectedUser.resultado || '',
                        tiempo: selectedUser.tiempo?.toString() || '',
                        observaciones: selectedUser.observaciones || '',
                        estadisticas_extra: selectedUser.estadisticas_extra || ''
                    }
                }));
            }
        }
    };  

    const handleInputChange = (userId: number, field: string, value: string) => {
        setFormDataMap(prev => ({
          ...prev,
          [userId]: {
            ...prev[userId],
            [field]: value
          }
        }));
    };
    const fecthUsers = async () => {
        if (id_evento) {
            try {
                const response = await getUserEventsByEventId(Number(id_evento)); 
                setUsers(response);
            } catch (error) {
                console.log('Error al cargar los usuarios del evento', error);
            }
        }
    }
    useEffect(() => {
        fecthUsers();
    }, [id_evento]);

    return (
        <div className="mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Usuario</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Deporte favorito</th>
                        <th scope="col" className="px-6 py-3">Deporte del evento</th>   
                        <th scope="col" className="px-6 py-3">Evento</th>
                        <th scope="col" className="px-6 py-3"></th>      
                        <th scope="col" className="px-6 py-3"></th>                                      
                    </tr>
                </thead>
                <tbody>
                    {users.map((userEvent) => (
                      <>
                          <tr key={userEvent.id_usuario} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                              <td className="px-6 py-4">{userEvent.user.nombre} {userEvent.user.apellidos}</td>
                              <td className="px-6 py-4">{userEvent.user.email}</td>
                              <td className="px-6 py-4">{userEvent.user.deporte}</td>
                              <td className="px-6 py-4">{userEvent.Event.Sport.nombre}</td>
                              <td className="px-6 py-4">{userEvent.Event.nombre}</td>
                              <td className="px-6 py-4">
                                  <button
                                      onClick={() => toggleExpandRow(userEvent.id_usuario)}
                                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                  >
                                      {expandedRow === userEvent.id_usuario ? 'Ocultar' : 'Añadir Estadísticas'}
                                  </button>
                              </td>
                              <td className="px-6 py-4">
                                  <button
                                      onClick={() => openStatsModal(userEvent)}
                                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                  >
                                      Consultar estadísticas
                                  </button>
                              </td>
                          </tr>
                          {expandedRow === userEvent.id_usuario && (
                            <tr className="bg-gray-100">
                              <td colSpan={7} className="px-6 py-4">
                                <form
                                  onSubmit={async (e) => {
                                    e.preventDefault();
                                    try {
                                      await addEventStats(userEvent.id_evento, userEvent.id_usuario, formDataMap[userEvent.id_usuario]);
                                      alert('Estadísticas añadidas con éxito');
                                      toggleExpandRow(userEvent.id_usuario);
                                    } catch (error) {
                                      console.error('Error al guardar estadísticas', error);
                                      alert('Error al guardar estadísticas');
                                    }
                                  }}
                                  className="grid grid-cols-2 gap-4"
                                >
                                  <input
                                    type="number"
                                    placeholder="Clasificación"
                                    className="border p-2 rounded"
                                    value={formDataMap[userEvent.id_usuario]?.clasificacion || ''}
                                    onChange={(e) => handleInputChange(userEvent.id_usuario, 'clasificacion', e.target.value)}
                                  />
                                  <input
                                    type="number"
                                    placeholder="Puntos"
                                    className="border p-2 rounded"
                                    value={formDataMap[userEvent.id_usuario]?.puntos || ''}
                                    onChange={(e) => handleInputChange(userEvent.id_usuario, 'puntos', e.target.value)}
                                  />
                                  <input
                                    type="text"
                                    placeholder="Resultado"
                                    className="border p-2 rounded"
                                    value={formDataMap[userEvent.id_usuario]?.resultado || ''}
                                    onChange={(e) => handleInputChange(userEvent.id_usuario, 'resultado', e.target.value)}
                                  />
                                  <input
                                    type="text"
                                    placeholder="Tiempo"
                                    className="border p-2 rounded"
                                    value={formDataMap[userEvent.id_usuario]?.tiempo || ''}
                                    onChange={(e) => handleInputChange(userEvent.id_usuario, 'tiempo', e.target.value)}
                                  />
                                  <input
                                    type="text"
                                    placeholder="Observaciones"
                                    className="border p-2 rounded"
                                    value={formDataMap[userEvent.id_usuario]?.observaciones || ''}
                                    onChange={(e) => handleInputChange(userEvent.id_usuario, 'observaciones', e.target.value)}
                                  />
                                  <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                  >
                                    Añadir estadísticas
                                  </button>
                                </form>
                              </td>
                            </tr>
                          )}
                      </>
                    ))}
                </tbody>
            </table>
            {isModalOpen && selectedStatsUser && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 max-w-2xl relative shadow-lg">
                      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Estadísticas del Usuario</h2>
                      <p><strong>Usuario:</strong> {selectedStatsUser.user.nombre} {selectedStatsUser.user.apellidos}</p>
                      <p><strong>Evento:</strong> {selectedStatsUser.Event.nombre}</p>
                      <p><strong>Deporte:</strong> {selectedStatsUser.Event.Sport.nombre}</p>
                      <hr className="my-4" />
                      <p><strong>Clasificación:</strong> {selectedStatsUser.clasificacion ?? 'No disponible'}</p>
                      <p><strong>Puntos:</strong> {selectedStatsUser.puntos ?? 'No disponible'}</p>
                      <p><strong>Resultado:</strong> {selectedStatsUser.resultado || 'No disponible'}</p>
                      <p><strong>Tiempo:</strong> {selectedStatsUser.tiempo || 'No disponible'}</p>
                      <p><strong>Observaciones:</strong> {selectedStatsUser.observaciones || 'No disponible'}</p>
                      <button
                        onClick={closeStatsModal}
                        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Cerrar
                      </button>
                  </div>
              </div>
            )}
        </div>
    );
}

export default AddEventStats;