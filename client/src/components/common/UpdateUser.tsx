import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById, updateUserById } from '../../api/users';

const UpdateSport = () => {
    interface User {
        id: number;
        dni: string;
        nombre: string;
        apellidos: string;
        email: string;
        role: string;
        fecha_nacimiento: string;
        telefono: number;
        direccion: string;
        altura: string;
        peso: string;
        deporte: string;
        mejor_marca: string;
    }

    const { id } = useParams(); // Extrae el ID de la URL
    const [user, setUser] = useState<User | null>(null); // Estado con tipo User o null
    const [currentPage, setCurrentPage] = useState(1);
    const [formError, setFormError] = useState('');

    const navigate = useNavigate();

    const fetchUserData = async () => {
        const idUsuario = Number(id); // Castear el id que llega por la URL
        try {
            const response = await getUserById(idUsuario);
            if (response.error) {
                console.error("Error en la respuesta del servidor:", response.error);
                return;
            }
            setUser(response);
        } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            try {
                const updatedUser = {
                    ...user,
                    telefono: Number(user.telefono), // Convertir a número
                    altura: Number(user.altura), // Convertir a número
                    peso: Number(user.peso), // Convertir a número
                };
                const response = await updateUserById(user.id, updatedUser); // Actualizar el usuario
                console.log(response);
                navigate('/perfil');
            } catch (error) {
                console.error("Error al actualizar el usuario:", error);
            }
        }
    };

    const handleNext = () => {
        if (currentPage === 1) {
            if (!user?.dni || !user?.nombre || !user?.apellidos || !user?.email || !user?.fecha_nacimiento || !user?.role) {
                setFormError('Por favor completa todos los campos obligatorios.');
                return;
            }
            setFormError('');
            setCurrentPage(2);
        }
    };

    const handlePrevious = () => {
        setCurrentPage(1);
    };

    return (
        <div className="flex items-center justify-center min-h-screen overflow-y-auto">
            <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow md:p-6 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-1 max-w-sm mx-auto" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                        Modificar perfil
                    </h5>
                    {formError && <p className="text-red-600 text-sm mt-2">{formError}</p>}
                    {currentPage === 1 && (
                        <>
                            <div className="relative max-w-sm">
                            <label htmlFor="nombre" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                DNI
                            </label>
                            <input
                                type="text"
                                value={user?.dni || ''}
                                onChange={(e) => setUser({ ...user!, dni: e.target.value })}
                                className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                            />
                            </div>
                            <div className="relative max-w-sm">
                                <label htmlFor="nombre" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    value={user?.nombre || ''}
                                    onChange={(e) => setUser({ ...user!, nombre: e.target.value })}
                                    className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="apellidos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Apellidos
                                </label>
                                <input
                                    type="text"
                                    value={user?.apellidos || ''}
                                    onChange={(e) => setUser({ ...user!, apellidos: e.target.value })}
                                    className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    onChange={(e) => setUser({ ...user!, email: e.target.value })}
                                    className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="fecha_nacimiento" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Fecha de nacimiento
                                </label>
                                <input
                                    type="date"
                                    value={user?.fecha_nacimiento || ''}
                                    onChange={(e) => setUser({ ...user!, fecha_nacimiento: e.target.value })}
                                    className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="role" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Role
                                </label>
                                <input
                                    type="text"
                                    value={user?.role || ''}
                                    onChange={(e) => setUser({ ...user!, role: e.target.value })}
                                    className="bg-gray-50 mb-4 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                                />
                            </div>
                            <button 
                                type="button" 
                                onClick={handleNext} 
                                className="w-full text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                            >
                                <span>Continuar</span>
                            </button>
                        </>
                    )}
                    {currentPage === 2 && (
                        <>
                            <div className="mb-5">
                                <label htmlFor="telefono" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Teléfono
                                </label>
                                <input
                                    type="text"
                                    value={user?.telefono || ''}
                                    onChange={(e) => setUser({ ...user!, telefono: Number(e.target.value) })}
                                    className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="direccion" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Dirección
                                </label>
                                <input
                                    type="text"
                                    value={user?.direccion || ''}
                                    onChange={(e) => setUser({ ...user!, direccion: e.target.value })}
                                    className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="altura" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Altura (cm)
                                </label>
                                <input
                                    type="text"
                                    value={user?.altura || ''}
                                    onChange={(e) => setUser({ ...user!, altura: e.target.value })}
                                    className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="peso" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Peso (kg)
                                </label>
                                <input
                                    type="text"
                                    value={user?.peso || ''}
                                    onChange={(e) => setUser({ ...user!, peso: e.target.value })}
                                    className="bg-gray-50 mb-4 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="deporte" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Deporte
                                </label>
                                <input
                                    type="text"
                                    value={user?.deporte || ''}
                                    onChange={(e) => setUser({ ...user!, deporte: e.target.value })}
                                    className="bg-gray-50 mb-4 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="mejor_marca" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Mejor marca
                                </label>
                                <input
                                    type="text"
                                    value={user?.mejor_marca || ''}
                                    onChange={(e) => setUser({ ...user!, mejor_marca: e.target.value })}
                                    className="bg-gray-50 mb-4 border text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 dark:bg-gray-600"
                                />
                            </div>
                            <button 
                                type="button" 
                                onClick={handlePrevious} 
                                className="w-full text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                            >
                                <span>Retroceder</span>

                            </button>
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600">
                                Modificar usuario
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UpdateSport;
