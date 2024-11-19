import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRatingById, putRating } from '../../api/ratings';

const UpdateRatingEvent = () => {
    const { id_rating } = useParams<{ id_rating: string }>();
    const [valoracion, setValoracion] = useState<number>(0);
    const [comentario, setComentario] = useState<string>('');
    const [idEvento, setIdEvento] = useState<number | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRating = async () => {
            try {
                if (id_rating) {
                    const rating = await getRatingById(Number(id_rating)); // Obtener la valoración existente
                    setValoracion(rating.valoracion);
                    setComentario(rating.comentario);
                    setIdEvento(rating.id_evento); // Guardar el id_evento
                }
            } catch (error) {
                console.error('Error al obtener la valoración:', error);
                alert('No se pudo cargar la valoración.');
            }
        };
        fetchRating();
    }, [id_rating]);

    const handleRatingChange = (rating: number) => {
        setValoracion(rating);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!valoracion || !comentario.trim()) {
            alert('Por favor, selecciona una valoración y escribe un comentario.');
            return;
        }
        try {
            if (id_rating) {
                await putRating(Number(id_rating), valoracion, comentario.trim());
                alert('¡Valoración actualizada exitosamente!');
                navigate(`/ratings/${idEvento}`);
            }
        } catch (error) {
            console.error('Error al actualizar la valoración:', error);
            alert('Ocurrió un error al actualizar la valoración. Por favor, inténtalo de nuevo.');
        }
    };

    const renderStars = () => {
        const maxStars = 5;
        return (
            <div className="flex space-x-1">
                {[...Array(maxStars)].map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => handleRatingChange(index + 1)}
                        className={`text-2xl ${
                            index < valoracion ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                    >
                        ★
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow"
            >
                <h1 className="text-2xl font-bold mb-4 text-center">Actualizar valoración</h1>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Selecciona tu valoración:
                    </label>
                    {renderStars()}
                </div>
                <div className="mb-4">
                    <label htmlFor="comentario" className="block mb-2 text-sm font-medium text-gray-700">
                        Escribe tu comentario:
                    </label>
                    <textarea
                        id="comentario"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        rows={4}
                        placeholder="Escribe un comentario sobre el evento..."
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    Actualizar
                </button>
            </form>
        </div>
    );
};

export default UpdateRatingEvent;
