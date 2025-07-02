import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getNewById, putNews } from '../api/news';
import { getEvents } from '../api/events';
import Footer from '../components/Footer';

const UpdateNew = () => {
    interface Event {
        id_evento: number;
        nombre: string;
    }

    const { id_noticia } = useParams<{ id_noticia: string }>();
    
    const [titulo, setTitulo] = useState<string>('');
    const [subtitulo, setSubtitulo] = useState<string>('');
    const [imagen, setImagen] = useState<File | null>(null);
    const [idEvento, setIdEvento] = useState<number | ''>('');
    const [eventos, setEventos] = useState<Event[]>([]);

    const fetchNew = async () => {
        try {
            if (id_noticia) {
                const news = await getNewById(Number(id_noticia));
                if (news) {
                    setTitulo(news.titulo);
                    setSubtitulo(news.subtitulo);
                    setImagen(news.imagen);
                    setIdEvento(news.id_evento);
                }
            }
        } catch (error) {
            console.error('Error al obtener la noticia:', error);
            alert('No se pudo cargar la noticia.');
        }
    }

    const fetchEvents = async () => {
        try {
            const response = await getEvents();
            setEventos(response);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchNew();
        fetchEvents();
    }, [id_noticia]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!titulo || !subtitulo || !imagen || !idEvento) {
            alert('Por favor, rellena todos los campos.');
            return;
        }
        try {
            if (id_noticia) {
                const formData = new FormData();
                formData.append('titulo', titulo);
                formData.append('subtitulo', subtitulo);
                formData.append('id_evento', idEvento.toString());
                formData.append('imagen', imagen);
                await putNews(Number(id_noticia), formData);
                alert('¡Noticia actualizada exitosamente!');
            }
        } catch (error) {
            console.error('Error al actualizar la noticia:', error);
            alert('No se pudo actualizar la noticia.');
        }
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen overflow-y-auto">
                <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h1 className="text-2xl font-bold mb-2">Actualizar Noticia</h1>
                    <hr></hr><br></br>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título</label>
                            <input
                                type="text"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                                className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subtítulo</label>
                            <textarea
                                value={subtitulo}
                                onChange={(e) => setSubtitulo(e.target.value)}
                                required
                                className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImagen(e.target.files ? e.target.files[0] : null)}
                                className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Evento relacionado</label>
                            <select
                                value={idEvento}
                                onChange={(e) => setIdEvento(Number(e.target.value))}
                                required
                                disabled
                                className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="">Selecciona un evento</option>
                                {eventos.map((evento) => (
                                    <option key={evento.id_evento} value={evento.id_evento}>
                                    {evento.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                        >
                            Actualizar Noticia
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
        
    );
};                     

export default UpdateNew;
