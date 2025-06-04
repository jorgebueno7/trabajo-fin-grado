import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import UserContext, { User } from './context/UsersContext';
import HomePage from './pages/HomePage';
import PerfilPage from './pages/ProfilePage';
import ConfirmLoginPage from './pages/ConfirmLoginPage';
import Navbar from './components/layout/Navbar';
import Users from './components/common/UsersList';
import Sports from './components/common/SportsList';
import Events from './components/common/EventsList';
import UpdateEvent from './components/common/UpdateEvent'
import UserEvents from './components/common/UserEventsList';
import UpdateUser from './components/common/UpdateUser';
import Ratings from './components/common/RatingList';
import Rankings from './components/common/RankingList';
import Login from './components/layout/Login';
import Register from './components/layout/Register';
import SportDetail from './components/common/SportsDetail';
import RatingDetail from './components/common/RatingDetail';
import UpdateSport from './components/common/UpdateSport';
import EventDetail from './components/common/EventsDetail';
import UserCalendar from './components/layout/UserCalendar';
import GlobalCalendar from './components/layout/GlobalCalendar';
import PerfilForm from './components/layout/PerfilForm';
import ListUserEvents from './components/common/ListUserEvents';
import CreateEvent from './components/common/CreateEvent';
import CreateSport from './components/common/CreateSport';
import RatingEvent from './components/common/RatingsEvent';
import RatingDetailFromEvents from './components/common/RatingDetailFromEvents';
import CreateRatingEvent from './components/common/CreateRatingEvent';
import EventsBySportList from './components/common/EventsBySportList';
import UpdateRatingEvent from './components/common/UpdateRatingEvent';
import UpdateRating from './components/common/UpdateRating';
import NewsPage from './pages/NewsPage';
import AddStats from './components/common/AddEventStats';
import CreateNewsFromEvent from './components/common/CreateNewsFromEvent';
import CreateNew from './components/common/CreateNews';
import UpdateNew from './components/common/UpdateNew';
import './css/index.css'

function App() {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [user, setUser] = useState<User | null>(null);
  const [profileComplete, setProfileComplete] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <UserContext.Provider value={{ isLoggedIn, setLoggedIn, user, setUser, profileComplete, setProfileComplete, isAdmin, setIsAdmin, loading, error }}>
      <Router>
        <RoutesWithNavbar />
      </Router>
    </UserContext.Provider>
  )
}

function RoutesWithNavbar() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen">
      {location.pathname !== '/confirm_login' && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/update-user/:id" element={<UpdateUser />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/sports/:id" element={<SportDetail />} />
        <Route path="/update-sport/:id_deporte" element={<UpdateSport />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/update-event/:id_evento" element={< UpdateEvent/>} />
        <Route path="/user_events" element={<UserEvents />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm_login" element={<ConfirmLoginPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/user-calendar" element={<UserCalendar />} />   
        <Route path="/calendar" element={<GlobalCalendar />} />
        <Route path="/update-profile" element={<PerfilForm />} />
        <Route path="/my-events" element={<ListUserEvents />} />
        <Route path="/create-event" element={<CreateEvent />} />  
        <Route path="/create-sport" element={<CreateSport />} /> 
        <Route path="/ratings-event" element={<RatingEvent />} />
        <Route path="/ratings/:id_rating" element={<RatingDetail />} />
        <Route path="/ratings/event/:id_evento" element={<RatingDetailFromEvents />} />
        <Route path="/create-rating/:id_evento" element={<CreateRatingEvent />} />
        <Route path="/events-by-sport/:id_deporte" element={<EventsBySportList />} />
        <Route path="/ratings/update-event/:id_rating" element={<UpdateRatingEvent />} />
        <Route path="/ratings/update/:id_rating" element={<UpdateRating />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/add-stats/:id_evento" element={<AddStats />} />
        <Route path="/create-news/:id_evento" element={<CreateNewsFromEvent />} />
        <Route path="/create-new" element={<CreateNew />} />
        <Route path="/update-new/:id_noticia" element={<UpdateNew />} />
      </Routes>
    </div>
  );
}

export default App