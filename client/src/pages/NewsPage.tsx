import { useEffect, useState, useContext } from 'react';
import { getAllNews } from '../api/news';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import UserContext from '../context/UsersContext';

dayjs.extend(utc);

const NewsPage = () => {
    interface News {
        id_noticia: number;
        id_evento: number;
        titulo: string;
        subtitulo: string;
        imagen: string;
        fecha_creacion: string;
    }

    const [news, setNews] = useState<News[]>([]);
    const { isLoggedIn, user } = useContext(UserContext);
    const navigate = useNavigate();

    const navigateToCreateNew = () => {
        navigate('/create-new');
    }
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
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold ml-2">Últimas noticias</h1>
                {
                isLoggedIn && (user?.role === 'organizador' || user?.role === 'administrador') && (
                    <button
                        onClick={navigateToCreateNew}
                        className="inline-flex items-center px-3 py-2 ml-2 mt-6 mb-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        Crear noticia
                    </button>
                )
                }
            </div>

            <ul>
                {news.map((item) => (
                    <li key={item.id_noticia} className="mb-4 p-4 border rounded shadow">
                        <h2 className="text-xl font-semibold">{item.titulo}</h2>
                        <p className="text-gray-600">{item.subtitulo}</p>
                        <img
                            src={`http://localhost:5000/sportly/news/${item.id_noticia}/imagen`}
                            alt={item.titulo}
                            className="mt-2 w-full h-auto"
                        />
                        <p className="text-gray-500 mt-2">
                            Fecha: {dayjs.utc(item.fecha_creacion).format('DD-MM-YYYY HH:mm:ss')}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsPage;