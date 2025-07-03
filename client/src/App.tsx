import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import UserContext, { User } from './context/UsersContext';
import HomePage from './components/HomePage';
import PerfilPage from './components/ProfilePage';
import ConfirmLoginPage from './components/ConfirmLoginPage';
import Navbar from './components/Navbar';
import Users from './components/UsersList';
import Sports from './components/SportsList';
import Events from './components/EventsList';
import UpdateEvent from './components/UpdateEvent'
import UserEvents from './components/UserEventsList';
import UpdateUser from './components/UpdateUser';
import Ratings from './components/RatingList';
import Rankings from './components/RankingList';
import Login from './components/Login';
import Register from './components/Register';
import SportDetail from './components/SportsDetail';
import RatingDetail from './components/RatingDetail';
import UpdateSport from './components/UpdateSport';
import EventDetail from './components/EventsDetail';
import UserCalendar from './components/UserCalendar';
import GlobalCalendar from './components/GlobalCalendar';
import PerfilForm from './components/PerfilForm';
import ListUserEvents from './components/ListUserEvents';
import CreateEvent from './components/CreateEvent';
import CreateSport from './components/CreateSport';
import RatingEvent from './components/RatingsEvent';
import RatingDetailFromEvents from './components/RatingDetailFromEvents';
import CreateRatingEvent from './components/CreateRatingEvent';
import EventsBySportList from './components/EventsBySportList';
import UpdateRatingEvent from './components/UpdateRatingEvent';
import UpdateRating from './components/UpdateRating';
import NewsPage from './components/NewsPage';
import AddStats from './components/AddEventStats';
import CreateNewsFromEvent from './components/CreateNewsFromEvent';
import CreateNew from './components/CreateNews';
import UpdateNew from './components/UpdateNew';
import UpdateRanking from './components/UpdateRanking';
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
        <Route path="/update-ranking/:id_ranking" element={<UpdateRanking />} />
      </Routes>
    </div>
  );
}

export default App