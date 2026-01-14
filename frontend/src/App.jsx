import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Test from './pages/Test';
import './App.css';

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        {/* Test/Health Check Page */}
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
