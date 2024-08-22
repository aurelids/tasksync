import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Login  from './pages/Login';
import  Register  from './pages/Register';
import  ForgotPassword from './pages/ForgotPassword';
import Dashboard  from './pages/Dashboard';
import Users from './pages/Users';
import About from './pages/About';
import Contact from './pages/Contact';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/contato" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;