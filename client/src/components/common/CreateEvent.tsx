import { useState, useEffect } from "react";
import { postEvent } from "../../api/events";
import { getSports } from "../../api/sports";

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        id_deporte: '',
        nombre: '',
        fecha_ini: '',
        fecha_fin: '',
        fecha_limite: '',
        lugar: '',
        hora_ini: '',
        maximo_usuarios: '',
    });

    interface Sport {
        id_deporte: number;
        nombre: string;
    }

    const [sports, setSports] = useState<Sport[]>([]);

    useEffect(() => {
        const fetchSports = async () => {
            try {
                const sportsData = await getSports();
                setSports(sportsData);
            } catch (error) {
                console.error('Error fetching sports:', error);
            }
        };

        fetchSports();
    }, []);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await postEvent(formData);
            alert('Evento creado con éxito');
        } catch (error) {
            console.error('Error al crear el evento:', error);
            alert('Hubo un error al crear el evento');
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Creación de evento</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Deporte:</label>
                    <select
                        name="id_deporte"
                        value={formData.id_deporte}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    >
                        <option value="">Selecciona un deporte</option>
                        {sports.map((sport) => (
                            <option key={sport.id_deporte} value={sport.id_deporte}>
                                {sport.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Nombre del evento:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Fecha de inicio:</label>
                    <input
                        type="datetime-local"
                        name="fecha_ini"
                        value={formData.fecha_ini}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Fecha de fin:</label>
                    <input
                        type="datetime-local"
                        name="fecha_fin"
                        value={formData.fecha_fin}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Fecha límite de inscripción:</label>
                    <input
                        type="datetime-local"
                        name="fecha_limite"
                        value={formData.fecha_limite}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Lugar:</label>
                    <input
                        type="text"
                        name="lugar"
                        value={formData.lugar}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Hora de inicio:</label>
                    <input
                        type="time"
                        name="hora_ini"
                        value={formData.hora_ini}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Máximo de usuarios:</label>
                    <input
                        type="number"
                        name="maximo_usuarios"
                        value={formData.maximo_usuarios}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Crear evento
                </button>
            </form>
        </div>
    );
}

export default CreateEvent;