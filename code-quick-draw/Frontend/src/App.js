import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import Lobby from './components/Lobby';

function App() {
  return (
    <><div className="App">
      <ButtonAppBar />
    </div><div className="App">
        <Lobby />
      </div></>
    
  );
}

export default App;