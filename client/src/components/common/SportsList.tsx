import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSports } from '../../api/sports';
import UserContext from "../../context/UsersContext";

const Deportes = () => {
    interface Sport {
        id_deporte: number;
        nombre: string;
        descripcion: string;
        informacion: string;
        categoria: string;
        equipamiento: string;
    }

    const [sports, setSports] = useState<Sport[]>([]);
    const { user, isLoggedIn } = useContext(UserContext);

    console.log("Valor de user role", user?.role);

    const navigate = useNavigate();

    useEffect(() => {
        fetchSports();
    }, []);
    
    const fetchSports = async () => {
        try {
          const data = await getSports();
          setSports(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
    };

    const handleCreateSportClick = () => {
        navigate('/create-sport');
    };

    const rolUsuario = user?.role;

    return (
        <>
            <div className="flex mx-20 mt-6">
                <div className="flex flex-col items-start mr-6">
                    {isLoggedIn && rolUsuario !== 'participante' && rolUsuario !== 'organizador' &&
                        <button
                            type="submit"
                            onClick={handleCreateSportClick}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Crear deporte
                        </button>
                    }
                </div>
            </div>
            <div className="grid grid-cols-3 gap-x-6 mx-20">
                {sports.map((sport, index) => (
                    <Link key={sport.id_deporte} to={`/sports/${sport.id_deporte}`}>
                        <figure  className="mt-4 relative hover:filter hover:grayscale">
                            <figcaption className="absolute inset-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <strong><h1 className="text-lg">{sport.nombre}</h1></strong>
                                <strong><p className="text-gray-900">{sport.descripcion}</p></strong>                            
                                <br></br>
                                <strong><p className="block text-center">{sport.informacion}</p></strong>
                            </figcaption>
                                <img className="h-auto w-[630px] rounded-lg transition-all duration-300 cursor-pointer" 
                                    src={`https://flowbite.s3.amazonaws.com/docs/gallery/square/image-${index % 3 + 1}.jpg`} alt=""></img>
                        </figure>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Deportes;