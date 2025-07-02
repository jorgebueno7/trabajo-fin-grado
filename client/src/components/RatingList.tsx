import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRatings, deleteRating } from '../api/ratings';
import Footer from '../components/Footer';

const ITEMS_PER_PAGE = 6;

const Valoraciones = () => {
    interface Rating {
        id_rating: number;
        valoracion: number;
        comentario: string;
        Event: {
            id_evento: number;
            nombre: string;
            Sport: {
                nombre: string;
            }
        };
        user: {
            email: string;
        };
    }
      
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<string>('all');
    const eventos = [...new Set(ratings.map(e => e.Event.nombre))];
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const nextPageEvents = () => {
        if (endIndex < ratings.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPageEvents = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const navigate = useNavigate();

    const navigateToUpdateRating = (id_rating: number) => {
        navigate(`/ratings/update/${id_rating}`)
    }
    useEffect(() => {
        fetchRatings();
        setCurrentPage(1);
    }, [selectedEvent]);
    
    const fetchRatings = async () => {
        try {
          const data = await getRatings();
          setRatings(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
    };

    const renderStars = (ratingValue: number) => {
        const maxStars = 5;
        const filledStars = '★'.repeat(ratingValue); 
        const emptyStars = '☆'.repeat(maxStars - ratingValue); 
        return `${filledStars}${emptyStars}`;
    };

    const handleDeleteRating = async (id: number) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta valoración?")) {
            try {
                await deleteRating(id);
                setRatings(ratings.filter(rating => rating.id_rating !== id));
            } catch (error) {
                console.error("Error al eliminar valoración:", error);
                alert("Hubo un problema al eliminar la valoración");
            }
        }
    }

    const filteredRatings = ratings.filter(rating => {
        const matchesEvento = selectedEvent === 'all' || rating.Event.nombre === selectedEvent;
        return matchesEvento;
    });

    const currentRatings = filteredRatings.slice(startIndex, endIndex);

    return (
        <>
            <div className="flex items-end gap-6 mx-20 mt-6">
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Filtrar por evento:</label>
                    <select
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
                        className="mt-1 w-48 py-2 px-3 border border-gray-300 bg-white dark:bg-gray-700 dark:text-white rounded-md shadow-sm"
                    >
                        <option value="all">Todos</option>
                        {eventos.map((nombre) => (
                            <option key={nombre} value={nombre}>
                                {nombre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex items-end gap-6 mx-20 mb-3">
                <h1 className="text-2xl font-bold mt-4">Listado de valoraciones</h1>
            </div>

            <div className="grid grid-cols-4 gap-x-4 mx-16">
                    {ratings.length > 0 ? 
                        (currentRatings.map((rating) => 
                            <div key={rating.id_rating} className="border p-4 mb-4 ml-2 rounded-lg bg-white shadow-md">
                                <h3 className="text-xl font-bold mb-1">{rating.Event.nombre}</h3>
                                <hr className='mb-2' />
                                <p><strong>Evento:</strong> <a className="font-normal text-blue-700 dark:text-blue-400 hover:underline" href={`/events/${rating.Event.id_evento}`}>{rating.Event.nombre}</a></p>
                                <p><strong>Deporte:</strong> {rating.Event.Sport.nombre}</p>
                                <p><strong>Usuario:</strong> {rating.user.email}</p>
                                <p><strong>Valoración:</strong> <span className="text-yellow-500">{renderStars(rating.valoracion)}</span></p>
                                <p><strong>Comentario:</strong> {rating.comentario}</p>
                                <button
                                    className="mt-4 mr-4 w-50 text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                                        rounded-lg text-sm px-2.5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800" 
                                    onClick={() => navigateToUpdateRating(rating.id_rating)}>Modificar valoración</button>
                                <button
                                    className="w-50 text-white bg-red-800 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium 
                                        rounded-lg text-sm px-2.5 py-2.5 text-center dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800" 
                                    onClick={() => handleDeleteRating(rating.id_rating)}>Eliminar valoración</button>

                            </div>
                        )) 
                        : 
                        (<p className="ml-2">No hay valoraciones disponibles.</p>)
                    }
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
                {endIndex < ratings.length && (
                    <button
                        onClick={nextPageEvents}
                        className="mt-3 text-blue-600 hover:underline"
                    >
                        Siguiente
                    </button>
                )}
            </div>
            <Footer />
        </>
        
    );
};

export default Valoraciones;