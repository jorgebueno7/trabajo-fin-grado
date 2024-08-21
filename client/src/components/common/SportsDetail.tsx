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
        <div>
            <h1>{sport.nombre}</h1>
            <p>{sport.descripcion}</p>
            <p>{sport.informacion}</p>
            <p>{sport.categoria}</p>
            <p>{sport.equipamiento}</p>
        </div>
    );
};

export default SportDetail;