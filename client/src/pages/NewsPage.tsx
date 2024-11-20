import { useEffect, useState } from 'react';
import axios from 'axios';

const NewsPage = () => {

    interface Noticias {
        id: string;
        newsHeadline: string;
        newsDate: string;
        fullNewsDate: string;
        newsTime: string;
        newsSource: string;
        newsTeaser: string;
        newsFirstImage: string;
        newsSpotlightFirstImage: string;
        newsSecondImage: string;
        newsStartPageFlag: string;
        newsShortMessageFlag: string;
    }

    const [news, setNews] = useState<Noticias[]>([]);
    const fetchTransfers = async () => {
        const url = 'https://transfermarket.p.rapidapi.com/news/list-latest';
        const params = {
            // offset: 0,
            // competitionIds: 'IT1,GB1',
            // orderByLatestUpdate: true,
            domain: 'es',
        };

        try {
            const response = await axios.get(url, {
                params,
                headers: {
                    'X-Rapidapi-Key': 'a3fc638527msh333bbd97ad3c51bp1fbf5cjsnbb0738ac8b16',
                    'X-Rapidapi-Host': 'transfermarket.p.rapidapi.com',
                },
            });
            console.log(response.data.news);
            setNews(response.data.news);
        } catch (error) {
            console.error('Error fetching transfers:', error);
        }
    };

    useEffect(() => {   
        fetchTransfers();
    }, []);
    
    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold ml-2 mb-4">Últimas noticias</h1>
                <ul>
                    {news.map(noticia => (
                        <div key={noticia.id} className="border p-5 mb-4 ml-2 rounded-md bg-white shadow-md">
                            <h2 className="text-xl font-bold mb-2">{noticia.newsHeadline}</h2>
                            <p className="text-sm text-gray-500 mb-2">
                                <strong>Fecha:</strong> {noticia.newsDate} ({noticia.fullNewsDate})<br />
                                <strong>Hora:</strong> {noticia.newsTime}
                            </p>
                            <p className="text-sm text-gray-600 mb-4">
                                <strong>Fuente:</strong> {noticia.newsSource}
                            </p>
                            <p className="text-lg mb-4">
                                <strong>Resumen:</strong> {noticia.newsTeaser}
                            </p>
                            {noticia.newsSpotlightFirstImage ? (
                                <img
                                src={noticia.newsSpotlightFirstImage}
                                alt="Imagen Secundaria"
                                className="w-full rounded mb-4"
                                />
                            ) : noticia.newsFirstImage ? (
                                <img
                                src={noticia.newsFirstImage}
                                alt="Imagen Principal"
                                className="w-1/4 rounded mb-4"
                                />
                            ) : null}

                            {noticia.newsSecondImage && (
                                <img
                                src={noticia.newsSecondImage}
                                alt="Imagen del Club"
                                className="w-20 h-20 rounded-md mb-4"
                                />
                            )}
                    </div>
                    ))}
                </ul>
        </div>
    );
};

export default NewsPage;