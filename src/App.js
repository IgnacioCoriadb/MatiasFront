import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from './Components/Navbar/Navbar';
import Header from './Components/Header/Header';
import Portfolio from './Components/Portfolio/Portfolio';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar></NavBar>
        <Header></Header>
        <Portfolio></Portfolio>
      </header>
    </div>
  );
}

export default App;
