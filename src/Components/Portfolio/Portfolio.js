
import axios from "axios";
import { useEffect ,useState} from "react";
import Image from "./AllImage";
import Paginate from "../Pagination/Pagination";
import styles from "./Portfolio.module.css"
import { faCircleNotch    } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Portfolio = ({isAuthenticated,setNavBarVisible})=>{
    // const urlBack= "https://matiaspage.onrender.com"
    const urlBack="https://vps-3582101-x.dattaweb.com:3001";

    const [imageFolder, setImageFolder] = useState(null);
    const [nameFolder, setNameFolder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage= 6;
    
    const totalPageCount  = imageFolder ? Math.ceil(imageFolder.length / itemsPerPage):"";

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    const indexOfLastElement = currentPage * itemsPerPage;
    const indexOfFirstElement = indexOfLastElement - itemsPerPage;
    const currentPageItemCount  =imageFolder ? imageFolder.slice(indexOfFirstElement, indexOfLastElement):"";


    const fetchData = async () => {
      try {
        const response = await axios.get(`${urlBack}/images/allImage`);
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
      setModalOpen(true);
      setNavBarVisible(false)
    }

    const handleFunctionClick = (image) => {
        handleImageClick(image);
        setModalOpen(true);
      };

  return (
    <div className="container">
    <h1 className="text-center mt-5">Portfolio</h1>
    <div className={`row mt-4`}>  
      {currentPageItemCount  ? currentPageItemCount.map((imagen, index) => (
        <div key={index} className={`col-md-4 mb-4`}>
          <div className={"thumbnail"}>
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
      )) : <div className="loading-spinner">
      <FontAwesomeIcon icon={faCircleNotch} spin size="4x" />
      <div className="loading-text">CARGANDO PORTFOLIO</div>
    </div>}
    </div>
    {nameFolder !== null && (
      <Image folder={nameFolder} modalOpen={modalOpen} setModalOpen={setModalOpen} setNavBarVisible={setNavBarVisible} />   
    )}
  <Paginate
        currentPage={currentPage}
        totalPages={totalPageCount}
        onPageChange={handlePageChange}
      /> 
  </div>
 
    )
}


export default Portfolio;