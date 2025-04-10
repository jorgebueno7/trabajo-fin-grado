import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRatings, deleteRating } from '../../api/ratings';

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
    const navigate = useNavigate();

    const navigateToUpdateRating = (id_rating: number) => {
        navigate(`/ratings/update/${id_rating}`)
    }
    useEffect(() => {
        fetchRatings();
    }, []);
    
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

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4 ml-2">Listado de valoraciones</h1>
                {ratings.length > 0 ? 
                    (ratings.map((rating) => 
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
    );
};

export default Valoraciones;