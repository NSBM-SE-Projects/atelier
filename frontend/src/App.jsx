import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Test from './pages/Test';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        {/* Test/Health Check Page */}
        <Route path="/test" element={<Test />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
