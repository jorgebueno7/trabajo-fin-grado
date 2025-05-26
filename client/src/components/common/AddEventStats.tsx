import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserEventsByEventId, addEventStats } from '../../api/userEvent'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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

    // const openStatsModal = (user: UserEvent) => {
    //   setSelectedStatsUser(user);
    //   setIsModalOpen(true);
    // };
    
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
                        estadisticas_extra: []
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

    const handleExtraStatChange = (userId: number, index: number, field: 'key' | 'value', value: string) => {
      setFormDataMap(prev => {
          const updatedStats = [...(prev[userId]?.estadisticas_extra || [])];
          updatedStats[index] = { ...updatedStats[index], [field]: value };
          return {
              ...prev,
              [userId]: {
                  ...prev[userId],
                  estadisticas_extra: updatedStats
              }
          };
      });
    };

    const addExtraStatField = (userId: number) => {
      setFormDataMap(prev => ({
          ...prev,
          [userId]: {
              ...prev[userId],
              estadisticas_extra: [...(prev[userId]?.estadisticas_extra || []), { key: '', value: '' }]
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

    const exportToExcel = () => {
        const generarEstadisticas = (clasificacion: number, maxUsuarios: number) => {
            let puntos: number;
            let tiempo: string;
            let resultado: string;
            let observaciones: string;
    
            if (clasificacion === 1) {
                puntos = 100;
                tiempo = "1:59:32";
                resultado = "Ganador";
                observaciones = "Excelente rendimiento. Dominó la competencia.";
            } else if (clasificacion <= 3) {
                puntos = 90 - (clasificacion - 1) * 5;
                tiempo = `2:0${clasificacion}:1${clasificacion}`;
                resultado = "Podio";
                observaciones = "Muy buena actuación, mostró gran nivel.";
            } else if (clasificacion <= 5) {
                puntos = 70 - (clasificacion - 3) * 10;
                tiempo = `2:2${clasificacion}:1${clasificacion + 2}`;
                resultado = "Competente";
                observaciones = "Buen rendimiento general, aunque con margen de mejora.";
            } else if (clasificacion < maxUsuarios) {
                puntos = 30 - (clasificacion * 2);
                tiempo = `2:5${clasificacion}:3${clasificacion}`;
                resultado = "Finalizó";
                observaciones = "Debe mejorar la consistencia.";
            } else {
                puntos = 10;
                tiempo = "DNF";
                resultado = "No completó";
                observaciones = "No completó la prueba por fatiga o lesión.";
            }
    
            return { puntos, tiempo, resultado, observaciones };
        };

        const exportData = users.map(user => {
            const maxUsuarios = user.Event?.maximo_usuarios || 0;

            const clasificacion = user.clasificacion && user.clasificacion > 0 ? user.clasificacion : Math.floor(Math.random() * maxUsuarios) + 1;

            const {
                puntos, tiempo, resultado, observaciones
            } = user.puntos && user.resultado && user.tiempo && user.observaciones 
                ? {
                    puntos: user.puntos,
                    tiempo: user.tiempo,
                    resultado: user.resultado,
                    observaciones: user.observaciones
                }
                : generarEstadisticas(clasificacion, maxUsuarios); 
            return {
                'Nombre': `${user.user.nombre} ${user.user.apellidos}`,
                'Email': user.user.email,
                'Evento': user.Event.nombre,
                'Deporte del Evento': user.Event.Sport.nombre,
                'Clasificación': clasificacion,
                'Puntos': puntos,
                'Resultado': resultado,
                'Tiempo': tiempo,
                'Observaciones': observaciones,
            };
        });
      
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Estadísticas");
      
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, `estadísticas_evento_${id_evento}.xlsx`);
    };

    

    return (
      <div className="p-5">
         <div className="flex justify-between items-center">
            <button 
                    onClick={exportToExcel} 
                    className="inline-flex items-center px-3 py-2 ml-2 mb-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600">
                Exportar estadísticas a Excel
            </button>   
         </div>
        
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Evento</th>
                        <th className="px-6 py-3">Usuario</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Deporte favorito</th>
                        <th className="px-6 py-3">Deporte del evento</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((userEvent) => (
                        <>
                            <tr key={userEvent.id_usuario} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 dark:bg-gray-800">
                                <td className="px-6 py-4">{userEvent.Event.nombre}</td>
                                <td className="px-6 py-4">{userEvent.user.nombre} {userEvent.user.apellidos}</td>
                                <td className="px-6 py-4">{userEvent.user.email}</td>
                                <td className="px-6 py-4">{userEvent.user.deporte}</td>
                                <td className="px-6 py-4">{userEvent.Event.Sport.nombre}</td>
                              {/* <td className="px-6 py-4">
                                  <button onClick={() => toggleExpandRow(userEvent.id_usuario)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                      {expandedRow === userEvent.id_usuario ? 'Ocultar' : 'Añadir Estadísticas'}
                                  </button>
                              </td>
                              <td className="px-6 py-4">
                                  <button onClick={() => openStatsModal(userEvent)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                      Consultar estadísticas
                                  </button>
                              </td>
                              <td className="px-6 py-4">
                                  <button onClick={exportToExcel} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                      Exportar estadísticas
                                  </button>
                              </td> */}
                            </tr>

                            {expandedRow === userEvent.id_usuario && (
                                <tr className="bg-gray-100">
                                    <td colSpan={7} className="px-6 py-4">
                                        <form
                                            onSubmit={async (e) => {
                                                e.preventDefault();
                                                const originalData = formDataMap[userEvent.id_usuario];
                                                const estadisticas_extra_obj: { [key: string]: any } = {};

                                                originalData.estadisticas_extra.forEach((item: { key: string, value: string }) => {
                                                    if (item.key.trim()) {
                                                        estadisticas_extra_obj[item.key.trim()] = isNaN(Number(item.value)) ? item.value : Number(item.value);
                                                    }
                                                });

                                                const dataToSend = {
                                                    ...originalData,
                                                    estadisticas_extra: estadisticas_extra_obj
                                                };

                                                try {
                                                    await addEventStats(userEvent.id_evento, userEvent.id_usuario, dataToSend);
                                                    alert('Estadísticas añadidas con éxito');
                                                    toggleExpandRow(userEvent.id_usuario);
                                                } catch (error) {
                                                    console.error('Error al guardar estadísticas', error);
                                                    alert('Error al guardar estadísticas');
                                                }
                                            }}
                                            className="grid grid-cols-2 gap-4"
                                        >
                                            <input type="number" placeholder="Clasificación" className="border p-2 rounded"
                                                value={formDataMap[userEvent.id_usuario]?.clasificacion || ''}
                                                onChange={(e) => handleInputChange(userEvent.id_usuario, 'clasificacion', e.target.value)} />

                                            <input type="number" placeholder="Puntos" className="border p-2 rounded"
                                                value={formDataMap[userEvent.id_usuario]?.puntos || ''}
                                                onChange={(e) => handleInputChange(userEvent.id_usuario, 'puntos', e.target.value)} />

                                            <input type="text" placeholder="Resultado" className="border p-2 rounded"
                                                value={formDataMap[userEvent.id_usuario]?.resultado || ''}
                                                onChange={(e) => handleInputChange(userEvent.id_usuario, 'resultado', e.target.value)} />

                                            <input type="text" placeholder="Tiempo" className="border p-2 rounded"
                                                value={formDataMap[userEvent.id_usuario]?.tiempo || ''}
                                                onChange={(e) => handleInputChange(userEvent.id_usuario, 'tiempo', e.target.value)} />

                                            <input type="text" placeholder="Observaciones" className="border p-2 rounded col-span-2"
                                                value={formDataMap[userEvent.id_usuario]?.observaciones || ''}
                                                onChange={(e) => handleInputChange(userEvent.id_usuario, 'observaciones', e.target.value)} />

                                            <div className="col-span-2">
                                                <h4 className="font-semibold mb-2">Estadísticas extra:</h4>
                                                {formDataMap[userEvent.id_usuario]?.estadisticas_extra.map((item: any, index: number) => (
                                                    <div key={index} className="flex gap-2 mb-2">
                                                        <input type="text" placeholder="Nombre" className="border p-2 rounded w-1/2"
                                                            value={item.key}
                                                            onChange={(e) => handleExtraStatChange(userEvent.id_usuario, index, 'key', e.target.value)} />
                                                        <input type="text" placeholder="Valor" className="border p-2 rounded w-1/2"
                                                            value={item.value}
                                                            onChange={(e) => handleExtraStatChange(userEvent.id_usuario, index, 'value', e.target.value)} />
                                                    </div>
                                                ))}
                                                <button type="button" onClick={() => addExtraStatField(userEvent.id_usuario)} className="text-sm text-blue-600 hover:underline mt-1">
                                                    + Añadir estadística extra
                                                </button>
                                            </div>

                                            <button type="submit" className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
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

                    {selectedStatsUser.estadisticas_extra && Object.keys(selectedStatsUser.estadisticas_extra).length > 0 && (
                        <>
                            <hr className="my-4" />
                            <h3 className="text-lg font-semibold mb-2">Estadísticas extra</h3>
                            <ul className="space-y-1">
                                {Object.entries(selectedStatsUser.estadisticas_extra).map(([key, value], idx) => (
                                    <li key={idx} className="flex justify-between border-b py-1">
                                        <span className="font-medium text-black-700 dark:text-gray-300">{key}</span>
                                        <span className="text-black-600 dark:text-gray-400">{value.toString()}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    <button onClick={closeStatsModal} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Cerrar
                    </button>
                </div>
            </div>
        )}
      </div>
  );
}

export default AddEventStats;