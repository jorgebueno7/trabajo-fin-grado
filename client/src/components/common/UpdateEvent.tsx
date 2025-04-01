import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventsById, putEvent } from '../../api/events';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const UpdateEvent = () => {
    const { id_evento } = useParams<{ id_evento: string }>();

    const [fecha_inicio, setFechaInicio] = useState<string>('');
    const [hora_inicio, setHoraInicio] = useState<string>('');
    const [hora_fin, setHoraFin] = useState<string>('');
    const [lugar, setLugar] = useState<string>('');
    const [maximo_usuarios, setMaximoUsuarios] = useState<number>(0);
    const [fecha_limite, setFechaLimite] = useState<string>('');
    const [estado, setEstado] = useState<string>('');


    const navigate = useNavigate();

    const fetchEvent = async () => {
        try {
            if (id_evento) {
                const event = await getEventsById(Number(id_evento));
                if (event) {
                    setFechaInicio(dayjs(event.fecha_inicio).format('YYYY-MM-DD'));
                    setHoraInicio(event.hora_inicio);
                    setHoraFin(event.hora_fin);
                    setLugar(event.lugar);
                    setMaximoUsuarios(event.maximo_usuarios);   
                    setFechaLimite(dayjs(event.fecha_limite).format('YYYY-MM-DD'));
                    setEstado(event.estado);
                }
            }
        } catch (error) {
            console.error('Error al obtener el deporte:', error);
            alert('No se pudo cargar el deporte.');
        }
    }

    useEffect(() => {
        fetchEvent();
    }, [id_evento]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fecha_inicio || !hora_inicio || !hora_fin || !lugar || !maximo_usuarios 
            || !fecha_limite || !estado) {
            alert('Por favor, rellena todos los campos.');
            return;
        }
        try {
            if (id_evento) {
                const eventData = { fecha_inicio, hora_inicio, hora_fin, lugar, maximo_usuarios, fecha_limite, estado };
                console.log('data enviada', eventData);
                await putEvent(Number(id_evento), eventData);
                navigate(`/events/${id_evento}`);
            }
        } catch (error) {
            console.error('Error al actualizar el evento:', error);
            alert('Ocurrió un error al actualizar el evento. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow"
            >
                <h1 className="text-2xl font-bold mb-4 text-center">Actualizar evento</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_inicio">
                        Fecha de inicio
                    </label>
                    <input
                        type="date"
                        id="fecha_inicio"
                        value={fecha_inicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hora_inicio">
                        Hora de inicio
                    </label>
                    <input
                        type="time"
                        id="hora_inicio"
                        value={hora_inicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hora_fin">
                        Hora de fin
                    </label>
                    <input
                        type="time"
                        id="hora_fin"
                        value={hora_fin}
                        onChange={(e) => setHoraFin(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lugar">
                        Lugar
                    </label>
                    <input
                        type="text"
                        id="lugar"
                        value={lugar}
                        onChange={(e) => setLugar(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maximo_usuarios">
                        Máximo de usuarios
                    </label>
                    <input
                        type="number"
                        id="maximo_usuarios"
                        value={maximo_usuarios}
                        onChange={(e) => setMaximoUsuarios(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_limite">
                        Fecha límite
                    </label>
                    <input
                        type="date"
                        id="fecha_limite"
                        value={fecha_limite}
                        onChange={(e) => setFechaLimite(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
                        Estado
                    </label>
                    <input
                        type="text"
                        id="estado"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    Actualizar evento
                </button>
            </form>
        </div>
    )
};

export default UpdateEvent;