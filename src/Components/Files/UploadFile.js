import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import Dropzone from 'react-dropzone';
import 'react-dropzone-uploader/dist/styles.css';
import style from "./Files.module.css";

const UploadFile = ({ folderName,modal }) => {
  const urlBack= "https://matiaspage.onrender.com"
  // const urlBack= "http://localhost:3001"

    const [selectedFiles, setSelectedFiles] = useState([]);
    const token = localStorage.getItem('token');
    const [files, setFiles] = useState([]);


    const handleDrop = (acceptedFiles) => {
        setSelectedFiles(acceptedFiles);
        setFiles(acceptedFiles);
    };

    const handleUpload = async () => {
        if (!selectedFiles || selectedFiles.length === 0) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al enviar la solicitud',
            text: "No se han seleccionado imágenes.",
            showConfirmButton: true,
        });
        return;
        }

    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append("images", file);
    }

    try {
      if (folderName) {
        Swal.showLoading();

        const response = await axios.post(
          `${urlBack}/images/uploadImage/${folderName}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        Swal.hideLoading();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.data,
          showConfirmButton: false,
          timer: 1500,
        });
        setFiles([]);

        // console.log("Upload successful:", response.data);
      } else {
        Swal.hideLoading();
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al enviar la solicitud',
          text: "Seleccione una carpeta",
          showConfirmButton: true,
        });
      }
    } catch (error) {
    //   console.error("Upload failed:", error);
    //   console.error('Error al cargar los archivos:', error);
        Swal.hideLoading();
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al cargar los archivos',
            text: error.message,
            showConfirmButton: true,
        });
        }
    };

    useEffect(() => {
    }, [folderName,modal]);

  return (
    <div>
        {
            modal ? (
            <div className="container">
            <h1>{folderName}</h1>
            <Dropzone onDrop={handleDrop} accept="image/*">
                {({ getRootProps, getInputProps }) => (
                    <div className={style.dropzone} {...getRootProps()}>
                        <input {...getInputProps()} />
                        {files.length === 0 ? (
                            <p>Arrastra y suelta archivos aquí, o haz clic para seleccionar.</p>
                        ) : (
                            <>
                                <p>Archivos listos para subir. Haz clic en 'Upload' para continuar.</p>
                                <div className={style.previewContainer}>
                                    {files.map((file, index) => (
                                        <div key={index} className={style.previewItem}>
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`Preview ${index}`}
                                                className={style.imgPrev}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </Dropzone>
            <button onClick={handleUpload} className={style.upload}>Upload</button>
            </div>
            ): null
        }
    </div>
  );
};

export default UploadFile;
