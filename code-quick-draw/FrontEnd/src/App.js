import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import Lobby from './components/Lobby';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AboutPage from './components/AboutPage';


function App() {
  return (
    <div className="App">
      <ButtonAppBar />
      <Lobby />

      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFound} />
        </Switch>
      </Router>

    </div>
    
  );
}

export default App;
