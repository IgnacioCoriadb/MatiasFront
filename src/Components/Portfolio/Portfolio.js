
import axios from "axios";
import { useEffect ,useState} from "react";
import Image from "./AllImage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch    } from '@fortawesome/free-solid-svg-icons';
// import Paginado from "../Pagination/pagination";
import styles from "./Portfolio.module.css"

const Portfolio = ({isAuthenticated})=>{
    const [imageFolder, setImageFolder] = useState(null);
    const [nameFolder, setNameFolder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/images/allImage');
        setImageFolder([...response.data]);
      } catch (error) {
        console.error("No se pudieron obtener las imagenes " + error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [imageFolder]);
  
    const handleImageClick = (image) => {
      setNameFolder(image);
    }

    const handleFunctionClick = (image) => {
        handleImageClick(image);
        setModalOpen(true);
      };
  return (
    <div className="container">
    <h1 className="text-center mt-5">Portfolio</h1>
    <div className={`row mt-4`}>
      {imageFolder ? imageFolder.map((imagen, index) => (
        <div key={index} className={`col-md-4 mb-4`}>
          <div className="thumbnail">
      
    
            <img
              src={imagen.url}
              alt={`Imagen ${index + 1}`}
              className={`img-fluid ${styles.galleryThumbnail}`}
              data-toggle="modal"
              data-target="#miModal"
              onClick={() => handleFunctionClick(imagen.folderName)}
            />
          </div>
        </div>
      )) : "Cargando"}
    </div>
    {nameFolder !== null && (
    <Image folder={nameFolder} modalOpen={modalOpen} setModalOpen={setModalOpen} />
    )}
 
  </div>
 
    )
}


export default Portfolio;