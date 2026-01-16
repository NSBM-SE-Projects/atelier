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
import ItemPage from './pages/ItemPage';
import Store from './pages/Store';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import Accessories from './pages/Accessories';
import Gifts from './pages/Gifts';
import AboutUs from './pages/AboutUs';
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
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />
        {/* Profile Page (Protected) */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        {/* Shop/Store Page */}
        <Route path="/shop" element={<Store />} />
        {/* Test/Health Check Page */}
        <Route path="/test" element={<Test />} />
        {/* Contact Page */}
        <Route path="/contact" element={<Contact />} />
        {/* Item Page */}
        <Route path="/item/:id" element={<ItemPage />} />
        {/* Cart Page */}
        <Route path="/cart" element={<Cart />} />
        {/* Checkout Page (Protected) */}
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        {/* Order Confirmation Page (Protected) */}
        <Route path="/order-confirmation/:orderNumber" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
        {/* Men's Page */}
        <Route path="/men" element={<Men />} />
        {/* Women's Page */}
        <Route path="/women" element={<Women />} />
        {/* Kids Page */}
        <Route path="/kids" element={<Kids />} />
        {/* Accessories Page */}
        <Route path="/accessories" element={<Accessories />} />
        {/* Gifts Page */}
        <Route path="/gifts" element={<Gifts />} />
        {/* About Us Page */}
        <Route path="/about" element={<AboutUs />} />
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
