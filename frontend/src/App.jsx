import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Test from './pages/Test';
import './App.css';

function AppContent() {
  const location = useLocation();
  const hideLayoutRoutes = ['/contact'];
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
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        {/* Test/Health Check Page */}
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
