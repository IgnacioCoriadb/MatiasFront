import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-scroll";
import style from "./Navbar.module.css";

const NavBar = ()=>{
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark  fixed-top">
            <div className="container">
                <Link 
                    to="home" 
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className={style.tittle}
                >
                Matias Longo Perrig
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                <FontAwesomeIcon icon={faBars} style={{ color: "#fff" }} />
                </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item active">
                        <Link
                            to="home" 
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className={style.link}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="portfolio" 
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className={style.link}
                        >
                            Portfolio
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="about" 
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className={style.link}
                        >
                            About me
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="contact" 
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className={style.link}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
}


export default NavBar;