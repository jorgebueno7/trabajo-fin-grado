import { useEffect, useState, useContext } from 'react';
import { getAllNews } from '../api/news';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import UserContext from '../context/UsersContext';

dayjs.extend(utc);

const ITEMS_PER_PAGE = 6;

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
    const [currentPage, setCurrentPage] = useState(1);

    const nextPageEvents = () => {
        if (endIndex < news.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPageEvents = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

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
        setCurrentPage(1);
    }, []);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentNews = news.slice(startIndex, endIndex);

    return (
        <div className="p-5">
            <div className="flex justify-between items-center flex-wrap mb-6">
                <h1 className="text-2xl font-bold ml-2">Últimas noticias</h1>
                {isLoggedIn && (user?.role === 'organizador' || user?.role === 'administrador') && (
                    <button
                        onClick={navigateToCreateNew}
                        className="inline-flex items-center px-3 py-2 ml-2 mt-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        Crear noticia
                    </button>
                )}
            </div>
      
            <div className="grid grid-cols-3 gap-6">
                {currentNews.map((item) => (
                    <div
                        key={item.id_noticia}
                        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-lg transition"
                    >
                        <img
                            src={`http://localhost:5000/sportly/news/${item.id_noticia}/imagen`}
                            alt={item.titulo}
                            className="w-[700px] h-[500px] object-cover"
                        />
                        <div className="p-4">
                            <h1 className="text-lg font-semibold text-gray-800">{item.titulo}</h1>
                            <h3 className="text-gray-600 text-sm">{item.subtitulo}</h3>
                            <p className="text-gray-500 text-xs mt-2">
                                Publicado el: {dayjs.utc(item.fecha_creacion).format('DD-MM-YYYY HH:mm')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4 space-x-6">
                <button
                    onClick={prevPageEvents}
                    disabled={currentPage === 1}
                    className={`mt-3 text-blue-600 hover:underline ${
                    currentPage === 1
                        ? ' cursor-not-allowed'
                        : ''
                    }`}
                >
                    Anterior
                </button>

                <span className="text-gray-700 ml-3 mr-3 mt-3">{currentPage}</span>

                <button
                    onClick={nextPageEvents}
                    disabled={endIndex >= news.length}
                    className={`mt-3 text-blue-600 hover:underline ${
                    endIndex >= news.length
                        ? 'cursor-not-allowed'
                        : ''
                    }`}
                >
                    Siguiente
                </button>
            </div>

        </div>
    );
};

export default NewsPage;