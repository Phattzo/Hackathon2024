import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import LinksPage from './pages/LinksPage';
import PlayPage from './pages/PlayPage';
import { TempPlayPage } from './pages/TempPlayPage';
import LeaderBoardPage from './pages/LeaderBoardPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<LinksPage />} />
          <Route path="/play" element={<PlayPage />} />
          <Route path="/temp-play-page" element={<TempPlayPage />} />
          <Route path="/leaderboard" element={<LeaderBoardPage />} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
