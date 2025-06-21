import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { postRating } from '../api/ratings';

const CreateRatingEvent = () => {
    const { id_evento } = useParams<{ id_evento: string }>(); // Obtener el ID del evento desde la URL
    const [valoracion, setValoracion] = useState<number>(0);
    const [comentario, setComentario] = useState<string>('');


    const handleRatingChange = (rating: number) => {
        setValoracion(rating);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!valoracion || !comentario.trim()) {
            alert('Por favor, selecciona una valoración y escribe un comentario.');
            return;
        }
        if(!id_evento) {
            console.log('ID del evento no encontrado');
        }
        try {
            if (id_evento) {
                await postRating(Number(id_evento), valoracion, comentario.trim());
                alert('¡Valoración creada exitosamente!');
            }
        } catch (error) {
            console.error('Error al crear la valoración:', error);
            alert('Ocurrió un error al crear la valoración. Por favor, inténtalo de nuevo.');
        } 
    };

    // Generar estrellas seleccionables
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
                <h1 className="text-2xl font-bold mb-4 text-center">Valorar evento</h1>
                <hr></hr><br></br>
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
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Enviar valoración
                </button>
            </form>
        </div>
    );
};

export default CreateRatingEvent;