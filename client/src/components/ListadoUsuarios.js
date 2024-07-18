import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/sportly/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Altura</th>
                        <th>Peso</th>
                        <th>Deporte</th>
                        <th>Mejor Marca</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.nombre}</td>
                            <td>{user.apellidos}</td>
                            <td>{user.email}</td>
                            <td>{user.fecha_nacimiento}</td>
                            <td>{user.telefono}</td>
                            <td>{user.direccion}</td>
                            <td>{user.altura}</td>
                            <td>{user.peso}</td>
                            <td>{user.deporte}</td>
                            <td>{user.mejor_marca}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
