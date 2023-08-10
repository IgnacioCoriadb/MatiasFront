import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-scroll";
import style from "./Footer.module.css";

const Footer = ()=>{

    return (
        <div>
            <div className={`${style['footer-basic']} bg-dark`}>
            <footer>
                <div className={style['social']}>
                    <a href="#"><i className={`bi bi-instagram ${style['instagram']}`}></i></a>
                    <a href="#"><i className="bi bi-tiktok"></i></a>
                    <a href="#"><i className="bi bi-envelope"></i></a>
                </div>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <Link
                            to="home" 
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className="nav-link"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="list-inline-item"> 
                        <Link
                            to="about" 
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className="nav-link"
                        >
                        About
                        </Link>
                    </li>
                    <li className="list-inline-item">
                        <Link
                            to="portfolio" 
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className="nav-link"
                        >
                        Portfolio
                        </Link>
                    </li>
                    <li className="list-inline-item">
                        <Link
                            to="contact" 
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className="nav-link"
                        >
                        Contact
                        </Link>
                    </li>
                </ul>
            </footer>
        </div>
     </div>
    )
}

export default Footer;