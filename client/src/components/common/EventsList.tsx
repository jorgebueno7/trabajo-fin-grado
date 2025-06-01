import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from "../../context/UsersContext";
import { getEvents } from '../../api/events';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const ITEMS_PER_PAGE = 8;

const Eventos = () => {
    interface Event {
        id_evento: number;
        nombre: string;
        id_deporte: number;
        fecha_ini: string;
        fecha_fin: string;
        fecha_limite: string;
        lugar: string;
        hora_ini: string;
        maximo_usuarios: number;
        estado: string;
        imagen: string;
        Sport: {
            nombre: string;
        }
    }

    const [events, setEvents] = useState<Event[]>([]);
    const { user, isLoggedIn } = useContext(UserContext);
    const [selectedSport, setSelectedSport] = useState<string>('all');
    const [selectedEstado, setSelectedEstado] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const deportes = [...new Set(events.map(e => e.Sport.nombre))]; // Lista de deportes únicos
    const [currentPage, setCurrentPage] = useState(1);

    const nextPageEvents = () => {
        if (endIndex < events.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPageEvents = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
        setCurrentPage(1);
    }, [selectedEstado, selectedSport, searchQuery]);

    const fetchEvents = async () => {
        try {
            const data = await getEvents();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleCreateEventClick = () => {
        navigate('/create-event');
    };

    const rolUsuario = user?.role;

    const filteredEvents = events.filter(event => {
        const matchesEstado = selectedEstado === 'all' || event.estado === selectedEstado;
        const matchesDeporte = selectedSport === 'all' || event.Sport?.nombre === selectedSport;
        const matchesSearch = event.nombre.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesEstado && matchesDeporte && matchesSearch;
    });

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentEvents = filteredEvents.slice(startIndex, endIndex);

    const estadoLabels: { [key: string]: string } = {
        sin_comenzar: 'Sin comenzar',
        en_curso: 'En curso',
        finalizado: 'Finalizado'
    };
    
    return (
        <>
            <div className="flex items-end gap-6 mx-20 mt-6">
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Buscar por nombre:
                    </label>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Ej. Carrera en bicicleta"
                        className="mt-1 w-full py-2 px-3 border border-gray-300 bg-white dark:bg-gray-700 dark:text-white rounded-md shadow-sm"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Filtrar por deporte:</label>
                    <select
                        value={selectedSport}
                        onChange={(e) => setSelectedSport(e.target.value)}
                        className="mt-1 w-48 py-2 px-3 border border-gray-300 bg-white dark:bg-gray-700 dark:text-white rounded-md shadow-sm"
                    >
                        <option value="all">Todos</option>
                        {deportes.map((nombre) => (
                            <option key={nombre} value={nombre}>
                                {nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Filtrar por estado:</label>
                    <select
                        value={selectedEstado}
                        onChange={(e) => setSelectedEstado(e.target.value)}
                        className="mt-1 w-48 py-2 px-3 border border-gray-300 bg-white dark:bg-gray-700 dark:text-white rounded-md shadow-sm"
                    >
                        <option value="all">Todos los estados</option>
                        {Array.from(new Set(events.map((e) => e.estado))).map((estado) => (
                            <option key={estado} value={estado}>
                                {estadoLabels[estado] || estado}
                            </option>
                        ))}
                    </select>
                </div>
                {isLoggedIn && rolUsuario !== 'participante' && (
                    <div className="flex items-end h-full">
                        <button
                            onClick={handleCreateEventClick}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg"
                        >
                            Crear evento
                        </button>
                    </div>
                )}
            </div>

            {/* Aquí se muestra la lista de eventos generales */}
            <div className="grid grid-cols-4 gap-x-6 mx-20">
                {currentEvents.map((event) => (
                    <Link key={event.id_evento} to={`/events/${event.id_evento}`}>
                        <figure className="mt-4 relative hover:filter hover:grayscale">
                            <figcaption className="absolute inset-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <strong>
                                    <h1 className="text-gray-900 bg-white bg-opacity-60 rounded-md px-1.5 py-0.5">{event.nombre}</h1>
                                </strong>
                                <strong>
                                    <p className="text-gray-900 bg-white bg-opacity-60 rounded-md px-1.5 py-0.5">{dayjs.utc(event.fecha_ini).format('DD-MM-YYYY - HH:mm:ss')}</p>
                                </strong>
                                <strong>
                                    <p className="text-gray-900 bg-white bg-opacity-60 rounded-md px-1.5 py-0.5">{dayjs.utc(event.fecha_fin).format('DD-MM-YYYY - HH:mm:ss')}</p>
                                </strong>
                                <br />
                                <strong>
                                    <p className="block text-center bg-white bg-opacity-60 rounded-md px-1.5 py-0.5">{event.lugar}</p>
                                </strong>
                            </figcaption>
                            <img
                                className="w-[480px] h-[390px] object-cover rounded-lg transition-all duration-300 cursor-pointer"
                                src={
                                    event.imagen
                                        ? `http://localhost:5000/sportly/events/${event.id_evento}/imagen`
                                        : `https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg`
                                }
                                alt="Imagen del evento"
                            />
                        </figure>
                    </Link>
                ))}
            </div>

            <div className="flex justify-center mt-2 space-x-4">
                {currentPage > 1 && (
                    <button
                        onClick={prevPageEvents}
                        className="mt-3 text-blue-600 hover:underline"
                    >
                        Anterior
                    </button>
                )}
                <span className="text-gray-700 ml-3 mr-3 mt-3">{currentPage}</span>
                {endIndex < events.length && (
                    <button
                        onClick={nextPageEvents}
                        className="mt-3 text-blue-600 hover:underline"
                    >
                        Siguiente
                    </button>
                )}
            </div>
        </>
    );
};

export default Eventos;
