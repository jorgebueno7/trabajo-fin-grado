import { useEffect, useState } from 'react';
import { getAllNews } from '../api/news';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const NewsPage = () => {
    interface News {
        id_noticia: number;
        titulo: string;
        subtitulo: string;
        imagen: string;
        id_evento: number;
        fecha_creacion: string;
    }

    const [news, setNews] = useState<News[]>([]);

    const fetchNews = async () => {
        try {
            const response = await getAllNews();
            setNews(response);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }
    useEffect(() => {   
        fetchNews();
    }, []);
    
    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold ml-2 mb-4">Últimas noticias</h1>
                <ul>
                    {news.map((item) => (
                        <li key={item.id_noticia} className="mb-4 p-4 border rounded shadow">
                            <h2 className="text-xl font-semibold">{item.titulo}</h2>
                            <p className="text-gray-600">{item.subtitulo}</p>
                            <img src={`http://localhost:5000/sportly/news/${item.id_noticia}/imagen`} alt={item.titulo} className="mt-2 w-full h-auto"/>
                            <p className="text-gray-500 mt-2">Fecha: {dayjs.utc(item.fecha_creacion).format('DD-MM-YYYY HH:mm:ss')}</p>
                        </li>
                    ))}
                </ul>
        </div>
    );
};

export default NewsPage;