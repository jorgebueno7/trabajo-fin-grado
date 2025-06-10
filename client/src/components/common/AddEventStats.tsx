import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserEventsByEventId, addEventStats } from '../../api/userEvent'
import * as XLSX from 'xlsx';

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

    const handleImportStats = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
      
        const reader = new FileReader();
        reader.onload = async (event) => {
            const text = event.target?.result as string;
            const workbook = XLSX.read(text, { type: 'string' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            console.log(jsonData); // Aquí verás los datos parseados
        
            for (const row of jsonData) {
                const {
                    id_evento,
                    id_usuario,
                    clasificacion,
                    puntos,
                    tiempo,
                    resultado,
                    observaciones,
                    //   ...estadisticas_extra
                } = row as any;
        
                console.log("JSON DATA", jsonData);
                console.log("Fila actual", row);
                // Validación
                if (isNaN(Number(id_evento)) || isNaN(Number(id_usuario))) {
                    console.warn("Fila inválida: id_evento o id_usuario no numéricos", row);
                    continue;
                }
        
                // const formattedExtraStats: { [key: string]: string | number } = {};
                // for (const [key, value] of Object.entries(estadisticas_extra)) {
                //   formattedExtraStats[key] = isNaN(Number(value)) ? value : Number(value);
                // }
        
                try {
                    console.log(`Añadiendo estadísticas para usuario ${id_usuario} en evento ${id_evento}`);
                    await addEventStats(Number(id_evento), Number(id_usuario), {
                        clasificacion,
                        puntos,
                        tiempo,
                        resultado,
                        observaciones,
                        // estadisticas_extra: formattedExtraStats
                    });
                    console.log(`Estadísticas añadidas para usuario ${id_usuario}`);
                } catch (error) {
                    console.error(`Error al importar estadísticas del usuario ${id_usuario}`, error);
                }
            }
        
            alert('Importación completada');
            fecthUsers(); // para actualizar la tabla
        };
        reader.readAsText(file, 'utf-8');
        // reader.readAsArrayBuffer(file);
    };
    
    return (
      <div className="p-5">
         <div className="flex justify-between items-center">
            {/* <button 
                    onClick={exportToExcel} 
                    className="inline-flex items-center px-3 py-2 ml-2 mb-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600">
                Exportar estadísticas a Excel
            </button>    */}
            <input 
                type="file" 
                accept=".xlsx,.xls,.csv" 
                style={{ display: 'none' }} 
                id="fileInput" 
                onChange={handleImportStats}
            />
            <button  
                onClick={() => document.getElementById('fileInput')?.click()}
                className="inline-flex items-center px-3 py-2 ml-2 mb-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600">
                Importar estadísticas
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
                        <th className="px-6 py-3">Más estadísticas</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((userEvent) => (
                        <>
                            <tr key={userEvent.id_evento} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 dark:bg-gray-800">
                                <td className="px-6 py-4">{userEvent.Event.nombre}</td>
                                <td className="px-6 py-4">{userEvent.user.nombre} {userEvent.user.apellidos}</td>
                                <td className="px-6 py-4">{userEvent.user.email}</td>
                                <td className="px-6 py-4">{userEvent.user.deporte}</td>
                                <td className="px-6 py-4">{userEvent.Event.Sport.nombre}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => toggleExpandRow(userEvent.id_usuario)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        {expandedRow === userEvent.id_usuario ? 'Ocultar' : 'Añadir Estadísticas'}
                                    </button>
                                </td>
                            </tr>

                            {expandedRow === userEvent.id_usuario && (
                                <tr className="bg-gray-100">
                                    <td colSpan={7} className="px-6 py-4">
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
                                                <button type="button" onClick={() => addExtraStatField(userEvent.id_usuario)} className="text-sm text-blue-600 hover:underline mt-1 mb-1">
                                                    + Añadir estadística extra
                                                </button>
                                        </div>
                                        <button type="submit" className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                            Añadir estadísticas
                                        </button>
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