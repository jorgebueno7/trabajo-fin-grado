import React, { useContext } from 'react';
import UserContext from '../context/UsersContext';

const ProfilePage = () => {   
    const { user } = useContext(UserContext);     

    if (!user) {
        return <div>Cargando...</div>; // O redirige al usuario, o muestra otro contenido
    }
    
    return (
        <div>
            <h1>{user?.email}</h1>
        </div>
    );
};

export default ProfilePage;