import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRatingsByEvent } from '../../api/ratings';

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

export default RatingDetail;
