import { useState } from "react";
import { postSport } from "../api/sports";
import Footer from '../components/Footer';


const CreateSport = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        informacion: '',
        categoria: '',
        equipamiento: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageFile) {
            alert('Por favor, selecciona una imagen');
            return;
        }

        const form = new FormData();
        form.append('nombre', formData.nombre);
        form.append('descripcion', formData.descripcion);
        form.append('informacion', formData.informacion);
        form.append('categoria', formData.categoria);
        form.append('equipamiento', formData.equipamiento);
        form.append('imagen', imageFile as Blob);
        try {
            await postSport(form);
            alert('Deporte creado con éxito');
        } catch (error) {
            console.error('Error al crear el deporte:', error);
            alert('Hubo un error al crear el deporte');
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen overflow-y-auto">
                <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h1 className="text-2xl font-bold mb-2">Creación del deporte</h1>
                    <hr></hr><br></br>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del deporte:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Deporte de ejemplo"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción:</label>
                            <textarea
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                placeholder="Descripción de ejemplo"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Información:</label>
                            <textarea
                                name="informacion"
                                value={formData.informacion}
                                onChange={handleChange}
                                placeholder="Información del ejemplo"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoria:</label>
                            <input
                                type="text"
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                                placeholder="Individual, colectivo, parejas..."
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Equipamiento:</label>
                            <input
                                type="text"
                                name="equipamiento"
                                value={formData.equipamiento}
                                onChange={handleChange}
                                placeholder="Equipamiento necesario"
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
                            Crear deporte
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default CreateSport;
