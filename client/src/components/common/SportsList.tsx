import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSports } from '../../api/sports';

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

    return (
        <>
            {/* <div>
                <h1>Deportes</h1>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nombre</th>
                            <th scope="col" className="px-6 py-3">Descripción</th>
                            <th scope="col" className="px-6 py-3">Información</th>
                            <th scope="col" className="px-6 py-3">Categoria</th>
                            <th scope="col" className="px-6 py-3">Equipamiento</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sports.map((sport) => (
                            <tr key={sport.id_deporte} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{sport.nombre}</th>
                                <td className="px-6 py-4">{sport.descripcion}</td>
                                <td className="px-6 py-4">{sport.informacion}</td>
                                <td className="px-6 py-4">{sport.categoria}</td>
                                <td className="px-6 py-4">{sport.equipamiento}</td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
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