import  aboutImage from "../../Images/about.jpg";
import styles from "./AboutMe.module.css";
const AboutMe = ()=>{
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
                            Mi obra hace foco en el registro de energía y tiempo por medio de la pintura y el dibujo, intenta imitar a la naturaleza en sus diversas escalas. Factores de referencia son la evolución de los organismos, el caos y aquellos movimientos que percibimos por medio de nuestros sentidos y la ciencia, pero que no podemos apreciar en su totalidad, como por ejemplo los ritmos en nuestro cuerpo y el universo. Grafismos se entretejen generando cartografías orgánicas que por su morfología recuerdan a registros histológicos. Los soportes quedan saturados de información visual por lo que se desvanecen las escalas y direcciones, para mí la pintura es una metáfora constante de la entropía en la que existimos y actuamos. El acto creativo es búsqueda de sentido constante, el intento de descifrar las relaciones enigmáticas de la existencia. Las imágenes que produzco se generan luego de un proceso de trabajo frenético y obsesivo, mediante la superposición de capas de pintura que tienden a ser líneas o planos concretos. En cuestión de materiales oscilo entre los tradicionales de la pintura y dibujo como (acrílico, óleo, acuarela, tinta y témpera) ,combinándolos con pinturas de origen industrial, polvo de mármol y pigmentos puros para generar mayor carga matérica. Además de mi producción pictórica me interesa la creación de piezas gráficas y de ilustración, incorporo medios digitales, adaptando mi estética a diversos fines
                        </p>
                    </div>
                </div>
            </div> 
        </div>
    )
}



export default AboutMe;