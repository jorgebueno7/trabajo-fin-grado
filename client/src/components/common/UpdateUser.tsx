import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
                // Redirigir al usuario a la página de detalles del usuario o alguna otra página después de actualizar
            } catch (error) {
                console.error("Error al actualizar el usuario:", error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Actualizar Usuario</h1>
            <label>
                DNI:
                <input
                    type="text"
                    value={user?.dni || ''}
                    onChange={(e) => setUser({ ...user!, dni: e.target.value })}
                />
            </label>
            <br />
            <label>
                Nombre:
                <input
                    type="text"
                    value={user?.nombre || ''}
                    onChange={(e) => setUser({ ...user!, nombre: e.target.value })}
                />
            </label>
            <br />
            <label>
                Apellidos:
                <input
                    type="text"
                    value={user?.apellidos || ''}
                    onChange={(e) => setUser({ ...user!, apellidos: e.target.value })}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    value={user?.email || ''}
                    onChange={(e) => setUser({ ...user!, email: e.target.value })}
                />
            </label>
            <br />
            <label>
                Teléfono:
                <input
                    type="text"
                    value={user?.telefono || ''}
                    onChange={(e) => setUser({ ...user!, telefono: e.target.value })}
                />
            </label>
            <br />
            <label>
                Dirección:
                <input
                    type="text"
                    value={user?.direccion || ''}
                    onChange={(e) => setUser({ ...user!, direccion: e.target.value })}
                />
            </label>
            <br />
            <label>
                Altura (cm):
                <input
                    type="text"
                    value={user?.altura || ''}
                    onChange={(e) => setUser({ ...user!, altura: e.target.value })}
                />
            </label>
            <br />
            <label>
                Peso (kg):
                <input
                    type="text"
                    value={user?.peso || ''}
                    onChange={(e) => setUser({ ...user!, peso: e.target.value })}
                />
            </label>
            <br />
            <label>
                Deporte:
                <input
                    type="text"
                    value={user?.deporte || ''}
                    onChange={(e) => setUser({ ...user!, deporte: e.target.value })}
                />
            </label>
            <br />
            <label>
                Mejor Marca:
                <input
                    type="text"
                    value={user?.mejor_marca || ''}
                    onChange={(e) => setUser({ ...user!, mejor_marca: e.target.value })}
                />
            </label>
            <br />
            <button type="submit">Actualizar Usuario</button>
        </form>
    );
};

export default UpdateSport;
