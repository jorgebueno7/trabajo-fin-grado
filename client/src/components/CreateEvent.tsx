import { useState, useEffect } from "react";
import { postEvent } from "../api/events";
import { getSports } from "../api/sports";
import Footer from '../components/Footer';

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
    const [imageFile, setImageFile] = useState<File | null>(null);

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
        if (!imageFile) {
            alert('Por favor, selecciona una imagen');
            return;
        }
    
        const form = new FormData();
        form.append('id_deporte', formData.id_deporte);
        form.append('nombre', formData.nombre);
        form.append('fecha_ini', formData.fecha_ini);
        form.append('fecha_fin', formData.fecha_fin);
        form.append('fecha_limite', formData.fecha_limite);
        form.append('lugar', formData.lugar);
        form.append('hora_ini', formData.hora_ini);
        form.append('maximo_usuarios', formData.maximo_usuarios);
        form.append('imagen', imageFile as Blob); // <-- Aquí va la imagen
    
        try {
            await postEvent(form); // Asegúrate de que `postEvent` acepte `FormData`
            alert('Evento creado con éxito');
        } catch (error) {
            console.error('Error al crear el evento:', error);
            alert('Hubo un error al crear el evento');
        }

        // Lo de antes
        // try {
        //     await postEvent(formData);
        //     alert('Evento creado con éxito');
        // } catch (error) {
        //     console.error('Error al crear el evento:', error);
        //     alert('Hubo un error al crear el evento');
        // }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen overflow-y-auto">
                <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h1 className="text-2xl font-bold mb-2">Creación de evento</h1>
                    <hr></hr><br></br>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deporte:</label>
                            <select
                                name="id_deporte"
                                value={formData.id_deporte}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del evento:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de inicio:</label>
                            <input
                                type="datetime-local"
                                name="fecha_ini"
                                value={formData.fecha_ini}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de fin:</label>
                            <input
                                type="datetime-local"
                                name="fecha_fin"
                                value={formData.fecha_fin}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha límite de inscripción:</label>
                            <input
                                type="datetime-local"
                                name="fecha_limite"
                                value={formData.fecha_limite}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lugar:</label>
                            <input
                                type="text"
                                name="lugar"
                                value={formData.lugar}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hora de inicio:</label>
                            <input
                                type="time"
                                name="hora_ini"
                                value={formData.hora_ini}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Máximo de usuarios:</label>
                            <input
                                type="number"
                                name="maximo_usuarios"
                                value={formData.maximo_usuarios}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen del evento:</label>
                            <input
                                type="file"
                                name="imagen"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
            </div>
            <Footer />
        </>
        
    );
}

export default CreateEvent;