import { useState, useEffect } from "react";
import axios from "axios";
import style from "./Folders.module.css";
import Swal from 'sweetalert2';
import UploadImage from "../Files/UploadFile";

const Folder = ({isAuthenticated}) => {
    const urlBack= "https://matiaspage.onrender.com"
//   const urlBack= "http://localhost:3001"

    const [folders, setFolders] = useState([]);
    const token = localStorage.getItem('token');
    const [folderName, setFolderName] = useState("");
    const [modal, setModal] = useState(false);

    const openModal =()=>{
        setModal(true);
    }

    const allFolders = async()=>{
        const token = localStorage.getItem('token');
       const result = await axios.get(`${urlBack}/folders/allFolders`,{
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`, 
          },
       })
       setFolders([...result.data])
    }

    const newFolder = async () => {
        const { value: formValues } = await Swal.fire({
          title: 'Insertar datos',
          html:
            '<input id="subfolder" class="swal2-input" placeholder="Nombre de la carpeta">' +
            '<input id="description" class="swal2-input" placeholder="Descripción">' +
            '<input id="measurements" class="swal2-input" placeholder="Medidas">' +
            '<input id="year" class="swal2-input" placeholder="Año">',
          focusConfirm: false,
          preConfirm: () => {
            return [
              document.getElementById('subfolder').value,
              document.getElementById('description').value,
              document.getElementById('measurements').value,
              document.getElementById('year').value
            ];
          }
        });
      
        if (formValues) {
          const subfolder = formValues[0];
          const description = formValues[1];
          const measurements = formValues[2];
          const year = formValues[3];      
          insertNewFolder(subfolder, description, measurements, year);
        }
      };
      
    
    const insertNewFolder =async (subfolder,description, measurements, year)=>{
        const folder = {subfolder:subfolder,description, measurements, year}
        try{
            Swal.showLoading();
            const result = await axios.post(`${urlBack}/folders/createFolder`,folder,{
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`, 
                  },
            });
            Swal.hideLoading();
            Swal.fire({
            position: 'center',
            icon: 'success',
            title: result.data,
            showConfirmButton: false,
            timer: 1500
            });
        }catch(error) {
            Swal.hideLoading();
            const errorMessage = error.response?.data || "Error al crear carpeta";
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error al enviar la solicitud',
                text: errorMessage,
                showConfirmButton: true
            });
        }
    } 
    const deleteFolder =async (idDb)=>{
        try{
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción eliminará la carpeta permanentemente.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
              });
            if(result.isConfirmed){
                const deleteFolder = await axios.delete(`${urlBack}/folders/deleteFolder/${idDb}`,{
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`, 
                      },
                });
                if(deleteFolder){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: "Carpeta eliminada",
                        showConfirmButton: false,
                        timer: 1500
                        });
                }
            }
        }catch(err) {
            console.log(err)
        }
    }

    const nameFolder = (name)=>{
        setFolderName(name)
    }
    
    useEffect(()=>{
        if(isAuthenticated && token){
            allFolders();
        }
    },[isAuthenticated,folders,token])

    return (
        <div className="container">
            <h1>Folder</h1>
            <ul className={`${style['square-boxes']} d-flex justify-content-center" key="key" `}>                  
                {
                    isAuthenticated && folders ? folders.map((foldername,key) => (
                        <div key={key}> 

                        <li className={style.box} key={foldername.id} onClick={() => { nameFolder(foldername.name); openModal(); }}>{foldername.name}</li>
                        {}
                            <button type="button" className="btn  btn-danger mt-2" onClick={()=>deleteFolder(foldername.id)}>Eliminar</button>

                        </div>
                    )
                    ):""
                }
                <li className={`${style['box_new_folder']}`} key="-1" onClick={newFolder}>Nueva Carpeta</li>
        </ul>
            {isAuthenticated ?
                <UploadImage folderName={folderName} modal={modal}></UploadImage> : null
            }
        </div>
    );
}

export default Folder;
