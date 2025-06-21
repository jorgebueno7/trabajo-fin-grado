import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRatings } from '../api/ratings';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const RatingEvent = () => {
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
    const navigate = useNavigate();

    const navigateToEventDetail = (eventId: number) => {
        navigate(`/events/${eventId}`);
    }
    
    useEffect(() => {
        fetchEvents(); 
    }, []);
    
    const fetchEvents = async () => {
        try {
            const data = await getRatings();
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

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4 ml-2">Valoraciones de eventos</h1>
                {ratings.length > 0 ? 
                    (ratings.map((rating) => 
                        <div key={rating.id_evento} className="border p-4 mb-4 ml-2 rounded-lg bg-white shadow-md">
                            <h3 className="text-xl font-bold mb-1">{rating.Event.nombre}</h3>
                            <hr className='mb-2' />
                            <p><strong>Evento:</strong> {rating.Event.nombre}</p>
                            <p><strong>Usuario:</strong> {rating.user.email}</p>
                            <p><strong>Valoración:</strong> <span className="text-yellow-500">{renderStars(rating.valoracion)}</span></p>
                            <p><strong>Comentario:</strong> {rating.comentario}</p>
                            <button 
                                onClick={() => navigateToEventDetail(rating.id_evento)}
                                className="inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700"
                            >
                                Información del evento
                            </button>
                        </div>
                    )) 
                    : 
                    (<p className="ml-2">No hay valoraciones disponibles.</p>)
                }
                <button>
                    
                </button>
        </div>
    );
};

export default RatingEvent;
