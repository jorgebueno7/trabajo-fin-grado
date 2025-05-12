// import { useState, useEffect } from 'react';
// import { postNews } from '../../api/news';
// import { getEvents } from '../../api/events';

// interface Event {
//     id_evento: number;
//     nombre: string;
// }

// const CreateNews = () => {
//     const [titulo, setTitulo] = useState('');
//     const [subtitulo, setSubtitulo] = useState('');
//     const [imagen, setImagen] = useState<File | null>(null);
//     const [fecha, setFecha] = useState('');
//     const [idEvento, setIdEvento] = useState<number | ''>('');
//     const [eventos, setEventos] = useState<Event[]>([]);

//     const fetchEvents = async () => {
//         try {
//             const response = await getEvents();
//             setEventos(response);
//         } catch (error) {
//             console.error('Error fetching events:', error);
//         }
//     };

//     useEffect(() => {
//         fetchEvents();
//     }, []);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('titulo', titulo);
//         formData.append('subtitulo', subtitulo);
//         formData.append('imagen', imagen as Blob);
//         formData.append('id_evento', idEvento as string);
//         formData.append('fecha', fecha);

//         try {
//             await postNews(formData);
//             alert('Noticia creada con éxito');
//             setTitulo('');
//             setSubtitulo('');
//             setImagen(null);
//             setFecha('');
//             setIdEvento('')
//         } catch (error) {
//             console.error('Error creating news:', error);
//             alert('Error al crear la noticia');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
//       <h2 className="text-xl font-bold">Publicar Noticia</h2>

//       <div>
//         <label className="block font-medium">Título</label>
//         <input
//           type="text"
//           value={titulo}
//           onChange={(e) => setTitulo(e.target.value)}
//           className="w-full border border-gray-300 rounded px-3 py-2"
//           required
//         />
//       </div>

//       <div>
//         <label className="block font-medium">Subtítulo</label>
//         <textarea
//           value={subtitulo}
//           onChange={(e) => setSubtitulo(e.target.value)}
//           className="w-full border border-gray-300 rounded px-3 py-2"
//         />
//       </div>

//       <div>
//         <label className="block font-medium">Portada (imagen)</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImagen(e.target.files?.[0] || null)}
//         />
//       </div>

//       <div>
//         <label className="block font-medium">Evento relacionado</label>
//         <select
//           value={idEvento}
//           onChange={(e) => setIdEvento(Number(e.target.value))}
//           className="w-full border border-gray-300 rounded px-3 py-2"
//         >
//           <option value="">-- Selecciona un evento --</option>
//           {eventos.map((evento) => (
//             <option key={evento.id_evento} value={evento.id_evento}>
//               {evento.nombre}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button type="submit" className="w-full">Publicar</button>
//     </form>
//     );
// }

// export default CreateNews;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { postNews } from '../../api/news';
import { getEventsById } from '../../api/events';

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
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-bold">Publicar Noticia</h2>

            <div>
                <label className="block font-medium">Evento</label>
                <input
                    type="text"
                    value={nombreEvento}
                    disabled
                    readOnly
                    className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block font-medium">Título</label>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                />
            </div>

            <div>
                <label className="block font-medium">Subtítulo</label>
                <textarea
                    value={subtitulo}
                    onChange={(e) => setSubtitulo(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </div>

            <div>
                <label className="block font-medium">Portada (imagen)</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImagen(e.target.files?.[0] || null)}
                />
            </div>

            <div>
                <label className="block font-medium">Fecha</label>
                <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </div>

            <button type="submit" className="w-full">Publicar</button>
        </form>
    );
};

export default CreateNewsFromEvent;
