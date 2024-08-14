import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import Users from './components/common/UsersList';
import Sports from './components/common/SportsList';
import Events from './components/common/EventsList';
import UserEvents from './components/common/UserEventsList';
import Ratings from './components/common/RatingList';
import Rankings from './components/common/RankingList';
import Login from './components/layout/Login';
import Register from './components/layout/Register';
import './css/index.css'

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/events" element={<Events />} />
          <Route path="/user_events" element={<UserEvents />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
