import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './pages/Test';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Test/Health Check Page */}
        <Route path="/" element={<Test />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
