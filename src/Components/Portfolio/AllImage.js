import axios from "axios";
import { useState,useEffect } from "react";
import styles from "./AllImage.module.css";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Image =({folder,modalOpen,setModalOpen})=>{
    const [image, setImage] = useState([]);
    const [imageOpened, setImageOpened] = useState(false);

    const allImages = async ()=>{
        const result = await axios.get(`http://localhost:3001/images/allImage/${folder}`);
        const imageUrls = result.data.map(url => ({
            original: url.url,
            folderName: url.folderName
        }));
        setImage(imageUrls);
    }
    
    const closeModal = () => {
        setModalOpen(false);
    };
    
    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains(styles['image-modal'])) {
            setImageOpened(false); 
            closeModal();
        }
    };

    useEffect(()=>{
        allImages();
        setImageOpened(true); 
        setModalOpen(false);
    },[folder])

    return  (
        <>
          {modalOpen && (
            <div className={styles['image-modal']} onClick={handleBackgroundClick}>

                <div className={styles['image-modal-margin']}>
                    <div className={styles['image-modal-content']}>
                    <button className={styles['close-button']} onClick={closeModal} style={{ zIndex: 999 }}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    {
                        image[0]?.folderName && <h1 className={styles['title']}>{image[0].folderName}</h1>
                    }                      
                    {image.length > 0 && <ImageGallery items={image} />}
                    </div>

                </div>
            </div>
        )}
    </>
    )
}

export default Image;