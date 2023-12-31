import axios from "axios";
import { useState,useEffect } from "react";
import styles from "./AllImage.module.css";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Image = ({folder,modalOpen,setModalOpen,setNavBarVisible}) => {
    // const urlBack= "https://matiaspage.onrender.com"
    const urlBack="https://www.longoperrig.com.ar/api";

    const [image, setImage] = useState([]);
    const [imageOpened, setImageOpened] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const token = localStorage.getItem('token');
    const [currentImage, setCurrentImage] = useState(null);
    const [folderData, setFolderData] = useState(null);


    const allImages = async ()=>{
        const result = await axios.get(`${urlBack}/images/allImage/${folder}`);
        const imageUrls = result.data.map(url => ({
            original: url.url,
            folderName: url.folderName,
            id: url.id
        }));
        const folders = await axios.get(`${urlBack}/folders/folder/${folder}`);
        setFolderData(folders.data)
        setImage(imageUrls);
    }

    const closeModal = () => {
        setModalOpen(false);
        setImageOpened(false);
        setCurrentImage(null);
        setNavBarVisible(true);
    };

    const handleBackgroundClick = (e) => {
    if (!e.target.closest(`.${styles['image-modal-content']}`)) {
            setImageOpened(false);
            closeModal();
        }
    };

    const deleteImage = async(id) => {
        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará la imagen permanentemente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
          });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`${urlBack}/images/deleteImage/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                await allImages(); // Actualizar la lista de imágenes después de eliminar
                setCurrentIndex(0);
            } catch (error) {
                if (error.response) {
                    // Error de respuesta desde el servidor (estado HTTP no 2xx)
                    console.error("Respuesta del servidor:", error.response.data);
                    console.error("Código de estado:", error.response.status);
                } else if (error.request) {
                    console.error("No se recibió respuesta del servidor:", error.request);
                } else {
                    console.error("Error durante la configuración de la solicitud:", error.message);
                }
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al enviar la solicitud',
                    text: "No se pudo eliminar la imagen.",
                    showConfirmButton: true,
                });
            }
        }
    }

    const handleSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        allImages();
        if (imageOpened) {
            if (currentIndex >= 0 && currentIndex < image.length) {
                setCurrentIndex(currentIndex);
            }
        }
    }, [folder, imageOpened, currentIndex]);
    return  (
        <>
        {modalOpen && (
            <div className={styles['image-modal']} onClick={handleBackgroundClick}>
                <div className={`${styles['image-modal-margin']} ${token ? styles['logged-in'] : styles['logged-out']}`}>
                    <div className={styles['image-modal-content']}>
                        <button className={`${styles['close-button']} ${styles['close-button-top-right']}`} onClick={closeModal}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        {image.length > 0 && currentIndex >= 0 && currentIndex < image.length && (
                            <>
                                {token && (
                                    <button className={`btn btn-danger ${styles['delete-button']}`} onClick={() => deleteImage(image[currentIndex].id)}>Eliminar</button>
                                )}
                                {folderData ? folderData.map((f,key) => (
                                    <div key={key} className={styles.folderItem}> 
                                     <h1 className={styles['title']}>{f.folderName}</h1>
                                        <p className={styles['title']}>{f.description}</p>
                                        <p className={styles['title']}>{f.measurements}</p>
                                        <p className={styles['title']}>{f.year}</p>
                                    </div>
                                )) : null}

                              
                                <ImageGallery items={image} currentIndex={currentIndex} onSlide={handleSlide}  />
                             
                            </>
                        )}
                    </div>
                </div>
            </div>
        )}
    </>
    );
}

export default Image;
