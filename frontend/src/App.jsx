import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Test from './pages/Test';
import './App.css';

function App() {
  return (
    <Router>
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
