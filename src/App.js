import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from './Components/Navbar/Navbar';
import Header from './Components/Header/Header';
import Portfolio from './Components/Portfolio/Portfolio';
import AboutMe from './Components/AboutMe/AboutMe';
import Contact from './Components/Contact/Contact';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar></NavBar>
        <Header></Header>
        <Portfolio></Portfolio>
        <AboutMe></AboutMe>
        <Contact></Contact>
      </header>
    </div>
  );
}

export default App;
