import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { postNews } from '../api/news';
import { getEventsById } from '../api/events';

const CreateNewsFromEvent = () => {
    const { id_evento } = useParams<{ id_evento: string }>();
    const [titulo, setTitulo] = useState('');
    const [subtitulo, setSubtitulo] = useState('');
    const [imagen, setImagen] = useState<File | null>(null);
    const [fecha, setFecha] = useState('');
    const [idEvento, setIdEvento] = useState<number | ''>('');
    const [nombreEvento, setNombreEvento] = useState('');
        
    useEffect(() => {
        if (id_evento) {
            setIdEvento(Number(id_evento));
            getEventsById(Number(id_evento)).then((response) => setNombreEvento(response.nombre)).catch((console.error));
        }
    }, [id_evento]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('subtitulo', subtitulo);
        if (imagen) formData.append('imagen', imagen);
        formData.append('id_evento', idEvento.toString());
        formData.append('fecha', fecha);

        try {
            await postNews(formData);
            alert('Noticia creada con éxito');
            setTitulo('');
            setSubtitulo('');
            setImagen(null);
            setFecha('');
        } catch (error) {
            console.error('Error creating news:', error);
            alert('Error al crear la noticia');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen overflow-y-auto">
            <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-2xl font-bold mb-2">Publicar Noticia</h1>
                <hr></hr><br></br>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Evento</label>
                        <input
                            type="text"
                            value={nombreEvento}
                            disabled
                            readOnly
                            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Título de la noticia"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subtítulo</label>
                        <textarea
                            value={subtitulo}
                            onChange={(e) => setSubtitulo(e.target.value)}
                            placeholder="Este es el subtítulo de la noticia"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Portada (imagen)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImagen(e.target.files?.[0] || null)}
                        />
                    </div>

                    {/* <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha</label>
                        <input
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        />
                    </div> */}

                    <button 
                        type="submit" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Publicar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateNewsFromEvent;
