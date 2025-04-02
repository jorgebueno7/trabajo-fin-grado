
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
    const { id_rating } = useParams(); // Obtener el id_evento de la URL

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
        <div className="p-5">
            <h1 className="text-2xl mb-4 ml-2">Valoración del evento <strong>{ratings?.Event.nombre}</strong></h1>
                {ratings ? (
                    <div key={ratings.id_rating} className="border p-4 mb-4 ml-2 rounded-lg bg-white shadow-md">
                        <p><strong>Valoración:</strong> <span className="text-yellow-500">{renderStars(ratings.valoracion)}</span></p>
                        <p><strong>Comentario:</strong> {ratings.comentario}</p>
                        <p><strong>Deporte:</strong> {ratings.Event.Sport.nombre}</p>
                        <p><strong>Usuario de la valoración:</strong> {ratings.user.email}</p>
                    </div>
                ) : (
                    <p className="ml-2">No hay valoraciones disponibles.</p>
                )}
        </div>
    );

};

export default RatingDetail;