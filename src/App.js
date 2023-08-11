import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from './Components/Navbar/Navbar';
import Header from './Components/Header/Header';
import Portfolio from './Components/Portfolio/Portfolio';
import AboutMe from './Components/AboutMe/AboutMe';
import Contact from './Components/Contact/Contact';
import Footer from "./Components/Footer/Footer";
import Folder from './Components/Folders/Folders';
import Login from './Components/Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState,useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

 // Función para manejar el logout


// Verificar el estado de autenticación cuando el componente se monte
useEffect(() => {
  const token = localStorage.getItem('token');
  setToken(token)
  if (token) {
    setIsAuthenticated(true);

  }
}, [isAuthenticated]);

  return (
    <div className="App">
      <header className="App-header">
      
      {isAuthenticated && token ?(
              <Folder isAuthenticated={isAuthenticated}></Folder> 
      ):(
        <div>
        <NavBar></NavBar>
        <Header></Header>
        <Portfolio></Portfolio>
        <AboutMe></AboutMe>
        <Contact></Contact>
        <Footer></Footer>

      <Router>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}></Login>} />
        </Routes>
      </Router>
        </div>
      
      )
    
    }
      </header>
    </div>
  );
}

export default App;
