import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Test from './pages/Test';
import GiftVoucher from './pages/GiftVoucher';
import ItemPage from './pages/ItemPage';
import Store from './pages/Store';
import './App.css';

function AppContent() {
  const location = useLocation();
  const hideLayoutRoutes = ['/contact', '/gift-voucher', '/login', '/cart'];
  const hideLayout = hideLayoutRoutes.includes(location.pathname) || location.pathname.startsWith('/item');

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
        {/* Gift Voucher Page */}
        <Route path="/gift-voucher" element={<GiftVoucher />} />
        {/* Shop/Store Page */}
        <Route path="/shop" element={<Store />} />
        {/* Item Page */}
        <Route path="/item/:id" element={<ItemPage />} />
        {/* Cart Page */}
        <Route path="/cart" element={<Cart />} />
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
      </Routes>
      {!hideLayout && <Footer />}
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
