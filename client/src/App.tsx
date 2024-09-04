import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserContext, { User } from './context/UsersContext';
import HomePage from './pages/HomePage';
import PerfilPage from './pages/ProfilePage';
import ConfirmLoginPage from './pages/ConfirmLoginPage';
import Navbar from './components/layout/Navbar';
import Users from './components/common/UsersList';
import Sports from './components/common/SportsList';
import Events from './components/common/EventsList';
import UserEvents from './components/common/UserEventsList';
import Ratings from './components/common/RatingList';
import Rankings from './components/common/RankingList';
import Login from './components/layout/Login';
import Register from './components/layout/Register';
import SportDetail from './components/common/SportsDetail';
import EventDetail from './components/common/EventsDetail';
import UserCalendar from './components/layout/UserCalendar';
import GlobalCalendar from './components/layout/GlobalCalendar';
import PerfilForm from './components/layout/PerfilForm';
import './css/index.css'

function App() {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [user, setUser] = useState<User | null>(null);
  const [isProfileComplete, setProfileComplete] = useState(false);
  
  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <UserContext.Provider value={{ isLoggedIn, setLoggedIn, user, setUser, isProfileComplete, setProfileComplete }}>
      <Router>
        <div className="flex flex-col h-screen">
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/sports/:id" element={<SportDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/user_events" element={<UserEvents />} />
            <Route path="/ratings" element={<Ratings />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/confirm_login" element={<ConfirmLoginPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/user-calendar" element={<UserCalendar />} />   
            <Route path="/calendar" element={<GlobalCalendar />} />
            <Route path="/perfil-form" element={<PerfilForm />} />       
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  )
}

export default App
