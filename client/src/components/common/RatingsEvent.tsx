import { useEffect, useState } from 'react';
import { getRatings } from '../../api/ratings';
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
