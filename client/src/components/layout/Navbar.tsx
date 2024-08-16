import UserContext from '../../context/UsersContext';
import React, { useContext } from 'react';
const Navbar = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <nav className="flex justify-between items-center mt-4 px-4">
        <div className="flex justify-start w-full">
            <a href="/" className="font-bold text-xl ml-5 text-slate-700 rounded-lg hover:text-slate-900">Sportly</a>
        </div>
        <div className="flex justify-center w-full space-x-4">
            <a href="/" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Home</a>
            <a href="/sports" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Deportes</a>
            <a href="/events" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Eventos</a>
            <a href="/calendar" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Calendario</a>
            <a href="/rankings" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Ranking</a>
            <a href="/news" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Noticias</a>
        </div>
        <div className="flex justify-end w-full space-x-4">
          {isLoggedIn ? (
            <a href="/perfil" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Perfil</a>
          ) : (
            <>
              <a href="/login" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Iniciar sesión</a>
              <a href="/register" className="font-bold px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900">Registrarse</a>
            </>
          )}
        </div>
    </nav>
  );
};

export default Navbar;
