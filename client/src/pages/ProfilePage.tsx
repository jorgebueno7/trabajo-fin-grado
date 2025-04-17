import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UsersContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { getEventsByOrganizer, getUserEventsLoggedIn } from '../api/userEvent';
import { putEventStatus, getEvents, deleteEvent } from '../api/events';
import { getSports, deleteSport } from '../api/sports'
import { getUsers, deleteUserById } from '../api/users'
// import { deleteRating } from '../api/ratings' 

const ITEMS_PER_PAGE = 3;

const ProfilePage = () => {  
    interface Event {
        id_evento: number;
        // id_usuario: number;
        createdBy: string;
        nombre: string;
        fecha_ini: string;
        hora_ini: string;
        lugar: string;
        clasificacion: string;
        estado: string;
        Sport: {
            nombre: string;
        }; 
    }

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
            fecha_ini: string,
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

    interface EventOrganizer {
        id_evento: number;
        id_usuario: number;
        createdBy: string;
        nombre: string;
        fecha_ini: string;
        hora_ini: string;
        lugar: string;
        clasificacion: string;
        estado: string;
        maximo_usuarios: number;
        Sport: {
            nombre: string;
        };
    }

    interface AdminEvent {
        id_evento: number;
        id_deporte: number;
        nombre: string;
    }

    interface AdminSport {
        id_deporte: number;
        nombre: string;
    }

    // interface AdminRating {
    //     id_rating: number;
    //     id_evento: number;
    //     id_usuario: number;
    //     valoracion: number;
    //     comentario: string;
    //     Event: {
    //         nombre: string;
    //     };
    // }
    interface User {
        id: number;
        dni: string;
        nombre: string;
        apellidos: string;
        email: string;
        role: string;
        fecha_nacimiento: string;
        telefono: number;
        direccion: string;
        altura: string;
        peso: string;
        deporte: string;
        mejor_marca: string;
    }

    const { user } = useContext(UserContext);
    const [events, setEvents] = useState<Event[]>([]);
    const [eventsOrganizer, setEventsOrganizer] = useState<EventOrganizer[]>([]);
    const [userEvents, setUserEvents] = useState<UserEvent[]>([]);
    const [allEvents, setAllEvents] = useState<AdminEvent[]>([]);
    const [allSports, setAllSports] = useState<AdminSport[]>([]); 
    // const [allRatings, setAllRatings] = useState<AdminRating[]>([]); 
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [activeTab, setActiveTab] = useState<'eventos' | 'deportes' | 'valoraciones'>('eventos');
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const currentEvents = allEvents.slice(startIndex, endIndex);
    const currentSports = allSports.slice(startIndex, endIndex);
    // const currentRatings = allRatings.slice(startIndex, endIndex);


    const nextPageEvents = () => {
        if (endIndex < allEvents.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPageEvents = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPageSports = () => {
        if (endIndex < allSports.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPageSports = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // const nextPageRatings = () => {
    //     if (endIndex < allRatings.length) {
    //         setCurrentPage(currentPage + 1);
    //     }
    // };

    // const prevPageRatings = () => {
    //     if (currentPage > 1) {
    //         setCurrentPage(currentPage - 1);
    //     }
    // };

    const rolUsuario = user?.role;

    const navigate = useNavigate();
    const navigateToUpdateProfile = () => {
        navigate('/update-profile');
    };

    const navigateToUpdateEvent = (id_evento: number) => {
        navigate(`/update-event/${id_evento}`);
    };

    const navigateToUpdateSport = (id_deporte: number) => {
        navigate(`/update-sport/${id_deporte}`);
    };

    const navigateToUpdateUser = (id: number) => {
        navigate(`/update-user/${id}`);
    };

    // const navigateToUpdateEventRating = (id_rating: number) => {
    //     navigate(`/ratings/update/${id_rating}`)
    // }

    const navigateToEventDetail = (id_evento: number) => {
        navigate(`/events/${id_evento}`);
    };

    const navigateToSportDetail = (id_deporte: number) => {
        navigate(`/sports/${id_deporte}`);
    }

    // const navigateToRatingDetail = (id_rating: number) => {
    //     navigate(`/ratings/${id_rating}`);
    // }

    const navigateToAddStats = (id_evento: number) => {
        navigate(`/add-stats/${id_evento}`);
    }

    const fetchUserEvents = async () => {
        try {
            const events = await getEvents();
            console.log("EVENTOS OBTENIDOS", events)
            setEvents(events);
        } catch (error) {
            console.error('Error obteniendo eventos:', error);
            // alert('Hubo un error al obtener los eventos. Inténtalo de nuevo más tarde.');
        }
    };

    const fetchEventsByOrganizer = async () => {
        try {
            const userEvents = await getEventsByOrganizer();
            setEventsOrganizer(userEvents);
        } catch (error) {
            console.error('Error obteniendo eventos:', error);
            // alert('Hubo un error al obtener los eventos. Inténtalo de nuevo más tarde.');
        }
    };

    const fetchUserEventsLoggedIn = async () => {
        try {
            const userEvents = await getUserEventsLoggedIn();
            setUserEvents(userEvents);
        } catch (error) {
            console.error('Error obteniendo eventos:', error);
            // alert('Hubo un error al obtener los eventos. Inténtalo de nuevo más tarde.');
        }
    };

    const fetchAllEvents = async () => {
        try {
            const events = await getEvents();
            setAllEvents(events);
        } catch (error) {
            console.error('Error obteniendo eventos:', error);
        }
    }

    const fetchAllSports = async () => {
        try {
            const sports = await getSports();
            setAllSports(sports);
        } catch (error) {
            console.error('Error obteniendo deportes:', error);
        }
    }

    const fetchAllUsers = async () => {
        try {
            const users = await getUsers();
            setUsuarios(users);
        } catch (error) {
            console.error('Error obteniendo usuarios:', error);
        }
    }

        
    // const fetchAllRatings = async () => {
    //     try {
    //         const ratings = await getRatings();
    //         setAllRatings(ratings);
    //     } catch (error) {
    //         console.error('Error obteniendo valoraciones:', error);
    //     }
    // }

    const handleDeleteEvent = async (id_evento: number) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
            try {
                await deleteEvent(id_evento);
                setAllEvents(allEvents.filter(event => event.id_evento !== id_evento)); // Eliminar del estado
            } catch (error) {
                console.error("Error al eliminar evento:", error);
                alert("Hubo un problema al eliminar el evento");
            }
        }
    };

    const handleDeleteSport = async (id_deporte: number) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este deporte?")) {
            try {
                await deleteSport(id_deporte);
                setAllSports(allSports.filter(sport => sport.id_deporte !== id_deporte));
                setAllEvents(allEvents.filter(event => event.id_deporte !== id_deporte));
                alert("Se han eliminado el deporte y los eventos asociados");
            } catch (error) {
                console.error("Error al eliminar deporte:", error);
                alert("Hubo un problema al eliminar el deporte");
            }
        }
    };

    const handleDeleteUser = async (id: number) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            try {
                await deleteUserById(id);
                setUsuarios(usuarios.filter(user => user.id !== id));
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                alert("Hubo un problema al eliminar el usuario");
            }
        }
    }

    // const handleDeleteRating = async (id: number) => {
    //     if (window.confirm("¿Estás seguro de que deseas eliminar esta valoración?")) {
    //         try {
    //             await deleteRating(id);
    //             setAllRatings(allRatings.filter(rating => rating.id_rating !== id));
    //         } catch (error) {
    //             console.error("Error al eliminar valoración:", error);
    //             alert("Hubo un problema al eliminar la valoración");
    //         }
    //     }
    // }

    useEffect(() => {
        if(rolUsuario === 'participante') {
            fetchUserEvents();
            fetchUserEventsLoggedIn();
        } else if (rolUsuario === 'organizador') {
            fetchEventsByOrganizer();
        } else {
            fetchAllEvents();
        }
    }, 
    [user]);

    useEffect(() => {
        fetchAllSports();
        fetchAllUsers();
        // fetchAllRatings();
    })

    const getNextState = (currentState: string) => {
        if (currentState === 'sin_comenzar') return 'en_curso';
        if (currentState === 'en_curso') return 'finalizado';
        return null; // Si ya está finalizado, no cambia
    };

    // Generar estrellas según la valoración
    // const renderStars = (ratingValue: number) => {
    //     const maxStars = 5; // Máximo de estrellas
    //     const filledStars = '★'.repeat(ratingValue); // Estrellas llenas
    //     const emptyStars = '☆'.repeat(maxStars - ratingValue); // Estrellas vacías
    //     return `${filledStars}${emptyStars}`;
    // };

    const updateStatusFromEvent = async (id_evento: number, currentStatus: string) => {
        try {
            const nextStatus = getNextState(currentStatus);
            if (!nextStatus) return;
            
            await putEventStatus(id_evento, nextStatus);
    
            setEventsOrganizer((prevEvents) =>
                prevEvents.map((event) =>
                    event.id_evento === id_evento
                        ? { ...event, estado: nextStatus }
                        : event
                )
            );
        } catch (error) {
            console.error('Error actualizando el estado:', error);
        }
    };
    
    return (
        <>
            { rolUsuario === 'administrador' ? 
                (
                    <>
                        <div className="grid grid-cols-3 gap-4 mt-8 p-2">
                            <div>
                                <a className="block max-w p-4 bg-white border border-gray-200 rounded-lg shadow-sm 
                                    hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <h3 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user?.nombre} {user?.apellidos}</h3>
                                    <hr></hr>
                                    <div className='mt-4'>
                                        <p><strong>Email: </strong>{user?.email}</p>
                                        <p><strong>Fecha de nacimiento: </strong>{dayjs.utc(user?.fecha_nacimiento).format('DD-MM-YYYY')}</p>
                                        <p><strong>Teléfono: </strong>{user?.telefono}</p>
                                        <p><strong>Dirección: </strong>{user?.direccion}</p>
                                        <p><strong>Altura: </strong>{user?.altura} cm</p>
                                        <p><strong>Peso: </strong>{user?.peso} kg</p>
                                        <p><strong>Deporte favorito: </strong>{user?.deporte}</p>
                                        <p><strong>Mejor marca: </strong>{user?.mejor_marca}</p>
                                        <button 
                                            onClick={navigateToUpdateProfile}
                                            className="w-30 mt-3 text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium 
                                                rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" 
                                        >
                                            Actualizar perfil
                                        </button>
                                    </div>
                                </a>
                            </div>
                            <div className="col-span-2">
                                <a className="block max-w p-6 bg-white border border-gray-200 rounded-lg shadow-sm 
                                    hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mr-2">
                                    {/* Selección de pestañas */}
                                    <div className="flex border-b mb-4">
                                        <button 
                                            className={`px-4 py-2 ${activeTab === 'eventos' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                                            onClick={() => setActiveTab('eventos')}
                                        >
                                            Listado de eventos
                                        </button>
                                        <button 
                                            className={`px-4 py-2 ${activeTab === 'deportes' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                                            onClick={() => setActiveTab('deportes')}
                                        >
                                            Listado de deportes
                                        </button>
                                        {/* <button 
                                            className={`px-4 py-2 ${activeTab === 'valoraciones' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                                            onClick={() => setActiveTab('valoraciones')}
                                        >
                                            Listado de valoraciones
                                        </button> */}
                                    </div>
                                    {/* Eventos */}
                                    {activeTab === 'eventos' && 
                                        (<>
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-3">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3">Evento</th>
                                                        <th scope="col" className="px-6 py-3">Modificar evento</th>
                                                        <th scope="col" className="px-6 py-3">Eliminar evento</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentEvents.map((event) => (
                                                        <tr key={event.id_evento} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                            <button 
                                                                onClick={() => navigateToEventDetail(event.id_evento)} 
                                                                className="px-6 py-4 text-blue-600 hover:underline"
                                                            >
                                                                {event.nombre}
                                                            </button>
                                                            <td className="px-6 py-4">
                                                                <button 
                                                                    onClick={() => navigateToUpdateEvent(event.id_evento)}
                                                                    className="w-30 text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                                                                        rounded-lg text-sm px-2 py-0.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800" 
                                                                >
                                                                    Modificar evento
                                                                </button>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <button 
                                                                    onClick={() => handleDeleteEvent(event.id_evento)}
                                                                    className="w-30 text-white bg-red-800 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium 
                                                                        rounded-lg text-sm px-2 py-0.5 text-center dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800" 
                                                                >
                                                                    Eliminar evento
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className="flex justify-center mt-2">
                                                {currentPage === 1 ? <></> 
                                                    : 
                                                    (<>
                                                        <button
                                                            onClick={prevPageEvents}
                                                            disabled={currentPage === 1}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            Anterior
                                                        </button>
                                                        <span className="text-gray-700 ml-3 mr-3">{currentPage}</span>
                                                        <button
                                                            onClick={nextPageEvents}
                                                            disabled={endIndex >= allEvents.length}
                                                            className=" text-blue-600 hover:underline"
                                                        >
                                                            Siguiente
                                                        </button>
                                                    </>
                                                    )
                                                }
                                            </div>
                                        </>)
                                    }
                                    {/* Deportes */}
                                    {activeTab === 'deportes' &&
                                        (<>
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-3">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3">Deporte</th>
                                                        <th scope="col" className="px-6 py-3">Modificar deporte</th>
                                                        <th scope="col" className="px-6 py-3">Eliminar deporte</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentSports.map((sport) => (
                                                        <tr key={sport.id_deporte} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                            <button 
                                                                onClick={() => navigateToSportDetail(sport.id_deporte)} 
                                                                className="px-6 py-4 text-blue-600 hover:underline"
                                                            >
                                                                {sport.nombre}
                                                            </button>
                                                            <td className="px-6 py-4">
                                                                <button 
                                                                    onClick={() => navigateToUpdateSport(Number(sport.id_deporte))}
                                                                    className="w-30 text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                                                                        rounded-lg text-sm px-2 py-0.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800" 
                                                                >
                                                                    Modificar deporte
                                                                </button>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <button 
                                                                    onClick={() => handleDeleteSport(sport.id_deporte)}
                                                                    className="w-30 text-white bg-red-800 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium 
                                                                        rounded-lg text-sm px-2 py-0.5 text-center dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800" 
                                                                >
                                                                    Eliminar deporte
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className="flex justify-center mt-2">
                                                {currentPage === 1 ? <></> 
                                                    : 
                                                    (<>
                                                        <button
                                                            onClick={prevPageSports}
                                                            disabled={currentPage === 1}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            Anterior
                                                        </button>
                                                        <span className="text-gray-700 ml-3 mr-3">{currentPage}</span>
                                                        <button
                                                            onClick={nextPageSports}
                                                            disabled={endIndex >= allSports.length}
                                                            className=" text-blue-600 hover:underline"
                                                        >
                                                            Siguiente
                                                        </button>
                                                    </>
                                                    )
                                                }
                                            </div>
                                        </>)
                                    }
                                    {/* Valoraciones */}
                                    {/* {activeTab === 'valoraciones' &&
                                        (<>
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-3">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3">Evento</th>
                                                        <th scope="col" className="px-6 py-3">Valoración</th>
                                                        <th scope="col" className="px-6 py-3">Modificar valoración</th>
                                                        <th scope="col" className="px-6 py-3">Eliminar valoración</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentRatings.map((rating) => (
                                                        <tr key={rating.id_rating} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                            <td className="px-6 py-4">
                                                                {rating.Event.nombre}
                                                            </td>
                                                            <button 
                                                                onClick={() => navigateToRatingDetail(rating.id_rating)} 
                                                                className="px-6 py-4 text-yellow-600 hover:underline"
                                                            >
                                                                {renderStars(rating.valoracion)}
                                                            </button>
                                                            <td className="px-6 py-4">
                                                                <button 
                                                                    onClick={() => navigateToUpdateEventRating(rating.id_rating)}
                                                                    className="w-30 text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                                                                        rounded-lg text-sm px-2 py-0.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800" 
                                                                >
                                                                    Modificar valoración
                                                                </button>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <button 
                                                                    onClick={() => handleDeleteRating(rating.id_rating)}
                                                                    className="w-30 text-white bg-red-800 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium 
                                                                        rounded-lg text-sm px-2 py-0.5 text-center dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800" 
                                                                >
                                                                    Eliminar valoración
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className="flex justify-center mt-2">
                                                {currentPage === 1 ? <></> 
                                                    : 
                                                    (<>
                                                        <button
                                                            onClick={prevPageRatings}
                                                            disabled={currentPage === 1}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            Anterior
                                                        </button>
                                                        <span className="text-gray-700 ml-3 mr-3">{currentPage}</span>
                                                        <button
                                                            onClick={nextPageRatings}
                                                            disabled={endIndex >= allRatings.length}
                                                            className=" text-blue-600 hover:underline"
                                                        >
                                                            Siguiente
                                                        </button>
                                                    </>
                                                    )
                                                }
                                            </div>
                                        </>)
                                    } */}
                                </a>
                            </div>
                        </div>
                        {/* Listado de usuarios */}
                        <div>
                            <h1 className="mt-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-4">Usuarios de la aplicación</h1>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-3">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">DNI</th>
                                        <th scope="col" className="px-6 py-3">Nombre</th>
                                        <th scope="col" className="px-6 py-3">Apellido</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Fecha de nacimiento</th>
                                        <th scope="col" className="px-6 py-3">Rol</th>
                                        <th scope="col" className="px-6 py-3">Teléfono</th>
                                        <th scope="col" className="px-6 py-3">Dirección</th>
                                        <th scope="col" className="px-6 py-3">Altura (cm)</th>
                                        <th scope="col" className="px-6 py-3">Peso (kg)</th>
                                        <th scope="col" className="px-6 py-3">Deporte</th>
                                        <th scope="col" className="px-6 py-3">Modificar usuario</th>
                                        <th scope="col" className="px-6 py-3">Eliminar usuario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((user) => (
                                        <tr key={user.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <td className="px-6 py-4">{user.dni}</td>
                                            <td className="px-6 py-4">{user.nombre}</td>
                                            <td className="px-6 py-4">{user.apellidos}</td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4">{dayjs.utc(user.fecha_nacimiento).format('DD-MM-YYYY')}</td>
                                            <td className="px-6 py-4">{user.role}</td>
                                            <td className="px-6 py-4">{user.telefono}</td>
                                            <td className="px-6 py-4">{user.direccion}</td>
                                            <td className="px-6 py-4">{user.altura}</td>
                                            <td className="px-6 py-4">{user.peso}</td>
                                            <td className="px-6 py-4">{user.deporte}</td>
                                            <td className="px-6 py-4">
                                                <button 
                                                    onClick={() => navigateToUpdateUser(user.id)}
                                                    className="w-30 text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                                                        rounded-lg text-sm px-2 py-0.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800" 
                                                    >
                                                        Modificar usuario
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button 
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="w-30 text-white bg-red-800 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium 
                                                        rounded-lg text-sm px-2 py-0.5 text-center dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800" 
                                                >
                                                    Eliminar usuario
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) 
                : 
                (<></>)
            }
            { rolUsuario === 'participante' ? 
                (
                    <>
                        {/* Grid con información del usuario */}
                        <div className="grid grid-cols-3 gap-4 mt-8 p-2">
                            <div>
                                <a className="block max-w p-4 bg-white border border-gray-200 rounded-lg shadow-sm 
                                    hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user?.nombre} {user?.apellidos}</h3>
                                    <hr></hr>
                                    <div className='mt-4'>
                                        <p><strong>Email: </strong>{user?.email}</p>
                                        <p><strong>Fecha de nacimiento: </strong>{dayjs.utc(user?.fecha_nacimiento).format('DD-MM-YYYY')}</p>
                                        <p><strong>Teléfono: </strong>{user?.telefono}</p>
                                        <p><strong>Dirección: </strong>{user?.direccion}</p>
                                        <p><strong>Altura: </strong>{user?.altura} cm</p>
                                        <p><strong>Peso: </strong>{user?.peso} kg</p>
                                        <p><strong>Deporte favorito: </strong>{user?.deporte}</p>
                                        <p><strong>Mejor marca: </strong>{user?.mejor_marca}</p>
                                        <button 
                                            onClick={navigateToUpdateProfile}
                                            className="w-30 mt-3 text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium 
                                                rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" 
                                        >
                                            Actualizar perfil
                                        </button>
                                    </div>
                                </a>
                            </div>
                            <div>
                                <a className="block max-w p-6 bg-white border border-gray-200 rounded-lg shadow-sm 
                                    hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Eventos disponibles</h3>
                                    <hr></hr>
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-3">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">Evento</th>
                                                <th scope="col" className="px-6 py-3">Fecha de evento</th>
                                                <th scope="col" className="px-6 py-3">Lugar del evento</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {events.filter(event => event.estado === 'sin_comenzar').map((userEvent) => (
                                                <tr key={userEvent.id_evento} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="px-6 py-4">
                                                        <button onClick={ () => navigateToEventDetail(userEvent.id_evento)} className="text-blue-600 hover:underline">
                                                            {userEvent.nombre}
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4">{dayjs(userEvent.fecha_ini).format('DD-MM-YYYY')}</td>
                                                    <td className="px-6 py-4">{userEvent.lugar}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </a>
                            </div>
                            <div>
                                <a className="block max-w p-6 bg-white border border-gray-200 rounded-lg shadow-sm 
                                    hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Estadísticas</h5>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="block">
                                            <strong><h1>Deportes favoritos</h1></strong>
                                            <div className="mt-2">
                                                {events.map((event) => (
                                                    <p key={event.id_evento}>{event.Sport.nombre}</p>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="block">
                                            <h1>Grid de eventos</h1>
                                        </div>
                                    </div>
                                    <button 
                                        // onClick={}
                                        className="w-30 mt-3 text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium 
                                            rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" 
                                    >
                                        Actualizar perfil
                                    </button>
                                </a>
                            </div>
                        </div>
                        {/* Listado de eventos que ha finalizado el usuario */}
                        <div>
                            <h1 className="mt-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-8">Eventos participados</h1>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ml-4 mt-3">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Evento</th>
                                        <th scope="col" className="px-6 py-3">Deporte</th>
                                        <th scope="col" className="px-6 py-3">Fecha de evento</th>
                                        <th scope="col" className="px-6 py-3">Lugar del evento</th>
                                        <th scope="col" className="px-6 py-3">Clasificación</th>
                                        <th scope="col" className="px-6 py-3">Puntos</th>
                                        <th scope="col" className="px-6 py-3">Tiempo</th>
                                        <th scope="col" className="px-6 py-3">Resultado</th>
                                        <th scope="col" className="px-6 py-3">Observaciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userEvents.filter(e => e.Event.estado === 'finalizado').map((userEvent) => (
                                        <tr key={userEvent.id_usuario} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{userEvent.Event.nombre}</th>
                                            <td className="px-6 py-4">{userEvent.Event.Sport.nombre}</td>
                                            <td className="px-6 py-4">{dayjs(userEvent.Event.fecha_ini).format('DD-MM-YYYY')}</td>
                                            <td className="px-6 py-4">{userEvent.Event.lugar}</td>
                                            <td className="px-6 py-4">{userEvent.clasificacion}</td>
                                            <td className="px-6 py-4">{userEvent.puntos}</td>
                                            <td className="px-6 py-4">{userEvent.tiempo}</td>
                                            <td className="px-6 py-4">{userEvent.resultado}</td>
                                            <td className="px-6 py-4">{userEvent.observaciones}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) 
                : 
                (<></>)
            }
            { rolUsuario === 'organizador' ? 
                (
                    <>
                        <div className="grid grid-cols-3 gap-4 mt-8 p-2">
                            <div>
                                <a className="block max-w p-4 bg-white border border-gray-200 rounded-lg shadow-sm 
                                    hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user?.nombre} {user?.apellidos}</h3>
                                    <hr></hr>
                                    <div className='mt-4'>
                                        <p><strong>Email: </strong>{user?.email}</p>
                                        <p><strong>Fecha de nacimiento: </strong>{dayjs.utc(user?.fecha_nacimiento).format('DD-MM-YYYY')}</p>
                                        <p><strong>Teléfono: </strong>{user?.telefono}</p>
                                        <p><strong>Dirección: </strong>{user?.direccion}</p>
                                        <p><strong>Altura: </strong>{user?.altura} cm</p>
                                        <p><strong>Peso: </strong>{user?.peso} kg</p>
                                        <p><strong>Deporte favorito: </strong>{user?.deporte}</p>
                                        <p><strong>Mejor marca: </strong>{user?.mejor_marca}</p>
                                        <button 
                                            onClick={navigateToUpdateProfile}
                                            className="w-30 mt-3 text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium 
                                                rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" 
                                        >
                                            Actualizar perfil
                                        </button>
                                    </div>
                                </a>
                            </div>
                            <div className="col-span-2">
                                <a className="block max-w p-6 bg-white border border-gray-200 rounded-lg shadow-sm 
                                    hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Eventos finalizados</h3>
                                    <hr></hr>
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-3">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">Evento</th>
                                                <th scope="col" className="px-6 py-3">Fecha de evento</th>
                                                <th scope="col" className="px-6 py-3">Lugar del evento</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                            eventsOrganizer.filter(event => event.createdBy === user?.email && event.estado === 'finalizado')
                                                .map((userEvent) => (
                                                <tr key={userEvent.id_usuario} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="px-6 py-4">{userEvent.nombre}</td>
                                                    <td className="px-6 py-4">{dayjs(userEvent.fecha_ini).format('DD-MM-YYYY')}</td>
                                                    <td className="px-6 py-4">{userEvent.lugar}</td>
                                                    <td className="px-6 py-4">
                                                        <button 
                                                            onClick={() => navigateToAddStats(userEvent.id_evento)}
                                                            className="text-blue-600 dark:text-blue-400 hover:underline">
                                                            Añadir estadísticas
                                                        </button>
                                                    </td>                                                
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </a>
                            </div>
                        </div>
                        {/* Listado de eventos que ha finalizado el usuario */}
                        <div>
                            <h1 className="mt-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-8">Eventos creados</h1>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ml-4 mt-3">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Evento</th>
                                        <th scope="col" className="px-6 py-3">Deporte</th>
                                        <th scope="col" className="px-6 py-3">Fecha de evento</th>
                                        <th scope="col" className="px-6 py-3">Lugar del evento</th>
                                        <th scope="col" className="px-6 py-3">Máximo de usuarios</th>
                                        <th scope="col" className="px-6 py-3">Estado del evento</th>
                                        <th scope="col" className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventsOrganizer.filter(event => event.createdBy === user?.email).map((userEvent) => (
                                        <tr key={userEvent.id_usuario} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{userEvent.nombre}</th>
                                            <td className="px-6 py-4">{userEvent.Sport.nombre}</td>
                                            <td className="px-6 py-4">{dayjs(userEvent.fecha_ini).format('DD-MM-YYYY')}</td>
                                            <td className="px-6 py-4">{userEvent.lugar}</td>
                                            <td className="px-6 py-4">{userEvent.maximo_usuarios}</td>
                                            <td className="px-6 py-4">
                                                <span 
                                                    className={`px-3 py-1 rounded-lg text-white font-semibold
                                                        ${userEvent.estado === 'sin_comenzar' ? 'bg-blue-500' : ''}
                                                        ${userEvent.estado === 'en_curso' ? 'bg-green-500' : ''}
                                                        ${userEvent.estado === 'finalizado' ? 'bg-red-500' : ''}`}
                                                    >
                                                    {userEvent.estado === 'sin_comenzar' ? 'Sin comenzar' : ''}
                                                    {userEvent.estado === 'en_curso' ? 'En curso' : ''}
                                                    {userEvent.estado === 'finalizado' ? 'Finalizado' : ''}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {userEvent.estado !== 'finalizado' && (
                                                    <button 
                                                        onClick={() => updateStatusFromEvent(userEvent.id_evento, userEvent.estado)} 
                                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                                    >
                                                        Cambiar estado
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) 
                : 
                (<></>)
            }
        </>
    );
};

export default ProfilePage;