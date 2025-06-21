import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSports } from '../api/sports';
import UserContext from "../context/UsersContext";

const ITEMS_PER_PAGE = 8;

const Deportes = () => {
    interface Sport {
        id_deporte: number;
        nombre: string;
        descripcion: string;
        informacion: string;
        categoria: string;
        equipamiento: string;
        imagen: string;
    }

    const [sports, setSports] = useState<Sport[]>([]);
    const { user, isLoggedIn } = useContext(UserContext);
    const [selectedSport, setSelectedSport] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const deportes = [...new Set(sports.map(e => e.nombre))]; // Lista de deportes únicos

    const [currentPage, setCurrentPage] = useState(1);

    const nextPageSports = () => {
        if (endIndex < sports.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPageSports = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const navigate = useNavigate();

    useEffect(() => {
        fetchSports();
    }, [selectedSport, searchQuery]);
    
    const fetchSports = async () => {
        try {
          const data = await getSports();
          setSports(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
    };

    const handleCreateSportClick = () => {
        navigate('/create-sport');
    };

    const rolUsuario = user?.role;

    const filteredSports = sports.filter(sport => {
        const matchesDeporte = selectedSport === 'all' || sport.nombre === selectedSport;
        const matchesSearch = sport.nombre.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDeporte && matchesSearch;
    });

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentSports = filteredSports.slice(startIndex, endIndex);

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
                        placeholder="Ej. Fútbol, Baloncesto"
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
                <div className="flex items-end h-full">
                    {isLoggedIn && rolUsuario !== 'participante' && rolUsuario !== 'organizador' &&
                        <button
                            type="submit"
                            onClick={handleCreateSportClick}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg"
                        >
                            Crear deporte
                        </button>
                    }
                </div>
            </div>
            <div className="grid grid-cols-4 gap-x-6 mx-20">
                {currentSports.map((sport) => (
                    <Link key={sport.id_deporte} to={`/sports/${sport.id_deporte}`}>
                        <figure  className="mt-4 relative hover:filter hover:grayscale">
                            <figcaption className="absolute inset-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <strong><h1 className="text-lg bg-white bg-opacity-60 rounded-md px-1.5 py-0.5">{sport.nombre}</h1></strong>
                                <strong><p className="text-gray-900 bg-white bg-opacity-60 rounded-md px-1.5 py-0.5">{sport.descripcion}</p></strong>                            
                                <br></br>
                                <strong><p className="block text-center bg-white bg-opacity-60 rounded-md px-1.5 py-0.5">{sport.informacion}</p></strong>
                            </figcaption>
                            <img
                                className="w-[480px] h-[390px] object-cover rounded-lg transition-all duration-300 cursor-pointer"
                                src={
                                    sport.imagen
                                        ? `http://localhost:5000/sportly/sports/${sport.id_deporte}/imagen`
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
                        onClick={prevPageSports}
                        className="mt-3 text-blue-600 hover:underline"
                    >
                        Anterior
                    </button>
                )}
                <span className="text-gray-700 ml-3 mr-3 mt-3">{currentPage}</span>
                {endIndex < sports.length && (
                    <button
                        onClick={nextPageSports}
                        className="mt-3 text-blue-600 hover:underline"
                    >
                        Siguiente
                    </button>
                )}
            </div>
        </>
    );
};

export default Deportes;