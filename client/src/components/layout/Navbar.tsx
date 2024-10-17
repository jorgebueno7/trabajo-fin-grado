import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../context/UsersContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


const Navbar = () => {
  const { isLoggedIn, setLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
    };

  const handleLogOut = async () => {
    try {
      await axios.post(import.meta.env.VITE_API_URL + '/logout', {}, { withCredentials: true });
      setLoggedIn(false);
      navigateHome();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="flex justify-between items-center mt-4 px-4">
      <div className="flex justify-start w-full">
        <NavLink to="/" className="font-bold text-xl ml-5 text-slate-700 rounded-lg hover:text-slate-900">Sportly</NavLink>
      </div>
      <div className="flex justify-center w-full space-x-4">
        <NavLink to="/sports" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Deportes</NavLink>
        <NavLink to="/events" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Eventos</NavLink>
        {isLoggedIn ? (
          <NavLink to="/user-calendar" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Calendario</NavLink>
        ) : (
          <NavLink to="/calendar" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Calendario</NavLink>
        )}
        <NavLink to="/rankings" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Ranking</NavLink>
        <NavLink to="/news" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Noticias</NavLink>
      </div>
      <div className="flex justify-end w-full space-x-4">
        {isLoggedIn ? (
          <>
            <NavLink to="/perfil" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Mi Perfil</NavLink>
            <button onClick={handleLogOut} className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Cerrar sesión</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Iniciar sesión</NavLink>
            <NavLink to="/register" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Registrarse</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
