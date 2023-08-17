import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import Logout from './Components/Login/Logout';
import { Element } from "react-scroll";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [navBarVisible, setNavBarVisible] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
    }
  }, [isAuthenticated,token,navBarVisible]);

  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated && token ? (
          <div>
            <Folder isAuthenticated={isAuthenticated} />
            <Portfolio />
            <Logout></Logout>
          </div>
        ) : (
          <div>
            <NavBar navBarVisible={navBarVisible}/>
            <Element name="home" className="element">
              <Header />
            </Element>

            <Element name="portfolio" className="element">
              <Portfolio setNavBarVisible={setNavBarVisible}/>
            </Element>

            <Element name="about" className="element">
              <AboutMe />
            </Element>

            <Element name="contact" className="element">
              <Contact />
            </Element>

            <Footer/>
            <Router>
              <Routes>
                <Route
                  path="/login"
                  element={<Login setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />}
                />
              </Routes>
            </Router>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
