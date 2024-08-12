import React, { useEffect, useState } from 'react';
import { getUsers, addUser } from '../../api/users';

const Usuarios = () => {
    interface User {
        id: number;
        dni: string;
        nombre: string;
        apellidos: string;
        email: string;
        role: string;
    }
      
    const [users, setUsers] = useState<User[]>([]);
    // const [form, setForm] = useState({ dni: '', nombre: '', apellidos: '', email: '', password: '', role: '' });

    useEffect(() => {
        fetchUsers();
    }, []);
    
    const fetchUsers = async () => {
        try {
          const data = await getUsers();
          setUsers(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
    };
    
    return (
        <div>
            <h1>Usuarios</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">DNI</th>
                            <th scope="col" className="px-6 py-3">Nombre</th>
                            <th scope="col" className="px-6 py-3">Apellidos</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Fecha Nacimiento</th>
                            <th scope="col" className="px-6 py-3">Telefono</th>
                            <th scope="col" className="px-6 py-3">Dirección</th>
                            <th scope="col" className="px-6 py-3">Altura</th>
                            <th scope="col" className="px-6 py-3">Peso</th>
                            <th scope="col" className="px-6 py-3">Deporte</th>
                            <th scope="col" className="px-6 py-3">Mejor marca</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.dni}</th>
                                <td className="px-6 py-4">{user.nombre}</td>
                                <td className="px-6 py-4">{user.apellidos}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.fecha_nacimiento}</td>
                                <td className="px-6 py-4">{user.telefono}</td>
                                <td className="px-6 py-4">{user.direccion}</td>
                                <td className="px-6 py-4">{user.altura}</td>
                                <td className="px-6 py-4">{user.peso}</td>
                                <td className="px-6 py-4">{user.deporte}</td>
                                <td className="px-6 py-4">{user.mejor_marca}</td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    );
};

export default Usuarios;