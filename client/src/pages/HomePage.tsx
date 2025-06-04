import Carrousel from '../components/layout/Carrousel';
import Footer from '../components/layout/Footer';
import { getAllNews } from '../api/news';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const ITEMS_PER_PAGE = 6;


const HomePage = () => {
  interface News {
    id_noticia: number;
    id_evento: number;
    titulo: string;
    subtitulo: string;
    imagen: string;
    fecha_creacion: string;
  }
  
  const [news, setNews] = useState<News[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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
    <>
      <Carrousel />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Te damos la bienvenida a Sportly</h1>
        <p className="text-lg mb-4">
          Un lugar donde disfrutar de tus deportes favoritos, encontrar compañeros de juego y mejorar tus habilidades.
        </p>
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
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
