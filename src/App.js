import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from './routes/auth/Signup';
import Login from './routes/auth/Login';


function App() {

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
    </div>

  );
}

export default App;
