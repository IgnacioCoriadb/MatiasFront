import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-scroll";
import style from "./Footer.module.css";
import { useTranslation } from 'react-i18next';

const Footer = ()=>{
    const [t] = useTranslation("global");

    return (
        <div>
            <div className={`${style['footer-basic']} bg-dark`}>
            <footer>
                <div className={style['social']}>
                    <a href="https://instagram.com/longoperrig_art?igshid=MzRlODBiNWFlZA=="  target="_blank" rel="noopener noreferrer"><i className={`bi bi-instagram ${style['instagram']}`}></i></a>
                    <a href="https://www.tiktok.com/@longoperrigart" target="_blank" rel="noopener noreferrer"><i className="bi bi-tiktok"></i></a>
                    <a href="mailto:matlongx@gmail.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-envelope"></i></a>
                </div>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <Link
                            to="home" 
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className={style['hand-cursor-link']}
                        >
                        {t("navbar.home")}
                        </Link>
                    </li>
                    <li className="list-inline-item"> 
                        <Link
                            to="about" 
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className={style['hand-cursor-link']}
                        >
                        {t("navbar.portfolio")}
                        </Link>
                    </li>
                    <li className="list-inline-item">
                        <Link
                            to="portfolio" 
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className={style['hand-cursor-link']}
                        >
                        {t("navbar.aboutMe")}
                        </Link>
                    </li>
                    <li className="list-inline-item">
                        <Link
                            to="contact" 
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className={style['hand-cursor-link']}
                        >
                        {t("navbar.contact")}
                        </Link>
                    </li>
                </ul>
            </footer>
        </div>
     </div>
    )
}

export default Footer;