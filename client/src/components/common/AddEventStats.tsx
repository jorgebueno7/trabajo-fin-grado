import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import UserContext from '../context/UsersContext';
import { getUserEventsByEventId } from '../../api/userEvent';

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
    const [users, setUsers] = useState<UserEvent[]>([]);  // Para almacenar los usuarios
    const [loading, setLoading] = useState<boolean>(true);  // Para manejar el estado de carga
    const [error, setError] = useState<string | null>(null);  // Para manejar errores

    // Llamada a la API cuando el componente se monta
    useEffect(() => {
      const fetchUsers = async () => {
        if (id_evento) {
          try {
            console.log("ID EVENTOOOOOOOOOOOO", id_evento)
            const response = await getUserEventsByEventId(Number(id_evento));  // Hacer la llamada a la API
            console.log("respuestaaaaaaaaaaaaaa", response)
            setUsers(response);  // Almacenar los usuarios en el estado
            setLoading(false);  // Termina el estado de carga
          } catch (err) {
            setError('Error al cargar los usuarios del evento.');
            setLoading(false);  // Termina el estado de carga
          }
        }
      };
  
      fetchUsers();
    }, [id_evento]);  // Este efecto se ejecutará cuando cambie id_evento
  
    // Mostrar los estados de carga o error
    if (loading) return <div>Cargando usuarios...</div>;
    if (error) return <div>{error}</div>;
  
    return (
      <div>
        <h1>Estadísticas del Evento {id_evento}</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Deporte favorito</th>
              <th>Evento</th>
              <th>Deporte</th>
            </tr>
          </thead>
          <tbody>
            {users.map((userEvent) => (
              <tr key={userEvent.id_usuario}>
                <td>{userEvent.user.nombre}</td>
                <td>{userEvent.user.apellidos}</td>
                <td>{userEvent.user.email}</td>
                <td>{userEvent.user.deporte}</td>
                <td>{userEvent.Event.nombre}</td>
                <td>{userEvent.Event.Sport.nombre}</td>
                <td>{userEvent.observaciones}</td>
                <td>
                  <button
                    onClick={() => alert(`Añadir estadísticas para el usuario ${userEvent.user.nombre}`)}
                  >
                    Añadir Estadísticas
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
export default AddEventStats;
