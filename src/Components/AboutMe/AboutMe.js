import  aboutImage from "../../Images/about.jpg";
import styles from "./AboutMe.module.css";
import { useTranslation } from 'react-i18next';

const AboutMe = ()=>{
    const [t] = useTranslation("global");

    return (
        <div>
            <h1 className={styles.aboutMe}>About me</h1>
            <div className={`container mt-5 ${styles['aboutContainer']} ${styles.container}`}>
                <div className="row align-items-center">
                    <div className={`col-md-6 ${styles['imageColumn']}`}>
                        <div className={styles['imageContainer']}>
                            <img src={aboutImage} alt="Mi foto de perfil" className={`img-fluid ${styles['aboutImgDesktop']}`} />
                        </div>
                    </div>
                    <div className={`col-md-6 ${styles['textColumn']}`}>
                        <p className={styles['aboutText']}>
                            {t("aboutMe.text")}
                        </p>
                    </div>
                </div>
            </div> 
        </div>
    )
}



export default AboutMe;