import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRankingById, putRanking } from '../api/rankings';

import Footer from '../components/Footer';

const UpdateRanking = () => {
    const { id_ranking } = useParams<{ id_ranking: string }>();
    const [clasificacion, setClasificacion] = useState<string>('');
    const [puntos, setPuntos] = useState<string>('');
    const [tiempo, setTiempo] = useState<string>('');
    const [resultado, setResultado] = useState<string>('');
    const [observaciones, setObservaciones] = useState<string>('');

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    const fetchRanking = async () => {
        try {
            if (id_ranking) {
                const ranking = await getRankingById(id_ranking);
                if (ranking) {
                    setClasificacion(ranking.clasificacion || '');
                    setPuntos(ranking.puntos || '');
                    setTiempo(ranking.tiempo || '');
                    setResultado(ranking.resultado || '');
                    setObservaciones(ranking.observaciones || '');
                }
            }
        }
        catch (error) {
            console.error('Error fetching ranking:', error);
        }
    };
    
    useEffect(() => {
        fetchRanking();
    }, [id_ranking]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!clasificacion || !puntos || !tiempo || !resultado || !observaciones) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        try {
            if(id_ranking){
                await putRanking(id_ranking, {
                    clasificacion,
                    puntos,
                    tiempo,
                    resultado,
                    observaciones,
                });
                alert('Ranking actualizado correctamente.');
                handleBack();
            }
        } catch (error) {
            console.error('Error updating ranking:', error);
            alert('Error al actualizar el ranking. Por favor, inténtalo de nuevo.');
        }
    }
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow"
                >
                    <h1 className="text-2xl font-bold mb-4 text-center">Actualizar ranking</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                            Clasificación
                        </label>
                        <input
                            type="number"
                            value={clasificacion}
                            onChange={(e) => setClasificacion(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_inicio">
                            Puntos
                        </label>
                        <input
                            type="number"
                            value={puntos}
                            onChange={(e) => setPuntos(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hora_inicio">
                            Tiempo empleado (min)
                        </label>
                        <input
                            type="number"
                            value={tiempo}
                            onChange={(e) => setTiempo(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hora_fin">
                            Resultado
                        </label>
                        <input
                            type="text"
                            value={resultado}
                            onChange={(e) => setResultado(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lugar">
                            Observaciones
                        </label>
                        <input
                            type="text"
                            value={observaciones}
                            onChange={(e) => setObservaciones(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Actualizar ranking
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default UpdateRanking;