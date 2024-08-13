import ciclismoImage from '../../assets/images/ciclismo2.jpg';
import futbolImage from '../../assets/images/olimpiadas.webp';
import tenisMesaImage from '../../assets/images/tenismesa.jpg';
import basketImage from '../../assets/images/basket.jpg';
import natacionImage from '../../assets/images/natacion.jpg';

const Carrousel = () => {
    return (
    <div id="gallery" className="relative w-full mt-6" data-carousel="slide">
        <div className="relative h-72 overflow-hidden rounded-sm md:h-[600px]">
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img
                src={ciclismoImage}
                className="absolute w-full h-full object-cover top-0 left-0"
                alt="Ciclismo"
                />
            </div>
            <div className="hidden duration-700 ease-in-out" data-carousel-item="active">
                <img
                src={futbolImage}
                className="absolute w-full h-full object-cover top-0 left-0"
                alt="Futbol"
                />
            </div>
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img
                src={tenisMesaImage}
                className="absolute w-full h-full object-cover top-0 left-0"
                alt="TenisMesa"
                />
            </div>
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img
                src={basketImage}
                className="absolute w-full h-full object-cover top-0 left-0"
                alt="Basket"
                />
            </div>
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img
                src={natacionImage}
                className="absolute w-full h-full object-cover top-0 left-0"
                alt="Natacion"
                />
            </div>
        </div>
        <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
            >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-400/50 group-focus:outline-none">
                <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
                >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                    />
                </svg>
                <span className="sr-only">Previous</span>
            </span>
        </button>
        <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
            >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-400/50 group-focus:outline-none">
                <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
                >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                />
                </svg>
                <span className="sr-only">Next</span>
            </span>
        </button>
    </div>
    );
}

export default Carrousel;