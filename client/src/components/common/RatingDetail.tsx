
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRatingById } from '../../api/ratings';

const RatingDetail = () => {
    interface Rating {
        id_rating: number;
        valoracion: number;
        comentario: string;
        Event: {
            nombre: string;
            Sport: {
                nombre: string;
            }
        };
        user: {
            email: string;
        };
    }

    const [ratings, setRatings] = useState<Rating | null>(null);
    const { id_rating } = useParams();

    const fetchRating = async (id_rating: number) => {
        try {
            const data = await getRatingById(id_rating);
            setRatings(data);
        } catch (error) {
            console.error('Error fetching ratings:', error);
        }
    };

    useEffect(() => {
        if (id_rating) {
            fetchRating(Number(id_rating));
        }
    }, [id_rating]);
    
    

    // Generar estrellas según la valoración
    const renderStars = (ratingValue: number) => {
        const maxStars = 5; // Máximo de estrellas
        const filledStars = '★'.repeat(ratingValue); // Estrellas llenas
        const emptyStars = '☆'.repeat(maxStars - ratingValue); // Estrellas vacías
        return `${filledStars}${emptyStars}`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl mb-4">Valoración del evento: <strong>{ratings?.Event.nombre}</strong></h1>
            <div className="max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {ratings ? (
                    <div key={ratings.id_rating} className="p-4 mb-4 ml-2 rounded-l">
                        <p><strong>Valoración:</strong> <span className="text-yellow-500">{renderStars(ratings.valoracion)}</span></p>
                        <p><strong>Comentario:</strong> {ratings.comentario}</p>
                        <p><strong>Deporte:</strong> {ratings.Event.Sport.nombre}</p>
                        <p><strong>Usuario de la valoración:</strong> {ratings.user.email}</p>
                    </div>
                ) : (
                    <p className="ml-2">No hay valoraciones disponibles.</p>
                )}

            </div>
        </div>
    );

};

export default RatingDetail;