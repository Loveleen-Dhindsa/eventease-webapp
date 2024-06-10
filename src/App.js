import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from './routes/auth/Signup';
import Login from './routes/auth/Login';
import EventList from './routes/EventList';
import EventProfile from './routes/EventProfile';
import UserProfile from './routes/UserProfile';
import Dashboard from './routes/Dashboard';
import Home from './routes/Home';
import ContactUs from './routes/ContactUs';
import AboutUs from './routes/AboutUs';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {

  return (
    <div className="app">
      <div className="nav-section">
        <Navbar />

      </div>
      <Routes>
        {/* <Route path="/auth/login" element={<Navigate to="/auth/login" />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/event-lists" element={<EventList />} />
        <Route path="/events/:eventId" element={<EventProfile />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      <div className="footer-section">
        <Footer />
      </div>
    </div>

  );
}

export default App;
