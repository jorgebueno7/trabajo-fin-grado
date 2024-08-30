import UserContext from '../../context/UsersContext';
import { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import logoImage from '../../assets/images/logo2.webp'

const Navbar = () => {
  const { isLoggedIn, user } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const { setLoggedIn, setUser } = useContext(UserContext);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  // const navigate = useNavigate();
  // const navigateHome = () => {
  //   navigate('/');
  // };
  const handleLogOut = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
        // setUser(null);
        // setLoggedIn(false); 
        // localStorage.removeItem('isLoggedIn');
        // localStorage.removeItem('user');
        localStorage.clear();
        // localStorage.clear();
        // localStorage.setItem('user', 'null');
    } catch (error) {
        console.error(error);
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
            { isLoggedIn ?
              (<NavLink to="/user-calendar" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Calendario</NavLink>) 
              : (<NavLink to="/calendar" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Calendario</NavLink>
              )
            }
            <NavLink to="/rankings" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Ranking</NavLink>
            <NavLink to="/news" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Noticias</NavLink>
        </div>
        <div className="flex justify-end w-full space-x-4">
          {isLoggedIn ? (
            <div className="relative">
              {/* <img src={logoImage} alt="User Avatar" className="w-8 h-8 rounded-full cursor-pointer" onClick={toggleDropdown} />
              {dropdownOpen && (
                <div id="userDropdown" className="z-10 bg-gray-50 divide-y divide-gray-200 rounded-lg shadow w-60 dark:bg-gray-700 dark:divide-gray-600 absolute -left-52 mt-2">
                  <div className="px-3 py-2 text-sm text-gray-900 dark:text-white">
                    <div>{user?.nombre}</div>
                    <div className="font-medium truncate">{user?.email}</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                    <li>
                      <a 
                        href="/perfil" 
                        className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mi Perfil</a>
                    </li>
                    <li>
                      <NavLink 
                        to="/my-events" 
                        className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mis eventos</NavLink>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="/"
                      onChange={handleLogOut}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Cerrar sesión</a>
                  </div>  
                </div>
              )} */}
              <NavLink to="/perfil" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Perfil</NavLink>
            </div>
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
