import Carrousel from '../components/layout/Carrousel';
import Footer from '../components/layout/Footer';
import Noticias from '../pages/NewsPage'
import Deportes from '../components/common/SportsList';

const HomePage = () => {
  return (
    <>
      <Carrousel />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Te damos la bienvenida a Sportly</h1>
        <p className="text-lg mb-4">
          Un lugar donde disfrutar de tus deportes favoritos, encontrar compañeros de juego y mejorar tus habilidades.
        </p>
        <Noticias />
        <Deportes />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
