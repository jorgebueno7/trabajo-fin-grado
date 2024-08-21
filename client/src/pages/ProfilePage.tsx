import { useContext } from 'react';
import UserContext from '../context/UsersContext';

const ProfilePage = () => {   
    const { user } = useContext(UserContext);     
    return (
        <div>
            <h1>{user?.email}</h1>
            <h2>{user?.nombre}</h2>
        </div>
    );
};

export default ProfilePage;