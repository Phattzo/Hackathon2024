import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import Lobby from './components/Lobby';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import LinksPage from './pages/LinksPage';
import PlayPage from './pages/PlayPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<LinksPage />} />
          <Route path="/play" element={<PlayPage />} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
