import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Test from './pages/Test';
import useAuthStore from './store/authStore';
import './App.css';

function AppContent() {
  const location = useLocation();
  const hideLayoutRoutes = [];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        {/* Contact Page */}
        <Route path="/contact" element={<Contact />} />
        {/* Test/Health Check Page */}
        <Route path="/test" element={<Test />} />
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />
        {/* Profile Page (Protected) */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  useEffect(() => {
    // Restore auth state from localStorage on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        useAuthStore.getState().setUser(userData);
      } catch (error) {
        console.error('Failed to restore auth state:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
