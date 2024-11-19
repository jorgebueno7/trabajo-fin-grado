import { useEffect, useState, useContext } from 'react';
import UserContext from '../../context/UsersContext';
import { useParams, useNavigate } from 'react-router-dom';
import { getRatingsByEvent, deleteRating } from '../../api/ratings';

const RatingDetail = () => {
    interface Rating {
        id_rating: number;
        id_usuario: number;
        id_evento: number;
        valoracion: number;
        comentario: string;
        Event: {
            nombre: string;
        };
        user: {
            email: string;
        };
    }

    const [ratings, setRatings] = useState<Rating[]>([]);
    const { id_evento } = useParams<{ id_evento: string }>(); // Obtener el id_evento de la URL
    const { isLoggedIn, user } = useContext(UserContext);4

    const navigate = useNavigate();

    const navigateToUpdateRating = (id_rating: number) => {
        navigate(`/ratings/update/${id_rating}`);
    }
    const navigateToEventDetail = (eventId: number) => {
        navigate(`/events/${eventId}`);
    }
    useEffect(() => {
        if (id_evento) {
            fetchEvents(Number(id_evento));
        }
    }, [id_evento]);
    
    const fetchEvents = async (eventId: number) => {
        try {
            const data = await getRatingsByEvent(eventId);
            console
            setRatings(data);
        } catch (error) {
            console.error('Error fetching ratings:', error);
        }
    };

    // Generar estrellas según la valoración
    const renderStars = (ratingValue: number) => {
        const maxStars = 5; // Máximo de estrellas
        const filledStars = '★'.repeat(ratingValue); // Estrellas llenas
        const emptyStars = '☆'.repeat(maxStars - ratingValue); // Estrellas vacías
        return `${filledStars}${emptyStars}`;
    };

    const nombreEvento = () => {
        return ratings.length > 0 ? ratings[0].Event.nombre : '';
    }
    
    const handleDeleteRating = async (id_rating: number) => {
        try {
            await deleteRating(id_rating); // Llama a la API para eliminar el usuario del evento
            setRatings(ratings.filter(rating => rating.id_rating !== id_rating)); // Elimina el evento de la lista local
            alert('Valoración eliminada correctamente');
        } catch (error) {
            console.error('Error al eliminar el evento:', error);
            alert('Hubo un error al intentar darte de baja.');
        }
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl mb-4 ml-2">Valoraciones del evento: <strong>{nombreEvento()}</strong></h1>
                {ratings.length > 0 ? 
                    (ratings.map((rating) => 
                        <div key={rating.id_evento} className="border p-4 mb-4 ml-2 rounded-lg bg-white shadow-md">
                            <h3 className="text-xl font-bold mb-1">{rating.Event.nombre}</h3>
                            <hr className='mb-2' />
                            <p><strong>Evento:</strong> {rating.Event.nombre}</p>
                            <p><strong>Usuario:</strong> {rating.user.email}</p>
                            <p><strong>Valoración:</strong> <span className="text-yellow-500">{renderStars(rating.valoracion)}</span></p>
                            <p><strong>Comentario:</strong> {rating.comentario}</p>
                            { isLoggedIn && user?.email === rating.user.email? 
                                (<div>
                                    <button 
                                        className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                        onClick={() => handleDeleteRating(rating.id_rating)}
                                    >
                                        Eliminar valoracion
                                    </button> 
                                    <button 
                                        className="mt-3 px-4 py-2 ml-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                        onClick={() => navigateToUpdateRating(rating.id_rating)}
                                    >
                                        Actualizar valoracion
                                    </button>
                                    <button 
                                        onClick={() => navigateToEventDetail(rating.id_evento)}
                                        className="mt-3 px-4 py-2 ml-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Información del evento
                                    </button>
                                </div>)
                                : 
                                <></>
                            }
                        </div>
                    )) 
                    : 
                    (<p className="ml-2">No hay valoraciones disponibles.</p>)
                }
                
        </div>
    );
};

export default RatingDetail;
