import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSportsById } from '../../api/sports';

const SportDetail = () => {
    interface Sport {
        id_deporte: number;
        nombre: string;
        descripcion: string;
        informacion: string;
        categoria: string;
        equipamiento: string;
    }
    const { id } = useParams<{ id: string }>();
    const [sport, setSport] = useState<Sport | null>(null);

    useEffect(() => {
        const fetchSport = async () => {
            try {
                const data = await getSportsById(Number(id));
                setSport(data);
            } catch (error) {
                console.error('Error fetching sport:', error);
            }
        };

        fetchSport();
    }, [id]);

    if (!sport) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href={`/sports/${sport.id_deporte}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{sport.nombre}</h5>
                </a>
                <hr></hr><br></br>
                <p className="text-gray-700 dark:text-gray-400">Descripción: <strong>{sport.descripcion}</strong></p>
                <p className="text-gray-700 dark:text-gray-400">Información: <strong>{sport.informacion}</strong></p>
                <p className="text-gray-700 dark:text-gray-400">Categoria: <strong>{sport.categoria}</strong></p>
                <p className="text-gray-700 dark:text-gray-400">Equipamiento: <strong>{sport.equipamiento}</strong></p>
            </div>
        </div>    
    );
};

export default SportDetail;