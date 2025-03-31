import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSportsById, updateSport } from '../../api/sports';
const UpdateSport = () => {
    const { id_deporte } = useParams();
    
    const [nombre, setNombre] = useState<string>('');
    const [informacion, setInformacion] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [categoria, setCategoria] = useState<string>('');
    const [equipamiento, setEquipamiento] = useState<string>('');

    const navigate = useNavigate();

    const fetchSport = async () => {
        try {
            if (id_deporte) {
                const sport = await getSportsById(Number(id_deporte));
                if (sport) {
                    setNombre(sport.nombre);
                    setDescripcion(sport.descripcion);
                    setInformacion(sport.informacion);
                    setCategoria(sport.categoria);
                    setEquipamiento(sport.equipamiento);
                }
            }
        } catch (error) {
            console.error('Error al obtener el deporte:', error);
            alert('No se pudo cargar el deporte.');
        }
    }

    useEffect(() => {
        fetchSport();
    }, [id_deporte]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre || !descripcion || !informacion || !categoria || !equipamiento) {
            alert('Por favor, rellena todos los campos.');
            return;
        }
        try {
            if (id_deporte) {
                const sportData = { nombre, informacion, descripcion, categoria, equipamiento };
                console.log('datos que se envian', sportData);
                await updateSport(Number(id_deporte), sportData);
                alert('¡Deporte actualizado exitosamente!');
                navigate(`/sports/${id_deporte}`);
            }
        } catch (error) {
            console.error('Error al actualizar el deporte:', error);
            alert('Ocurrió un error al actualizar el deporte. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow"
            >
                <h1 className="text-2xl font-bold mb-4 text-center">Actualizar deporte</h1>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Nombre:
                    </label>
                    <input
                        type="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Nombre del deporte" />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Descripción:
                    </label>
                    <input
                        type="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Información del deporte" />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Información:
                    </label>
                    <textarea
                        id="informacion"
                        value={informacion}
                        onChange={(e) => setInformacion(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        rows={4}
                        placeholder="Información del deporte"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-700">
                        Categoria:
                    </label>
                    <input
                        type="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Escribe una categoría del deporte"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Equipamiento:
                    </label>
                    <input
                        type="equipamiento"
                        value={equipamiento}
                        onChange={(e) => setEquipamiento(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Equipamiento necesario" />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    Actualizar deporte
                </button>
            </form>
        </div>
    )
};

export default UpdateSport;